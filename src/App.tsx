import { useState, useMemo } from "react";
import { getDaysUntil, parseDue } from './utils/dateUtils';
import { getTaskStatus, STATUS_META } from './utils/statusUtils';
import { getAllTasks } from './utils/taskUtils';
import { quarterColors } from './utils/constants';
import { useCheckboxState } from './contexts/CheckboxContext';
import { useAuth } from './contexts/AuthContext';
import { useRoadmap } from './contexts/RoadmapContext';
import { useEdit } from './contexts/EditContext';
import { AuthModal } from './components/AuthModal';
import { EditModeToggle } from './components/EditModeToggle';
import { InlineTextEditor } from './components/InlineTextEditor';
import { AddSubtaskButton } from './components/AddSubtaskButton';
import { AddTaskButton } from './components/AddTaskButton';
import { AddInitiativeButton } from './components/AddInitiativeButton';
import { useRoadmapCRUD } from './hooks/useRoadmapCRUD';

// ─────────────────────────────────────────────────────────────────────────────
// SHARED UI ATOMS
// ─────────────────────────────────────────────────────────────────────────────
function QuarterBadge({ q }) {
  const c = quarterColors[q];
  return <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: "4px", padding: "2px 7px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>{q}</span>;
}

function StatusBadge({ status }) {
  const m = STATUS_META[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: m.bg, color: m.text, border: `1px solid ${m.border}`, borderRadius: "20px", padding: "3px 10px", fontSize: "11px", fontWeight: "700", fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
      {m.label}
    </span>
  );
}

function Checkbox({ checked, onChange, color }) {
  return (
    <button onClick={onChange} style={{ width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0, border: checked ? `2px solid ${color}` : "2px solid #D1D5DB", background: checked ? color : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, marginTop: "2px" }}>
      {checked && <span style={{ color: "#fff", fontSize: "10px", lineHeight: 1 }}>✓</span>}
    </button>
  );
}

