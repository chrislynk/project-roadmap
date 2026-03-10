import { useState } from 'react';
import { useEdit } from '../contexts/EditContext';

interface AddInitiativeButtonProps {
  onAdd: (title: string, quarters: string[], owner: string, description?: string) => Promise<void>;
  color: string;
}

export function AddInitiativeButton({ onAdd, color }: AddInitiativeButtonProps) {
  const { isEditMode } = useEdit();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [quarters, setQuarters] = useState<string[]>([]);
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isEditMode) return null;

  const handleSave = async () => {
    if (!title.trim() || quarters.length === 0) return;

    setIsSaving(true);
    try {
      await onAdd(title.trim(), quarters, owner.trim() || 'Unassigned', description.trim() || undefined);
      setTitle('');
      setQuarters([]);
      setOwner('');
      setDescription('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to add initiative:', error);
      alert('Failed to add initiative. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setQuarters([]);
    setOwner('');
    setDescription('');
    setIsAdding(false);
  };

  const toggleQuarter = (q: string) => {
    setQuarters(prev =>
      prev.includes(q) ? prev.filter(item => item !== q) : [...prev, q]
    );
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: '8px',
          border: `2px dashed ${color}40`,
          borderRadius: '12px',
          background: 'transparent',
          color: color,
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
          fontFamily: "'Sora', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
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
        <span style={{ fontSize: '18px' }}>+</span>
        Add Initiative
      </button>
    );
  }

  return (
    <div
      style={{
        marginTop: '8px',
        padding: '16px',
        border: `2px solid ${color}`,
        borderRadius: '12px',
        background: '#fff',
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Initiative title..."
        autoFocus
        disabled={isSaving}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #E8E8F0',
          borderRadius: '8px',
          fontSize: '14px',
          fontFamily: "'Sora', sans-serif",
          fontWeight: '700',
          marginBottom: '10px',
          outline: 'none',
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)..."
        disabled={isSaving}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #E8E8F0',
          borderRadius: '8px',
          fontSize: '13px',
          fontFamily: "'Inter', sans-serif",
          marginBottom: '10px',
          outline: 'none',
          resize: 'vertical',
          minHeight: '60px',
        }}
      />
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: "'DM Mono', monospace", display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
          QUARTERS *
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
            <button
              key={q}
              onClick={() => toggleQuarter(q)}
              style={{
                flex: 1,
                padding: '8px',
                border: `2px solid ${quarters.includes(q) ? color : '#E8E8F0'}`,
                borderRadius: '8px',
                background: quarters.includes(q) ? `${color}15` : '#fff',
                color: quarters.includes(q) ? color : '#9CA3AF',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '10px', color: '#9CA3AF', fontFamily: "'DM Mono', monospace", display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
          OWNER
        </label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="e.g., Engineering Team"
          disabled={isSaving}
          style={{
            width: '100%',
            padding: '8px 10px',
            border: '1px solid #E8E8F0',
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily: "'Inter', sans-serif",
            outline: 'none',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #E8E8F0',
            background: '#fff',
            color: '#6B7280',
            fontSize: '12px',
            fontWeight: '700',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Mono', monospace",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || !title.trim() || quarters.length === 0}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: color,
            color: '#fff',
            fontSize: '12px',
            fontWeight: '700',
            cursor: isSaving || !title.trim() || quarters.length === 0 ? 'not-allowed' : 'pointer',
            fontFamily: "'DM Mono', monospace",
            opacity: isSaving || !title.trim() || quarters.length === 0 ? 0.5 : 1,
          }}
        >
          {isSaving ? 'Adding...' : 'Add Initiative'}
        </button>
      </div>
    </div>
  );
}
