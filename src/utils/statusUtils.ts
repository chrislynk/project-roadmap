import { getDaysUntil } from './dateUtils';
import type { Task } from '../data/projects';

export type TaskStatus = 'overdue' | 'due-soon' | 'in-progress' | 'not-started' | 'complete';

export const STATUS_META = {
  overdue: {
    label: "Overdue",
    bg: "#FEE2E2",
    text: "#991B1B",
    border: "#FCA5A5",
    dot: "#EF4444",
  },
  "due-soon": {
    label: "Due Soon",
    bg: "#FEF3C7",
    text: "#92400E",
    border: "#FDE68A",
    dot: "#F59E0B",
  },
  "in-progress": {
    label: "In Progress",
    bg: "#DBEAFE",
    text: "#1E40AF",
    border: "#BFDBFE",
    dot: "#3B82F6",
  },
  "not-started": {
    label: "Not Started",
    bg: "#F3F4F6",
    text: "#6B7280",
    border: "#E5E7EB",
    dot: "#9CA3AF",
  },
  complete: {
    label: "Complete",
    bg: "#D1FAE5",
    text: "#065F46",
    border: "#A7F3D0",
    dot: "#10B981",
  },
};

export function getTaskStatus(
  task: Task,
  checkedItems: Record<string, boolean>
): TaskStatus {
  const total = task.subtasks.length;
  const done = task.subtasks.filter(s => checkedItems[s.id]).length;

  if (done === total) return "complete";

  const days = getDaysUntil(task.due);
  if (days !== null && days < 0) return "overdue";
  if (days !== null && days <= 14) return "due-soon";
  if (done > 0) return "in-progress";

  return "not-started";
}