function SubtaskRow({ subtask, checked, onToggle, color }) {
  const { updateSubtask, deleteSubtask } = useRoadmapCRUD();
  const { isEditMode } = useEdit();
  const [showDelete, setShowDelete] = useState(false);

  const handleSaveText = async (newText: string) => {
    if (newText !== subtask.text) {
      await updateSubtask(subtask.id, { text: newText });
    }
  };

  const handleSaveDue = async (newDue: string) => {
    if (newDue !== (subtask.due || '')) {
      await updateSubtask(subtask.id, { due: newDue || undefined });
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete subtask "${subtask.text}"?`)) {
      try {
        await deleteSubtask(subtask.id);
      } catch (error) {
        console.error('Failed to delete subtask:', error);
        alert('Failed to delete subtask. Please try again.');
      }
    }
  };

  return (
    <div
      style={{ display: "flex", gap: "8px", padding: "6px 0", alignItems: "flex-start", borderBottom: "1px solid #F3F4F6", position: "relative" }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <Checkbox checked={checked} onChange={onToggle} color={color} />
      <InlineTextEditor
        value={subtask.text}
        onSave={handleSaveText}
        style={{
          flex: 1,
          fontSize: "12px",
          color: checked ? "#9CA3AF" : "#374151",
          lineHeight: "1.5",
          fontFamily: "'Inter', sans-serif",
          textDecoration: checked ? "line-through" : "none",
        }}
      />
      <InlineTextEditor
        value={subtask.due || ''}
        onSave={handleSaveDue}
        placeholder="Add due date"
        style={{
          fontSize: "10px",
          color: "#9CA3AF",
          fontFamily: "'DM Mono', monospace",
          flexShrink: 0,
          marginTop: "2px",
          minWidth: "70px",
        }}
      />
      {isEditMode && showDelete && (
        <button
          onClick={handleDelete}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            border: "1px solid #FCA5A5",
            background: "#FEF2F2",
            color: "#DC2626",
            fontSize: "12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: 0,
          }}
          title="Delete subtask"
        >
          ×
        </button>
      )}
    </div>
  );
}

function TaskBlock({ task, pillarColor, checkedItems, onToggle }) {
  const [expanded, setExpanded] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { addSubtask, updateTask, deleteTask } = useRoadmapCRUD();
  const { isEditMode } = useEdit();
  const isLearning = task.type === "learning";
  const taskColor = isLearning ? "#F59E0B" : pillarColor;
  const done = task.subtasks.filter(s => checkedItems[s.id]).length;
  const total = task.subtasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleAddSubtask = async (text: string, due?: string) => {
    const subtaskId = `${task.id}-subtask-${Date.now()}`;
    const position = task.subtasks.length;

    await addSubtask(task.id, {
      subtask_id: subtaskId,
      text,
      due,
      position,
    });
  };

  const handleSaveTitle = async (newTitle: string) => {
    if (newTitle !== task.title) {
      await updateTask(task.id, { title: newTitle });
    }
  };

  const handleSaveDue = async (newDue: string) => {
    if (newDue !== (task.due || '')) {
      await updateTask(task.id, { due: newDue || undefined });
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete task "${task.title}" and all its subtasks?`)) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  return (
    <div
      style={{ border: `1px solid ${isLearning ? "#FDE68A" : "#E8E8F0"}`, borderRadius: "8px", overflow: "hidden", marginBottom: "8px", background: isLearning ? "#FFFBEB" : "#FAFAFA", position: "relative" }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button onClick={() => setExpanded(!expanded)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "10px 14px", textAlign: "left", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "13px", flexShrink: 0 }}>{isLearning ? "📚" : "🔧"}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <InlineTextEditor
              value={task.title}
              onSave={handleSaveTitle}
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#1A1A2E",
                fontFamily: "'Inter', sans-serif",
              }}
            />
            {isLearning && <span style={{ background: "#FDE68A", color: "#92400E", fontSize: "10px", fontWeight: "700", padding: "1px 6px", borderRadius: "3px", fontFamily: "'DM Mono', monospace" }}>LEARN FIRST</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
            <div style={{ width: "120px", height: "4px", background: "#E8E8F0", borderRadius: "2px" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: taskColor, borderRadius: "2px", transition: "width 0.3s" }} />
            </div>
            <span style={{ fontSize: "10px", color: "#6B7280", fontFamily: "'DM Mono', monospace" }}>{done}/{total}</span>
            <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", gap: "4px" }}>
              Due{' '}
              <InlineTextEditor
                value={task.due || ''}
                onSave={handleSaveDue}
                placeholder="Add date"
                style={{
                  fontSize: "10px",
                  color: "#9CA3AF",
                  fontFamily: "'DM Mono', monospace",
                  display: "inline",
                }}
              />
            </span>
          </div>
        </div>
        <span style={{ color: taskColor, fontSize: "14px", transition: "transform 0.2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>▾</span>
      </button>
      {isEditMode && showDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "24px",
            height: "24px",
            borderRadius: "6px",
            border: "1px solid #FCA5A5",
            background: "#FEF2F2",
            color: "#DC2626",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            fontWeight: "bold",
          }}
          title="Delete task"
        >
          ×
        </button>
      )}
      {expanded && (
        <div style={{ padding: "0 14px 10px", borderTop: "1px solid #F0F0F0" }}>
          {task.subtasks.map(s => <SubtaskRow key={s.id} subtask={s} checked={!!checkedItems[s.id]} onToggle={() => onToggle(s.id)} color={taskColor} />)}
          <AddSubtaskButton onAdd={handleAddSubtask} color={taskColor} />
        </div>
      )}
    </div>
  );
}

