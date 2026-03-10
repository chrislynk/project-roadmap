import type { Project, Pillar, Initiative, Task } from '../data/projects';

interface TaskRow {
  project: Project;
  pillar: Pillar;
  initiative: Initiative;
  task: Task;
}

export function getAllTasks(projects: Project[]): TaskRow[] {
  const rows: TaskRow[] = [];
  for (const project of projects) {
    for (const pillar of project.pillars) {
      for (const initiative of pillar.initiatives) {
        for (const task of initiative.tasks) {
          rows.push({ project, pillar, initiative, task });
        }
      }
    }
  }
  return rows;
}
