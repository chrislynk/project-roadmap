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
        style={{
          width: '100%',
          padding: '8px',
          marginTop: '4px',
          border: `1px dashed ${color}40`,
          borderRadius: '6px',
          background: 'transparent',
          color: color,
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          transition: 'all 0.2s',
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
      style={{
        marginTop: '4px',
        padding: '8px',
        border: `2px solid ${color}`,
        borderRadius: '6px',
        background: '#fff',
      }}
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
        style={{
          width: '100%',
          padding: '6px 8px',
          border: '1px solid #E8E8F0',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '6px',
          outline: 'none',
        }}
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
          style={{
            flex: 1,
            padding: '4px 6px',
            border: '1px solid #E8E8F0',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: "'DM Mono', monospace",
            outline: 'none',
          }}
        />
        <button
          onClick={handleSave}
          disabled={isSaving || !text.trim()}
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            border: 'none',
            background: color,
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            cursor: isSaving || !text.trim() ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Mono', monospace",
            opacity: isSaving || !text.trim() ? 0.5 : 1,
          }}
        >
          {isSaving ? 'Adding...' : 'Add'}
        </button>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          style={{
            padding: '4px 12px',
            borderRadius: '4px',
            border: '1px solid #E8E8F0',
            background: '#fff',
            color: '#6B7280',
            fontSize: '11px',
            fontWeight: '700',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Cancel
        </button>
      </div>
      <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '4px', fontFamily: "'DM Mono', monospace" }}>
        Press Enter to add, Esc to cancel
      </div>
    </div>
  );
}
