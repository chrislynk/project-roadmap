import type { Project, Pillar, Initiative, Task, Subtask } from '../data/projects';
import { parseDue, formatDateKey } from './dateUtils';

export interface SubtaskDateInfo {
  date: string; // YYYY-MM-DD format
  color: string; // Initiative color (inherited from pillar)
  count: number; // Number of subtasks due for this initiative on this date
  subtasks: Array<{
    text: string;
    taskTitle: string;
    initiativeTitle: string;
  }>;
}

export function aggregateSubtasksByDate(
  projects: Project[],
  projectId: string
): SubtaskDateInfo[] {
  // Map to group subtasks by date and color (initiative)
  const dateColorMap = new Map<string, Map<string, SubtaskDateInfo>>();

  // Determine which projects to process
  const projectsToProcess = projectId === 'overview' ? projects : projects.filter((p) => p.id === projectId);

  // Traverse the project hierarchy
  projectsToProcess.forEach((project) => {
    project.pillars.forEach((pillar: Pillar) => {
      pillar.initiatives.forEach((initiative: Initiative) => {
        const initiativeColor = pillar.color; // Initiatives inherit pillar color

        initiative.tasks.forEach((task: Task) => {
          task.subtasks.forEach((subtask: Subtask) => {
            if (!subtask.due) return; // Skip subtasks without due dates

            const dueDate = parseDue(subtask.due);
            if (!dueDate) return; // Skip invalid dates

            const dateKey = formatDateKey(dueDate);

            // Initialize date entry if needed
            if (!dateColorMap.has(dateKey)) {
              dateColorMap.set(dateKey, new Map());
            }

            const colorMap = dateColorMap.get(dateKey)!;

            // Initialize color entry if needed
            if (!colorMap.has(initiativeColor)) {
              colorMap.set(initiativeColor, {
                date: dateKey,
                color: initiativeColor,
                count: 0,
                subtasks: [],
              });
            }

            const entry = colorMap.get(initiativeColor)!;
            entry.count += 1;
            entry.subtasks.push({
              text: subtask.text,
              taskTitle: task.title,
              initiativeTitle: initiative.title,
            });
          });
        });
      });
    });
  });

  // Flatten the nested maps into a sorted array
  const results: SubtaskDateInfo[] = [];
  dateColorMap.forEach((colorMap) => {
    colorMap.forEach((entry) => {
      results.push(entry);
    });
  });

  // Sort by date ascending
  results.sort((a, b) => a.date.localeCompare(b.date));

  return results;
}
