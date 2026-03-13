import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface EditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (enabled: boolean) => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export function EditProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(true)

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const setEditMode = (enabled: boolean) => {
    setIsEditMode(enabled);
  };

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, setEditMode }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (!context) {
    throw new Error('useEdit must be used within EditProvider');
  }
  return context;
}
