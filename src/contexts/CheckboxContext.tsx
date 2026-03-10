import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useSupabaseSync } from '../hooks/useSupabaseSync';

interface CheckboxState {
  [subtaskId: string]: boolean;
}

interface CheckboxContextType {
  checkedItems: CheckboxState;
  toggleItem: (subtaskId: string) => void;
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

  // Supabase sync for cloud backup and cross-device sync
  const { syncing, lastSyncTime, syncToSupabase, clearSupabase, isConfigured } =
    useSupabaseSync(checkedItems, setCheckedItems);

  const toggleItem = (subtaskId: string) => {
    const newValue = !checkedItems[subtaskId];

    // Update localStorage immediately (optimistic update)
    setCheckedItems(prev => ({
      ...prev,
      [subtaskId]: newValue,
    }));

    // Sync to Supabase in the background (if configured)
    if (isConfigured) {
      syncToSupabase(subtaskId, newValue);
    }
  };

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
