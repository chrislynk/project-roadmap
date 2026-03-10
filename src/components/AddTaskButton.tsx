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
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '8px',
          border: `1px dashed ${color}40`,
          borderRadius: '8px',
          background: 'transparent',
          color: color,
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: "'Inter', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
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
        <span style={{ fontSize: '16px' }}>+</span>
        Add Task
      </button>
    );
  }

  return (
    <div
      style={{
        marginTop: '8px',
        padding: '12px',
        border: `2px solid ${color}`,
        borderRadius: '8px',
        background: '#fff',
      }}
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
        style={{
          width: '100%',
          padding: '8px 10px',
          border: '1px solid #E8E8F0',
          borderRadius: '6px',
          fontSize: '13px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: '600',
          marginBottom: '8px',
          outline: 'none',
        }}
      />
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: "'DM Mono', monospace", display: 'block', marginBottom: '4px' }}>
            TYPE
          </label>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setType('implementation')}
              style={{
                flex: 1,
                padding: '6px 10px',
                border: `1px solid ${type === 'implementation' ? color : '#E8E8F0'}`,
                borderRadius: '6px',
                background: type === 'implementation' ? `${color}15` : '#fff',
                color: type === 'implementation' ? color : '#6B7280',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              🔧 Implementation
            </button>
            <button
              onClick={() => setType('learning')}
              style={{
                flex: 1,
                padding: '6px 10px',
                border: `1px solid ${type === 'learning' ? '#F59E0B' : '#E8E8F0'}`,
                borderRadius: '6px',
                background: type === 'learning' ? '#FDE68A20' : '#fff',
                color: type === 'learning' ? '#F59E0B' : '#6B7280',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              📚 Learning
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: "'DM Mono', monospace", display: 'block', marginBottom: '4px' }}>
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
            style={{
              width: '100%',
              padding: '6px 8px',
              border: '1px solid #E8E8F0',
              borderRadius: '6px',
              fontSize: '11px',
              fontFamily: "'DM Mono', monospace",
              outline: 'none',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
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
        <button
          onClick={handleSave}
          disabled={isSaving || !title.trim()}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            border: 'none',
            background: color,
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            cursor: isSaving || !title.trim() ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Mono', monospace",
            opacity: isSaving || !title.trim() ? 0.5 : 1,
          }}
        >
          {isSaving ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '6px', fontFamily: "'DM Mono', monospace" }}>
        Press Enter to add, Esc to cancel
      </div>
    </div>
  );
}
