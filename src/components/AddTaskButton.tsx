import { useState } from 'react';
import { useEdit } from '../contexts/EditContext';

interface AddTaskButtonProps {
  onAdd: (title: string, type: 'learning' | 'implementation', due?: string) => Promise<void>;
  color: string;
}

export function AddTaskButton({ onAdd, color }: AddTaskButtonProps) {
  const { isEditMode } = useEdit();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'learning' | 'implementation'>('implementation');
  const [due, setDue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isEditMode) return null;

  const handleSave = async () => {
    if (!title.trim()) return;

    setIsSaving(true);
    try {
      await onAdd(title.trim(), type, due.trim() || undefined);
      setTitle('');
      setType('implementation');
      setDue('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to add task:', error);
      alert('Failed to add task. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setType('implementation');
    setDue('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="btn btn-add"
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
        <span style={{ fontSize: '16px' }}>+</span>
        Add Task
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') handleCancel();
        }}
        disabled={isSaving}
        className="input"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: '600', marginBottom: '8px' }}
      />
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label className="label">
            TYPE
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setType('implementation')}
              className="btn"
              style={{
                flex: 1,
                padding: '6px 10px',
                border: `1px solid ${type === 'implementation' ? color : '#E8E8F0'}`,
                background: type === 'implementation' ? `${color}15` : '#fff',
                color: type === 'implementation' ? color : '#6B7280',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              🔧 Implementation
            </button>
            <button
              onClick={() => setType('learning')}
              className="btn"
              style={{
                flex: 1,
                padding: '6px 10px',
                border: `1px solid ${type === 'learning' ? '#F59E0B' : '#E8E8F0'}`,
                background: type === 'learning' ? '#FDE68A20' : '#fff',
                color: type === 'learning' ? '#F59E0B' : '#6B7280',
                fontSize: '11px',
                fontWeight: '700',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              📚 Learning
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label className="label">
            DUE DATE
          </label>
          <input
            type="text"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            placeholder="e.g., Jan 15"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            disabled={isSaving}
            className="input input-medium"
            style={{ fontFamily: "'DM Mono', monospace", width: '100%' }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="btn-secondary"
          style={{ padding: '6px 14px', fontSize: '11px' }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || !title.trim()}
          className="btn-primary"
          style={{ background: color, padding: '6px 14px', fontSize: '11px' }}
        >
          {isSaving ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      <div className="hint-text" style={{ marginTop: '6px' }}>
        Press Enter to add, Esc to cancel
      </div>
    </div>
  );
}
