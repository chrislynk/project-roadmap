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
        className="btn btn-add-initiative"
        style={{
          border: `2px dashed ${color}40`,
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
        <span style={{ fontSize: '18px' }}>+</span>
        Add Initiative
      </button>
    );
  }

  return (
    <div
      className="form-container-large add-form-border"
      style={{ border: `2px solid ${color}` }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Initiative title..."
        autoFocus
        disabled={isSaving}
        className="input"
        style={{ padding: '10px 12px', fontSize: '14px', fontWeight: '700', fontFamily: "'Sora', sans-serif", marginBottom: '10px' }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)..."
        disabled={isSaving}
        className="textarea"
        style={{ marginBottom: '10px' }}
      />
      <div style={{ marginBottom: '10px' }}>
        <label className="label">
          QUARTERS *
        </label>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
            <button
              key={q}
              onClick={() => toggleQuarter(q)}
              className="btn"
              style={{
                flex: 1,
                padding: '8px',
                border: `2px solid ${quarters.includes(q) ? color : '#E8E8F0'}`,
                background: quarters.includes(q) ? `${color}15` : '#fff',
                color: quarters.includes(q) ? color : '#9CA3AF',
                fontSize: '12px',
                fontWeight: '700',
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label className="label">
          OWNER
        </label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="e.g., Engineering Team"
          disabled={isSaving}
          className="input"
          style={{ fontFamily: "'Inter', sans-serif", width: '100%' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="btn-secondary"
          style={{ padding: '8px 16px' }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || !title.trim() || quarters.length === 0}
          className="btn-primary"
          style={{ background: color, padding: '8px 16px' }}
        >
          {isSaving ? 'Adding...' : 'Add Initiative'}
        </button>
      </div>
    </div>
  );
}
