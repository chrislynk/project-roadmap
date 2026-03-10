import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CheckboxState {
  [subtaskId: string]: boolean;
}

interface CheckboxContextType {
  checkedItems: CheckboxState;
  toggleItem: (subtaskId: string) => void;
  clearAll: () => void;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export function CheckboxProvider({ children }: { children: ReactNode }) {
  const [checkedItems, setCheckedItems] = useLocalStorage<CheckboxState>(
    'project-roadmap-checkboxes',
    {}
  );

  const toggleItem = (subtaskId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [subtaskId]: !prev[subtaskId],
    }));
  };

  const clearAll = () => {
    setCheckedItems({});
  };

  return (
    <CheckboxContext.Provider value={{ checkedItems, toggleItem, clearAll }}>
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
