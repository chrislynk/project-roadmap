import { useState } from 'react';
import { useEdit } from '../contexts/EditContext';
import { useRoadmapCRUD } from '../hooks/useRoadmapCRUD';

interface AddStepButtonProps {
  subtaskId: string;
  stepsCount: number;
  color: string;
}

export function AddStepButton({ subtaskId, stepsCount, color }: AddStepButtonProps) {
  const { isEditMode } = useEdit();
  const { addStep } = useRoadmapCRUD();
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isEditMode) return null;

  const handleSave = async () => {
    if (!text.trim()) return;

    setIsSaving(true);
    try {
      const stepId = `${subtaskId}-step-${Date.now()}`;
      const position = stepsCount;

      await addStep(subtaskId, {
        step_id: stepId,
        text: text.trim(),
        position,
      });

      setText('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to add step:', error);
      alert('Failed to add step. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setText('');
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        style={{
          width: "100%",
          padding: "4px 8px",
          marginTop: "4px",
          border: `1px dashed ${color}30`,
          borderRadius: "4px",
          background: "transparent",
          color: color,
          fontSize: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontFamily: "'Inter', sans-serif",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = `${color}08`;
          e.currentTarget.style.borderColor = `${color}50`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = `${color}30`;
        }}
      >
        <span style={{ fontSize: '12px' }}>+</span>
        Add step
      </button>
    );
  }

  return (
    <div
      style={{
        marginTop: "4px",
        padding: "6px",
        border: `2px solid ${color}`,
        borderRadius: "4px",
        background: "#FAFAFA",
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Step description..."
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') handleCancel();
        }}
        disabled={isSaving}
        style={{
          width: "100%",
          padding: "4px 6px",
          fontSize: "11px",
          border: "1px solid #E5E7EB",
          borderRadius: "3px",
          fontFamily: "'Inter', sans-serif",
          marginBottom: "4px",
        }}
      />
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSave}
          disabled={isSaving || !text.trim()}
          style={{
            background: color,
            color: "white",
            border: "none",
            borderRadius: "3px",
            padding: "3px 10px",
            fontSize: "10px",
            cursor: isSaving || !text.trim() ? 'not-allowed' : 'pointer',
            opacity: isSaving || !text.trim() ? 0.5 : 1,
          }}
        >
          {isSaving ? 'Adding...' : 'Add'}
        </button>
        <button
          onClick={handleCancel}
          disabled={isSaving}
          style={{
            background: "#F3F4F6",
            color: "#6B7280",
            border: "1px solid #E5E7EB",
            borderRadius: "3px",
            padding: "3px 10px",
            fontSize: "10px",
            cursor: isSaving ? 'not-allowed' : 'pointer',
          }}
        >
          Cancel
        </button>
      </div>
      <div style={{ fontSize: "9px", color: "#9CA3AF", marginTop: "2px", fontFamily: "'DM Mono', monospace" }}>
        Press Enter to add, Esc to cancel
      </div>
    </div>
  );
}
