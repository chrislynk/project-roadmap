import { createContext, useContext, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSupabaseSync } from '../hooks/useSupabaseSync';
import { useRoadmap } from './RoadmapContext';

interface CheckboxState {
  [subtaskId: string]: boolean;
}

interface CheckboxContextType {
  checkedItems: CheckboxState;
  toggleItem: (subtaskId: string) => void;
  toggleStep: (subtaskId: string, stepId: string) => void;
  clearAll: () => void;
  syncing?: boolean;
  lastSyncTime?: Date | null;
  isSupabaseEnabled?: boolean;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export function CheckboxProvider({ children }: { children: ReactNode }) {
  // localStorage as primary cache
  const [checkedItems, setCheckedItems] = useLocalStorage<CheckboxState>(
    'project-roadmap-checkboxes',
    {}
  );

  const { projects } = useRoadmap();

  // Supabase sync for cloud backup and cross-device sync
  const { syncing, lastSyncTime, syncToSupabase, clearSupabase, isConfigured } =
    useSupabaseSync(checkedItems, setCheckedItems);

  // Helper: Get all step IDs for a subtask
  const getStepIds = useCallback((subtaskId: string): string[] => {
    // Find the subtask in the projects data structure
    for (const project of projects) {
      for (const pillar of project.pillars) {
        for (const initiative of pillar.initiatives) {
          for (const task of initiative.tasks) {
            const subtask = task.subtasks.find(s => s.id === subtaskId);
            if (subtask && subtask.steps) {
              return subtask.steps.map(step => step.id);
            }
          }
        }
      }
    }
    return [];
  }, [projects]);

  const toggleItem = useCallback((subtaskId: string) => {
    const newValue = !checkedItems[subtaskId];
    const stepIds = getStepIds(subtaskId);

    // Update subtask and all steps
    const updated: CheckboxState = {
      ...checkedItems,
      [subtaskId]: newValue,
    };

    // Set all steps to the same state as the parent subtask
    stepIds.forEach(stepId => {
      updated[stepId] = newValue;
    });

    setCheckedItems(updated);

    // Sync to Supabase (subtask first, then steps)
    if (isConfigured) {
      syncToSupabase(subtaskId, newValue);
      stepIds.forEach(stepId => {
        syncToSupabase(stepId, newValue);
      });
    }
  }, [checkedItems, getStepIds, isConfigured, syncToSupabase]);

  const toggleStep = useCallback((subtaskId: string, stepId: string) => {
    const stepIds = getStepIds(subtaskId);
    const newStepValue = !checkedItems[stepId];

    // Update the step
    const updated: CheckboxState = {
      ...checkedItems,
      [stepId]: newStepValue,
    };

    // If all steps are now checked, auto-check the parent subtask
    const allStepsChecked = stepIds.every(id =>
      id === stepId ? newStepValue : updated[id] === true
    );

    if (allStepsChecked) {
      updated[subtaskId] = true;
    } else {
      // If any step is unchecked, uncheck the parent
      updated[subtaskId] = false;
    }

    setCheckedItems(updated);

    // Sync to Supabase
    if (isConfigured) {
      syncToSupabase(stepId, newStepValue);
      syncToSupabase(subtaskId, allStepsChecked);
    }
  }, [checkedItems, getStepIds, isConfigured, syncToSupabase]);

  const clearAll = () => {
    // Clear localStorage immediately
    setCheckedItems({});

    // Clear Supabase in the background (if configured)
    if (isConfigured) {
      clearSupabase();
    }
  };

  return (
    <CheckboxContext.Provider
      value={{
        checkedItems,
        toggleItem,
        toggleStep,
        clearAll,
        syncing,
        lastSyncTime,
        isSupabaseEnabled: isConfigured,
      }}
    >
      {children}
    </CheckboxContext.Provider>
  );
}

export function useCheckboxState() {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error('useCheckboxState must be used within CheckboxProvider');
  }
  return context;
}
