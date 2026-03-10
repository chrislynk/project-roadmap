import { useState, useEffect, useRef } from 'react';
import { useEdit } from '../contexts/EditContext';

interface InlineTextEditorProps {
  value: string;
  onSave: (newValue: string) => Promise<void> | void;
  placeholder?: string;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  className?: string;
  multiline?: boolean;
}

export function InlineTextEditor({
  value,
  onSave,
  placeholder = 'Enter text...',
  style,
  inputStyle,
  className,
  multiline = false,
}: InlineTextEditorProps) {
  const { isEditMode } = useEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [showHover, setShowHover] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Update editValue when value prop changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue.trim() === value.trim()) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      await onSave(editValue.trim());
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (multiline) {
      // For multiline: Ctrl+Enter to save, Escape to cancel
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    } else {
      // For single line: Enter to save, Escape to cancel
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    }
  };

  // If not in edit mode, just display the text
  if (!isEditMode) {
    return <span style={style} className={className}>{value}</span>;
  }

  // If editing, show input
  if (isEditing) {
    const commonStyles: React.CSSProperties = {
      ...style,
      ...inputStyle,
      padding: '4px 8px',
      border: '2px solid #6C63FF',
      borderRadius: '4px',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      color: 'inherit',
      background: '#fff',
      outline: 'none',
      width: '100%',
      ...(isSaving && { opacity: 0.6, pointerEvents: 'none' }),
    };

    return (
      <div style={{ position: 'relative', flex: 1 }}>
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder={placeholder}
            style={{
              ...commonStyles,
              resize: 'vertical',
              minHeight: '60px',
            }}
            disabled={isSaving}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder={placeholder}
            style={commonStyles}
            disabled={isSaving}
          />
        )}
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: 0,
            fontSize: '10px',
            color: '#9CA3AF',
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {isSaving ? 'Saving...' : multiline ? 'Ctrl+Enter to save, Esc to cancel' : 'Enter to save, Esc to cancel'}
        </div>
      </div>
    );
  }

  // Display mode with hover effect
  return (
    <span
      style={{
        ...style,
        cursor: 'pointer',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '2px 4px',
        borderRadius: '4px',
        ...(showHover && {
          background: '#F3F4F6',
        }),
      }}
      className={className}
      onClick={() => setIsEditing(true)}
      onMouseEnter={() => setShowHover(true)}
      onMouseLeave={() => setShowHover(false)}
      title="Click to edit"
    >
      {value || <span style={{ color: '#9CA3AF', fontStyle: 'italic' }}>{placeholder}</span>}
      {showHover && (
        <span style={{ fontSize: '12px', color: '#6C63FF', marginLeft: '4px' }}>✏️</span>
      )}
    </span>
  );
}
