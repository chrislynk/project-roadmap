import { useState } from 'react';
import { useEdit } from '../contexts/EditContext';

interface AddSubtaskButtonProps {
  onAdd: (text: string, due?: string) => Promise<void>;
  color: string;
}

export function AddSubtaskButton({ onAdd, color }: AddSubtaskButtonProps) {
  const { isEditMode } = useEdit();
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [due, setDue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isEditMode) return null;

  const handleSave = async () => {
    if (!text.trim()) return;

    setIsSaving(true);
    try {
      await onAdd(text.trim(), due.trim() || undefined);
      setText('');
      setDue('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to add subtask:', error);
      alert('Failed to add subtask. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setDue('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="btn btn-add-subtask"
        style={{
          border: `1px dashed ${color}40`,
          color: color,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = `${color}10`;
          e.currentTarget.style.borderColor = `${color}60`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = `${color}40`;
        }}
      >
        <span style={{ fontSize: '14px' }}>+</span>
        Add subtask
      </button>
    );
  }

  return (
    <div
      className="form-container add-form-border"
      style={{ border: `2px solid ${color}` }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Subtask description..."
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') handleCancel();
        }}
        disabled={isSaving}
        className="input input-small"
        style={{ fontFamily: "'Inter', sans-serif", marginBottom: '6px' }}
      />
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <input
          type="text"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          placeholder="Due date (e.g., Jan 15)"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          disabled={isSaving}
          className="input input-small"
          style={{ flex: 1, fontFamily: "'DM Mono', monospace" }}
        />
        <button
          onClick={handleSave}
          disabled={isSaving || !text.trim()}
          className="btn-primary"
          style={{ background: color, padding: '4px 12px', fontSize: '11px' }}
        >
          {isSaving ? 'Adding...' : 'Add'}
        </button>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="btn-secondary"
          style={{ padding: '4px 12px', fontSize: '11px' }}
        >
          Cancel
        </button>
      </div>
      <div className="hint-text">
        Press Enter to add, Esc to cancel
      </div>
    </div>
  );
}
