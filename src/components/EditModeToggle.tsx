import { useEdit } from '../contexts/EditContext';
import { useAuth } from '../contexts/AuthContext';

export function EditModeToggle() {
  const { isEditMode, toggleEditMode } = useEdit();
  const { user } = useAuth();

  // Only show toggle when user is authenticated
  if (!user) return null;

  return (
    <button
      onClick={toggleEditMode}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isEditMode
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
      title={isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
    >
      {isEditMode ? '✓ Edit Mode' : '✏️ Edit'}
    </button>
  );
}