function InitiativeCard({ initiative, pillarColor, checkedItems, onToggle }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");
  const [showDelete, setShowDelete] = useState(false);
  const { addTask, deleteInitiative, updateInitiative } = useRoadmapCRUD();
  const { isEditMode } = useEdit();
  const allSubtasks = initiative.tasks.flatMap(t => t.subtasks);
  const done = allSubtasks.filter(s => checkedItems[s.id]).length;
  const total = allSubtasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleAddTask = async (title: string, type: 'learning' | 'implementation', due?: string) => {
    const taskId = `${initiative.id}-task-${Date.now()}`;
    const position = initiative.tasks.length;

    await addTask(initiative.id, {
      task_id: taskId,
      title,
      type,
      due,
      position,
    });
  };

  const handleSaveTitle = async (newTitle: string) => {
    if (newTitle !== initiative.title) {
      await updateInitiative(initiative.id, { title: newTitle });
    }
  };

  const handleSaveDueDate = async (newDueDate: string) => {
    if (newDueDate !== (initiative.dueDate || '')) {
      await updateInitiative(initiative.id, { due_date: newDueDate || undefined });
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete initiative "${initiative.title}" and all its tasks?`)) {
      try {
        await deleteInitiative(initiative.id);
      } catch (error) {
        console.error('Failed to delete initiative:', error);
        alert('Failed to delete initiative. Please try again.');
      }
    }
  };

  return (
    <div
      style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E8E8F0", overflow: "hidden", boxShadow: open ? "0 4px 24px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s", position: "relative" }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "16px 20px", textAlign: "left", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "4px", height: "40px", borderRadius: "2px", background: pillarColor, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <InlineTextEditor
              value={initiative.title}
              onSave={handleSaveTitle}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                color: "#1A1A2E",
              }}
            />
            <div style={{ display: "flex", gap: "3px" }}>{initiative.quarters.map(q => <QuarterBadge key={q} q={q} />)}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "100px", height: "5px", background: "#F0F0F8", borderRadius: "3px" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: pillarColor, borderRadius: "3px", transition: "width 0.3s" }} />
              </div>
              <span style={{ fontSize: "10px", color: "#6B7280", fontFamily: "'DM Mono', monospace" }}>{pct}% · {done}/{total}</span>
            </div>
            <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace", display: "flex", alignItems: "center", gap: "4px" }}>
              Due{' '}
              <InlineTextEditor
                value={initiative.dueDate || ''}
                onSave={handleSaveDueDate}
                placeholder="Add date"
                style={{
                  fontSize: "10px",
                  color: "#9CA3AF",
                  fontFamily: "'DM Mono', monospace",
                  display: "inline",
                }}
              />
            </span>
          </div>
        </div>
        <div style={{ color: pillarColor, fontSize: "16px", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>▾</div>
      </button>
      {isEditMode && showDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            border: "1px solid #FCA5A5",
            background: "#FEF2F2",
            color: "#DC2626",
            fontSize: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            fontWeight: "bold",
            zIndex: 10,
          }}
          title="Delete initiative"
        >
          ×
        </button>
      )}
      {open && (
        <div style={{ borderTop: "1px solid #F0F0F8" }}>
          <div style={{ padding: "12px 20px 0", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "flex-start" }}>
            <p style={{ flex: 1, fontSize: "13px", color: "#4B5563", lineHeight: "1.65", margin: 0, fontFamily: "'Inter', sans-serif", minWidth: "200px" }}>{initiative.description}</p>
            <div style={{ background: "#F7F7FC", border: "1px solid #E8E8F0", borderRadius: "8px", padding: "8px 12px", fontSize: "11px", flexShrink: 0 }}>
              <div style={{ color: "#9CA3AF", fontFamily: "'DM Mono', monospace", marginBottom: "2px" }}>ROLE</div>
              <div style={{ color: "#374151", fontWeight: "600", fontFamily: "'Inter', sans-serif" }}>{initiative.owner}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "2px", padding: "12px 20px 0" }}>
            {["tasks","acceptance"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "6px 14px", borderRadius: "6px 6px 0 0", border: "1px solid #E8E8F0", borderBottom: activeTab === tab ? "1px solid #fff" : "1px solid #E8E8F0", background: activeTab === tab ? "#fff" : "#F7F7FC", color: activeTab === tab ? pillarColor : "#9CA3AF", fontWeight: activeTab === tab ? "700" : "500", fontSize: "11px", cursor: "pointer", fontFamily: "'DM Mono', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {tab === "tasks" ? "📋 Tasks & Subtasks" : "✓ Acceptance Criteria"}
              </button>
            ))}
          </div>
          <div style={{ padding: "16px 20px 20px", borderTop: "1px solid #E8E8F0" }}>
            {activeTab === "tasks" && (
              <div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "10px", fontFamily: "'Inter', sans-serif" }}>📚 <strong style={{ color: "#92400E" }}>Learn First</strong> tasks should be completed before starting implementation tasks.</div>
                {initiative.tasks.map(task => <TaskBlock key={task.id} task={task} pillarColor={pillarColor} checkedItems={checkedItems} onToggle={onToggle} />)}
                <AddTaskButton onAdd={handleAddTask} color={pillarColor} />
              </div>
            )}
            {activeTab === "acceptance" && (
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {initiative.acceptance.map((a, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
                    <span style={{ color: "#22C55E", fontSize: "14px", flexShrink: 0, marginTop: "1px" }}>✓</span>
                    <span style={{ fontSize: "13px", color: "#374151", lineHeight: "1.55", fontFamily: "'Inter', sans-serif" }}>{a}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TimelineBar({ quarters }) {
  const allQ = ["Q1","Q2","Q3","Q4"];
  return (
    <div style={{ display: "flex", gap: "2px", marginTop: "6px" }}>
      {allQ.map(q => { const active = quarters.includes(q); const c = quarterColors[q]; return <div key={q} style={{ flex: 1, height: "6px", borderRadius: "3px", background: active ? c.border : "#F0F0F8", border: active ? `1px solid ${c.border}` : "1px solid #E8E8F0" }} title={q} />; })}
    </div>
  );
}

function PillarSection({ pillar, checkedItems, onToggle }) {
  const { addInitiative } = useRoadmapCRUD();
  const allQuarters = [...new Set(pillar.initiatives.flatMap(i => i.quarters))].sort();

  const handleAddInitiative = async (title: string, quarters: string[], owner: string, description?: string) => {
    const initiativeId = `${pillar.id}-initiative-${Date.now()}`;
    const position = pillar.initiatives.length;

    await addInitiative(pillar.id, {
      initiative_id: initiativeId,
      title,
      quarters,
      owner,
      description,
      position,
    });
  };

  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", padding: "18px 22px", background: `linear-gradient(135deg, ${pillar.color}12, ${pillar.color}04)`, borderRadius: "12px", border: `1.5px solid ${pillar.color}28` }}>
        <div style={{ fontSize: "24px" }}>{pillar.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "16px", color: "#1A1A2E" }}>{pillar.title}</div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "2px", fontFamily: "'Inter', sans-serif" }}>{pillar.subtitle}</div>
          <TimelineBar quarters={allQuarters} />
        </div>
        <div style={{ display: "flex", gap: "4px" }}>{allQuarters.map(q => <QuarterBadge key={q} q={q} />)}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {pillar.initiatives.map(i => <InitiativeCard key={i.id} initiative={i} pillarColor={pillar.color} checkedItems={checkedItems} onToggle={onToggle} />)}
        <AddInitiativeButton onAdd={handleAddInitiative} color={pillar.color} />
      </div>
    </div>
  );
}

function ProjectView({ project, checkedItems, onToggle }) {
  // Safety check for pillars
  if (!project.pillars || project.pillars.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#9CA3AF", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
        No workstreams (pillars) found for this project.
      </div>
    );
  }

  const allInitiatives = project.pillars.flatMap((p: any) => p.initiatives);
  const totalSubtasks = allInitiatives.reduce((acc: any, i: any) => acc + i.tasks.reduce((a: any, t: any) => a + t.subtasks.length, 0), 0);
  return (
    <div>
      <div style={{ background: "#F0F0F8", borderRadius: "10px", padding: "12px 16px", marginBottom: "24px", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ margin: 0, fontSize: "13px", color: "#4B5563", lineHeight: "1.6", fontFamily: "'Inter', sans-serif", flex: 1, minWidth: "220px" }}>{project.subtitle}</p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[{ label: "Workstreams", value: project.pillars.length },{ label: "Initiatives", value: allInitiatives.length },{ label: "Subtasks", value: totalSubtasks }].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #E8E8F0", borderRadius: "8px", padding: "8px 14px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "18px", color: "#1A1A2E" }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Mono', monospace" }}>{s.label}</div>
            </div>
          ))}
          {project.wikiUrl && (
            <a href={project.wikiUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "5px", background: "#fff", border: `1px solid ${project.color}40`, borderRadius: "8px", padding: "8px 14px", textDecoration: "none", color: project.color, fontSize: "11px", fontWeight: "700", fontFamily: "'DM Mono', monospace" }}>📖 Wiki</a>
          )}
        </div>
      </div>
      {project.pillars.map(p => <PillarSection key={p.id} pillar={p} checkedItems={checkedItems} onToggle={onToggle} />)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function TaskTableRow({ project, pillar, initiative, task, status, done, total, idx, checkedItems, onToggle, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const [hoveredSubtaskId, setHoveredSubtaskId] = useState<string | null>(null);
  const { updateSubtask, deleteSubtask, addSubtask } = useRoadmapCRUD();
  const { isEditMode } = useEdit();
  const isLearning = task.type === "learning";
  const rowColor = isLearning ? "#F59E0B" : pillar.color;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const handleSaveSubtaskText = async (subtaskId: string, newText: string, currentText: string) => {
    if (newText !== currentText) {
      await updateSubtask(subtaskId, { text: newText });
    }
  };

  const handleSaveSubtaskDue = async (subtaskId: string, newDue: string, currentDue: string | undefined) => {
    if (newDue !== (currentDue || '')) {
      await updateSubtask(subtaskId, { due: newDue || undefined });
    }
  };

  const handleDeleteSubtask = async (subtaskId: string, subtaskText: string) => {
    if (window.confirm(`Delete subtask "${subtaskText}"?`)) {
      try {
        await deleteSubtask(subtaskId);
      } catch (error) {
        console.error('Failed to delete subtask:', error);
        alert('Failed to delete subtask. Please try again.');
      }
    }
  };

  const handleAddSubtask = async (text: string, due?: string) => {
    const subtaskId = `${task.id}-subtask-${Date.now()}`;
    const position = task.subtasks.length;

    await addSubtask(task.id, {
      subtask_id: subtaskId,
      text,
      due,
      position,
    });
  };

  return (
    <div key={task.id}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 140px 110px 90px 90px", gap: "0", padding: "12px 18px", borderBottom: "1px solid #F3F4F6", background: expanded ? "#FAFBFF" : (idx % 2 === 0 ? "#fff" : "#FAFAFA"), cursor: "pointer", alignItems: "center" }}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Task name */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", minWidth: 0 }}>
          <div style={{ width: "3px", height: "32px", borderRadius: "2px", background: project.color, flexShrink: 0, marginTop: "2px" }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#1A1A2E", fontFamily: "'Inter', sans-serif", lineHeight: "1.3" }}>{task.title}</span>
              {isLearning && <span style={{ background: "#FDE68A", color: "#92400E", fontSize: "9px", fontWeight: "700", padding: "1px 5px", borderRadius: "3px", fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>📚</span>}
            </div>
            <div style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'Inter', sans-serif", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              <span style={{ color: project.color, fontWeight: "700" }}>{project.id === "testing" ? "Testing" : "Jenkins"}</span>
              {" · "}{initiative.title}
            </div>
          </div>
        </div>
        {/* Initiative */}
        <div style={{ fontSize: "11px", color: "#6B7280", fontFamily: "'Inter', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: "8px" }} title={initiative.title}>
          {initiative.title}
        </div>
        {/* Due date */}
        <div style={{ fontSize: "11px", fontFamily: "'DM Mono', monospace", color: status === "overdue" ? "#EF4444" : status === "due-soon" ? "#F59E0B" : "#6B7280" }}>
          {task.due || "—"}
        </div>
        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div style={{ flex: 1, height: "5px", background: "#F0F0F8", borderRadius: "3px", maxWidth: "50px" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: rowColor, borderRadius: "3px" }} />
          </div>
          <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace" }}>{done}/{total}</span>
        </div>
        {/* Status */}
        <div><StatusBadge status={status} /></div>
      </div>

      {/* Expanded subtasks inline */}
      {expanded && (
        <div style={{ background: "#F7F8FF", borderBottom: "1px solid #E8E8F0", padding: "8px 18px 12px 38px" }}>
          <div style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Subtasks</div>
          {task.subtasks.map(s => {
            const checked = !!checkedItems[s.id];
            return (
              <div
                key={s.id}
                style={{ display: "flex", gap: "8px", padding: "5px 0", alignItems: "flex-start", borderBottom: "1px solid #EEEEF8", position: "relative" }}
                onMouseEnter={() => setHoveredSubtaskId(s.id)}
                onMouseLeave={() => setHoveredSubtaskId(null)}
              >
                <Checkbox checked={checked} onChange={() => onToggle(s.id)} color={rowColor} />
                <InlineTextEditor
                  value={s.text}
                  onSave={(newText) => handleSaveSubtaskText(s.id, newText, s.text)}
                  style={{
                    flex: 1,
                    fontSize: "12px",
                    color: checked ? "#9CA3AF" : "#374151",
                    fontFamily: "'Inter', sans-serif",
                    textDecoration: checked ? "line-through" : "none",
                    lineHeight: "1.5",
                  }}
                />
                <InlineTextEditor
                  value={s.due || ''}
                  onSave={(newDue) => handleSaveSubtaskDue(s.id, newDue, s.due)}
                  placeholder="Add due date"
                  style={{
                    fontSize: "10px",
                    color: "#9CA3AF",
                    fontFamily: "'DM Mono', monospace",
                    flexShrink: 0,
                    marginTop: "2px",
                    minWidth: "70px",
                  }}
                />
                {isEditMode && hoveredSubtaskId === s.id && (
                  <button
                    onClick={() => handleDeleteSubtask(s.id, s.text)}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: "1px solid #FCA5A5",
                      background: "#FEF2F2",
                      color: "#DC2626",
                      fontSize: "12px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      padding: 0,
                    }}
                    title="Delete subtask"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
          <AddSubtaskButton onAdd={handleAddSubtask} color={rowColor} />
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(project.id); }}
            style={{ marginTop: "8px", fontSize: "11px", color: project.color, background: "none", border: `1px solid ${project.color}40`, borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontWeight: "700" }}
          >
          → View in {
            project.id === "testing"   ? "Testing & Testability"    :
            project.id === "jenkins"   ? "Jenkins Improvement"      :
            project.id === "buildperf" ? "Build Performance"        :
                                         "Knowledge & Stack"
          }
          </button>
        </div>
      )}
    </div>
  );
}

function OverviewSection({ checkedItems, onToggle, onNavigate, projects }: { checkedItems: any; onToggle: any; onNavigate: any; projects: any }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const [filterQuarter, setFilterQuarter] = useState("all");
  const [sortBy, setSortBy] = useState("due");

  const allTasks = useMemo(() => getAllTasks(projects), [projects]);

  const rows = useMemo(() => {
    return allTasks.map(({ project, pillar, initiative, task }) => {
      const status = getTaskStatus(task, checkedItems);
      const days = getDaysUntil(task.due);
      const done = task.subtasks.filter(s => checkedItems[s.id]).length;
      const total = task.subtasks.length;
      return { project, pillar, initiative, task, status, days, done, total };
    });
  }, [allTasks, checkedItems]);

  const filtered = useMemo(() => {
    return rows.filter(r => {
      if (filterStatus !== "all" && r.status !== filterStatus) return false;
      if (filterProject !== "all" && r.project.id !== filterProject) return false;
      if (filterQuarter !== "all" && !r.initiative.quarters.includes(filterQuarter)) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "due") {
        const da = parseDue(a.task.due) || new Date("2099-01-01");
        const db = parseDue(b.task.due) || new Date("2099-01-01");
        return da.getTime() - db.getTime();
      }
      if (sortBy === "status") {
        const order = { overdue: 0, "due-soon": 1, "in-progress": 2, "not-started": 3, complete: 4 };
        return order[a.status] - order[b.status];
      }
      if (sortBy === "project") return a.project.title.localeCompare(b.project.title);
      return 0;
    });
  }, [rows, filterStatus, filterProject, filterQuarter, sortBy]);

  // Summary counts
  const counts = useMemo(() => {
    const c = { overdue: 0, "due-soon": 0, "in-progress": 0, "not-started": 0, complete: 0 };
    rows.forEach(r => c[r.status]++);
    return c;
  }, [rows]);

  const totalSubtasks = rows.reduce((acc, r) => acc + r.total, 0);
  const totalDone = rows.reduce((acc, r) => acc + r.done, 0);
  const overallPct = totalSubtasks > 0 ? Math.round((totalDone / totalSubtasks) * 100) : 0;

  return (
    <div>
      {/* Overall progress bar */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E8E8F0", padding: "20px 24px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "16px", color: "#1A1A2E" }}>Overall Progress — Both Projects</div>
            <div style={{ fontSize: "12px", color: "#6B7280", fontFamily: "'Inter', sans-serif", marginTop: "2px" }}>{totalDone} of {totalSubtasks} subtasks complete across all initiatives</div>
          </div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "28px", color: "#1A1A2E" }}>{overallPct}%</div>
        </div>
        <div style={{ height: "10px", background: "#F0F0F8", borderRadius: "5px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${overallPct}%`, background: "linear-gradient(90deg, #00C2A8, #6C63FF)", borderRadius: "5px", transition: "width 0.4s" }} />
        </div>
        {/* Status summary cards */}
        <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
          {Object.entries(STATUS_META).map(([key, m]) => (
            <div key={key} style={{ flex: 1, minWidth: "80px", background: m.bg, border: `1px solid ${m.border}`, borderRadius: "8px", padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "20px", color: m.text }}>{counts[key]}</div>
              <div style={{ fontSize: "10px", color: m.text, fontFamily: "'DM Mono', monospace", fontWeight: "700", opacity: 0.8 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Sort */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E8E8F0", padding: "14px 18px", marginBottom: "16px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace", marginRight: "4px" }}>STATUS</span>
            <button onClick={() => setFilterStatus("all")} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${filterStatus === "all" ? "#6C63FF" : "#E8E8F0"}`, background: filterStatus === "all" ? "#6C63FF" : "#fff", color: filterStatus === "all" ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: filterStatus === "all" ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>All</button>
            {(["overdue","due-soon","in-progress","not-started","complete"] as const).map(s => <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${filterStatus === s ? "#6C63FF" : "#E8E8F0"}`, background: filterStatus === s ? "#6C63FF" : "#fff", color: filterStatus === s ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: filterStatus === s ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>{STATUS_META[s].label}</button>)}
          </div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace", marginRight: "4px" }}>PROJECT</span>
            <button onClick={() => setFilterProject("all")} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${filterProject === "all" ? "#6C63FF" : "#E8E8F0"}`, background: filterProject === "all" ? "#6C63FF" : "#fff", color: filterProject === "all" ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: filterProject === "all" ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>All</button>
            {projects.map((p: any) => <button key={p.id} onClick={() => setFilterProject(p.id)} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${filterProject === p.id ? "#6C63FF" : "#E8E8F0"}`, background: filterProject === p.id ? "#6C63FF" : "#fff", color: filterProject === p.id ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: filterProject === p.id ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>{p.id === "testing" ? "Testing" : p.id === "jenkins" ? "Jenkins" : p.id === "buildperf" ? "Build Perf" : "Knowledge"}</button>)}
          </div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace", marginRight: "4px" }}>QUARTER</span>
            <button onClick={() => setFilterQuarter("all")} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${filterQuarter === "all" ? "#6C63FF" : "#E8E8F0"}`, background: filterQuarter === "all" ? "#6C63FF" : "#fff", color: filterQuarter === "all" ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: filterQuarter === "all" ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>All</button>
            {["Q1","Q2","Q3","Q4"].map(q => <button key={q} onClick={() => setFilterQuarter(q)} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${filterQuarter === q ? "#6C63FF" : "#E8E8F0"}`, background: filterQuarter === q ? "#6C63FF" : "#fff", color: filterQuarter === q ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: filterQuarter === q ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>{q}</button>)}
          </div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center", marginLeft: "auto" }}>
            <span style={{ fontSize: "10px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace", marginRight: "4px" }}>SORT</span>
            <button onClick={() => setSortBy("due")} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${sortBy === "due" ? "#6C63FF" : "#E8E8F0"}`, background: sortBy === "due" ? "#6C63FF" : "#fff", color: sortBy === "due" ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: sortBy === "due" ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>Due Date</button>
            <button onClick={() => setSortBy("status")} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${sortBy === "status" ? "#6C63FF" : "#E8E8F0"}`, background: sortBy === "status" ? "#6C63FF" : "#fff", color: sortBy === "status" ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: sortBy === "status" ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>Status</button>
            <button onClick={() => setSortBy("project")} style={{ padding: "5px 12px", borderRadius: "6px", border: `1px solid ${sortBy === "project" ? "#6C63FF" : "#E8E8F0"}`, background: sortBy === "project" ? "#6C63FF" : "#fff", color: sortBy === "project" ? "#fff" : "#6B7280", fontSize: "11px", fontWeight: sortBy === "project" ? "700" : "500", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>Project</button>
          </div>
        </div>
        <div style={{ marginTop: "8px", fontSize: "11px", color: "#9CA3AF", fontFamily: "'Inter', sans-serif" }}>
          Showing {filtered.length} of {rows.length} task groups
        </div>
      </div>

      {/* Task table */}
      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #E8E8F0", overflow: "hidden" }}>
        {/* Table header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 110px 90px 90px", gap: "0", padding: "10px 18px", background: "#F7F7FC", borderBottom: "1px solid #E8E8F0" }}>
          {["Task", "Initiative", "Due Date", "Progress", "Status"].map(h => (
            <span key={h} style={{ fontSize: "10px", fontWeight: "700", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", fontFamily: "'DM Mono', monospace" }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#9CA3AF", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
            No tasks match the current filters.
          </div>
        )}

        {filtered.map((row, idx) => (
          <TaskTableRow
            key={row.task.id}
            project={row.project}
            pillar={row.pillar}
            initiative={row.initiative}
            task={row.task}
            status={row.status}
            done={row.done}
            total={row.total}
            idx={idx}
            checkedItems={checkedItems}
            onToggle={onToggle}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  // Global shared checkbox state with localStorage + Supabase sync
  const { checkedItems, toggleItem, clearAll, syncing, lastSyncTime, isSupabaseEnabled } = useCheckboxState();
  const { user, loading, signOut } = useAuth();

  // Load roadmap data from Supabase
  const { projects, loading: roadmapLoading, error: roadmapError } = useRoadmap();

  const handleClearProgress = () => {
    if (window.confirm('Are you sure you want to clear all progress? This will uncheck all completed subtasks and cannot be undone.')) {
      clearAll();
    }
  };

  const tabs = [
    { id: "overview",  label: "📊 Overview",             color: "#6C63FF" },
    { id: "testing",   label: "⚡ Testing & Testability", color: "#00C2A8" },
    { id: "jenkins",   label: "🔧 Jenkins Improvement",   color: "#E85D26" },
    { id: "buildperf", label: "📈 Build Performance",     color: "#0EA5E9" },
    { id: "knowledge", label: "🗺️ Knowledge & Stack",     color: "#8B5CF6" },
  ];

  const currentProject = projects.find((p: any) => p.id === activeTab);

  return (
    <div style={{ minHeight: "100vh", background: "#F7F7FC" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&family=DM+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Show loading state */}
      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "18px", color: "#6B7280" }}>Loading...</div>
          </div>
        </div>
      )}

      {/* Show auth modal if not logged in */}
      {!loading && !user && <AuthModal />}

      {/* Show app if logged in */}
      {!loading && user && (
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "28px 20px" }}>
          {/* Header with Sign Out button */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <div style={{ display: "inline-block", background: "#1A1A2E", color: "#00C2A8", padding: "4px 14px", borderRadius: "20px", fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Jenkins Engineering</div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <EditModeToggle />
                <button
                  onClick={signOut}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "1px solid #E8E8F0",
                    background: "#fff",
                    color: "#6B7280",
                    fontSize: "11px",
                    fontWeight: "700",
                    cursor: "pointer",
                    fontFamily: "'DM Mono', monospace",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#F9FAFB";
                    e.currentTarget.style.borderColor = "#D1D5DB";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "#E8E8F0";
                  }}
                >
                  👋 Sign Out
                </button>
              </div>
            </div>

          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: "800", fontSize: "26px", color: "#1A1A2E", margin: "0 0 6px", lineHeight: "1.2" }}>Engineering Roadmap</h1>
          <p style={{ color: "#6B7280", fontSize: "13px", maxWidth: "480px", margin: "0 auto", lineHeight: "1.6", fontFamily: "'Inter', sans-serif" }}>
            Four parallel projects across {new Date().getFullYear()}. Use the Overview to track all tasks, or drill into each project below.
          </p>
          {user.email && (
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "8px 0 0", fontFamily: "'DM Mono', monospace" }}>
              Signed in as: {user.email}
            </p>
          )}
        </div>

        {/* Tab nav */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "24px", background: "#EEEEF5", borderRadius: "12px", padding: "5px" }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "11px 10px", borderRadius: "9px", border: "none", cursor: "pointer", background: isActive ? "#fff" : "transparent", boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.10)" : "none", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "center" }}>
                  {tab.id !== "overview" && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: tab.color, flexShrink: 0 }} />}
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: "700", fontSize: "12px", color: isActive ? "#1A1A2E" : "#6B7280" }}>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quarter legend (shown on project tabs) */}
        {activeTab !== "overview" && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
            {[{ q: "Q1", label: "Q1: Jan–Apr 30" },{ q: "Q2", label: "Q2: May–Jul 31" },{ q: "Q3", label: "Q3: Aug–Oct 31" },{ q: "Q4", label: "Q4: Nov–Dec 31" }].map(({ q, label }) => {
              const c = quarterColors[q];
              return <div key={q} style={{ display: "flex", alignItems: "center", gap: "5px", background: c.bg, border: `1px solid ${c.border}`, borderRadius: "6px", padding: "3px 10px" }}><span style={{ fontSize: "11px", fontWeight: "700", color: c.text, fontFamily: "'DM Mono', monospace" }}>{label}</span></div>;
            })}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "6px", padding: "3px 10px" }}>
              <span style={{ fontSize: "11px" }}>📚</span>
              <span style={{ fontSize: "11px", fontWeight: "700", color: "#92400E", fontFamily: "'DM Mono', monospace" }}>= Learn First</span>
            </div>
          </div>
        )}

        {/* Content */}
        {activeTab === "overview" && (
          <OverviewSection checkedItems={checkedItems} onToggle={toggleItem} onNavigate={(projectId: any) => setActiveTab(projectId)} projects={projects} />
        )}
        {currentProject && (
          <ProjectView key={currentProject.id} project={currentProject} checkedItems={checkedItems} onToggle={toggleItem} />
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "14px 18px", background: "#fff", borderRadius: "10px", border: "1px solid #E8E8F0", marginTop: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: "200px", flexWrap: "wrap" }}>
            <div style={{ fontSize: "11px", color: "#9CA3AF", fontFamily: "'DM Mono', monospace" }}>
              Progress is saved automatically — checkboxes persist across page refreshes and sync across all tabs
            </div>
            {isSupabaseEnabled && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", color: syncing ? "#F59E0B" : "#10B981", fontFamily: "'DM Mono', monospace", padding: "4px 8px", background: syncing ? "#FFFBEB" : "#F0FDF4", border: `1px solid ${syncing ? "#FDE68A" : "#BBF7D0"}`, borderRadius: "6px" }}>
                <span>{syncing ? "⏳" : "☁️"}</span>
                <span>{syncing ? "Syncing..." : "Cloud Synced"}</span>
                {lastSyncTime && !syncing && (
                  <span style={{ color: "#9CA3AF" }}>
                    • {new Date(lastSyncTime).toLocaleTimeString()}
                  </span>
                )}
              </div>
            )}
          </div>
          <button
            onClick={handleClearProgress}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #FCA5A5",
              background: "#FEF2F2",
              color: "#DC2626",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#FEE2E2";
              e.currentTarget.style.borderColor = "#F87171";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#FEF2F2";
              e.currentTarget.style.borderColor = "#FCA5A5";
            }}
          >
            🗑️ Clear All Progress
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
