import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useRoadmap } from '../contexts/RoadmapContext';
import { parseDue } from '../utils/dateUtils';

export function useRoadmapCRUD() {
  const { refresh } = useRoadmap();

  // ─────────────────────────────────────────────────────────────────────────────
  // HELPERS: Update due dates based on children
  // ─────────────────────────────────────────────────────────────────────────────

  const updateTaskDueFromSubtasks = async (taskId: string) => {
    if (!isSupabaseConfigured()) {
      return;
    }

    // Get the task's internal UUID
    const { data: taskData, error: taskError } = await supabase!
      .from('tasks')
      .select('id')
      .eq('task_id', taskId)
      .single();

    if (taskError || !taskData) {
      console.error('[CRUD] Failed to find task for due date update:', taskError);
      return;
    }

    // Get all subtasks for this task
    const { data: subtasks, error: subtasksError } = await supabase!
      .from('subtasks')
      .select('due')
      .eq('task_id', taskData.id);

    if (subtasksError) {
      console.error('[CRUD] Failed to fetch subtasks for due date update:', subtasksError);
      return;
    }

    // Find the latest due date among subtasks
    let latestDate: Date | null = null;
    let latestDueStr: string | undefined;

    if (subtasks && subtasks.length > 0) {
      for (const subtask of subtasks) {
        if (subtask.due) {
          const parsed = parseDue(subtask.due);
          if (parsed && (!latestDate || parsed > latestDate)) {
            latestDate = parsed;
            latestDueStr = subtask.due;
          }
        }
      }
    }

    // Update the task's due date to match the latest subtask due date
    // If no subtasks have due dates, set it to empty string
    const newDue = latestDueStr || '';

    await supabase!
      .from('tasks')
      .update({
        due: newDue,
        updated_at: new Date().toISOString(),
      })
      .eq('task_id', taskId);
  };

  const updateInitiativeDueFromTasks = async (initiativeId: string) => {
    if (!isSupabaseConfigured()) {
      return;
    }

    // Get the initiative's internal UUID
    const { data: initiativeData, error: initiativeError } = await supabase!
      .from('initiatives')
      .select('id')
      .eq('initiative_id', initiativeId)
      .single();

    if (initiativeError || !initiativeData) {
      console.error('[CRUD] Failed to find initiative for due date update:', initiativeError);
      return;
    }

    // Get all tasks for this initiative
    const { data: tasks, error: tasksError } = await supabase!
      .from('tasks')
      .select('due')
      .eq('initiative_id', initiativeData.id);

    if (tasksError) {
      console.error('[CRUD] Failed to fetch tasks for due date update:', tasksError);
      return;
    }

    // Find the latest due date among tasks
    let latestDate: Date | null = null;
    let latestDueStr: string | undefined;

    if (tasks && tasks.length > 0) {
      for (const task of tasks) {
        if (task.due) {
          const parsed = parseDue(task.due);
          if (parsed && (!latestDate || parsed > latestDate)) {
            latestDate = parsed;
            latestDueStr = task.due;
          }
        }
      }
    }

    // Update the initiative's due date to match the latest task due date
    // If no tasks have due dates, set it to empty string
    const newDue = latestDueStr || '';

    await supabase!
      .from('initiatives')
      .update({
        due_date: newDue,
        updated_at: new Date().toISOString(),
      })
      .eq('initiative_id', initiativeId);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // SUBTASK OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const updateSubtask = async (subtaskId: string, updates: { text?: string; due?: string }) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // Get the subtask's task info before updating
    const { data: subtaskData, error: fetchError } = await supabase!
      .from('subtasks')
      .select('task_id, tasks!inner(task_id)')
      .eq('subtask_id', subtaskId)
      .single();

    if (fetchError || !subtaskData) {
      console.error('[CRUD] Failed to fetch subtask info:', fetchError);
      throw fetchError || new Error('Subtask not found');
    }

    const { error } = await supabase!
      .from('subtasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('subtask_id', subtaskId);

    if (error) {
      console.error('[CRUD] Failed to update subtask:', error);
      throw error;
    }

    // Update parent task's due date based on all subtasks
    await updateTaskDueFromSubtasks((subtaskData as any).tasks.task_id);

    // Refresh roadmap data to reflect changes
    refresh();
  };

  const addSubtask = async (taskId: string, subtask: { subtask_id: string; text: string; due?: string; position: number }) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // First, get the task's internal UUID from the task_id
    const { data: taskData, error: taskError } = await supabase!
      .from('tasks')
      .select('id')
      .eq('task_id', taskId)
      .single();

    if (taskError || !taskData) {
      console.error('[CRUD] Failed to find task:', taskError);
      throw taskError || new Error('Task not found');
    }

    const { error } = await supabase!
      .from('subtasks')
      .insert({
        task_id: taskData.id,
        subtask_id: subtask.subtask_id,
        text: subtask.text,
        due: subtask.due,
        position: subtask.position,
      });

    if (error) {
      console.error('[CRUD] Failed to add subtask:', error);
      throw error;
    }

    // Update parent task's due date based on all subtasks
    await updateTaskDueFromSubtasks(taskId);

    refresh();
  };

  const deleteSubtask = async (subtaskId: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // Get the subtask's task info before deleting
    const { data: subtaskData, error: fetchError } = await supabase!
      .from('subtasks')
      .select('task_id, tasks!inner(task_id)')
      .eq('subtask_id', subtaskId)
      .single();

    if (fetchError || !subtaskData) {
      console.error('[CRUD] Failed to fetch subtask info:', fetchError);
      throw fetchError || new Error('Subtask not found');
    }

    const taskId = (subtaskData as any).tasks.task_id;

    const { error } = await supabase!
      .from('subtasks')
      .delete()
      .eq('subtask_id', subtaskId);

    if (error) {
      console.error('[CRUD] Failed to delete subtask:', error);
      throw error;
    }

    // Update parent task's due date based on remaining subtasks
    await updateTaskDueFromSubtasks(taskId);

    refresh();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // TASK OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const updateTask = async (taskId: string, updates: { title?: string; type?: string; due?: string }) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // If due date is being updated, adjust unchecked subtask due dates
    if (updates.due !== undefined) {
      // Get the task's current due date, internal UUID, and initiative info
      const { data: taskData, error: taskError } = await supabase!
        .from('tasks')
        .select('id, due, initiative_id, initiatives!inner(initiative_id)')
        .eq('task_id', taskId)
        .single();

      if (taskError || !taskData) {
        console.error('[CRUD] Failed to fetch task for due date adjustment:', taskError);
      } else {
        const oldDue = taskData.due;
        const newDue = updates.due;

        // Calculate the time difference in days
        const oldDate = parseDue(oldDue);
        const newDate = parseDue(newDue);

        if (oldDate && newDate) {
          const daysDiff = Math.round((newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24));

          if (daysDiff !== 0) {
            // Get all subtasks for this task
            const { data: subtasks, error: subtasksError } = await supabase!
              .from('subtasks')
              .select('subtask_id, due')
              .eq('task_id', taskData.id);

            if (!subtasksError && subtasks && subtasks.length > 0) {
              // Get checked status for all subtasks
              const { data: checkboxes, error: checkboxError } = await supabase!
                .from('checkboxes')
                .select('subtask_id, checked')
                .in('subtask_id', subtasks.map(s => s.subtask_id));

              const checkedMap = new Map<string, boolean>();
              if (!checkboxError && checkboxes) {
                checkboxes.forEach(cb => checkedMap.set(cb.subtask_id, cb.checked));
              }

              // Update unchecked subtasks with due dates
              for (const subtask of subtasks) {
                const isChecked = checkedMap.get(subtask.subtask_id) || false;
                if (!isChecked && subtask.due) {
                  const subtaskDate = parseDue(subtask.due);
                  if (subtaskDate) {
                    // Add the day difference to the subtask date
                    const newSubtaskDate = new Date(subtaskDate);
                    newSubtaskDate.setDate(newSubtaskDate.getDate() + daysDiff);

                    // Format back to the original format (e.g., "Jan 15" or "Jan 15, 2026")
                    const hasYear = subtask.due.includes(',');
                    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const month = monthNames[newSubtaskDate.getMonth()];
                    const day = newSubtaskDate.getDate();
                    const newSubtaskDue = hasYear
                      ? `${month} ${day}, ${newSubtaskDate.getFullYear()}`
                      : `${month} ${day}`;

                    // Update the subtask
                    await supabase!
                      .from('subtasks')
                      .update({
                        due: newSubtaskDue,
                        updated_at: new Date().toISOString(),
                      })
                      .eq('subtask_id', subtask.subtask_id);
                  }
                }
              }
            }
          }
        }
      }
    }

    // Get initiative info for later update
    const { data: taskInfo, error: taskInfoError } = await supabase!
      .from('tasks')
      .select('initiative_id, initiatives!inner(initiative_id)')
      .eq('task_id', taskId)
      .single();

    const { error } = await supabase!
      .from('tasks')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('task_id', taskId);

    if (error) {
      console.error('[CRUD] Failed to update task:', error);
      throw error;
    }

    // If due date was updated, update the parent initiative's due date
    if (updates.due !== undefined && !taskInfoError && taskInfo) {
      await updateInitiativeDueFromTasks((taskInfo as any).initiatives.initiative_id);
    }

    refresh();
  };

  const addTask = async (initiativeId: string, task: { task_id: string; title: string; type: string; due?: string; position: number }) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // Get the initiative's internal UUID
    const { data: initData, error: initError } = await supabase!
      .from('initiatives')
      .select('id')
      .eq('initiative_id', initiativeId)
      .single();

    if (initError || !initData) {
      console.error('[CRUD] Failed to find initiative:', initError);
      throw initError || new Error('Initiative not found');
    }

    const { error } = await supabase!
      .from('tasks')
      .insert({
        initiative_id: initData.id,
        task_id: task.task_id,
        title: task.title,
        type: task.type,
        due: task.due,
        position: task.position,
      });

    if (error) {
      console.error('[CRUD] Failed to add task:', error);
      throw error;
    }

    // Update parent initiative's due date based on all tasks
    await updateInitiativeDueFromTasks(initiativeId);

    refresh();
  };

  const deleteTask = async (taskId: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // Get the task's initiative info before deleting
    const { data: taskData, error: fetchError } = await supabase!
      .from('tasks')
      .select('initiative_id, initiatives!inner(initiative_id)')
      .eq('task_id', taskId)
      .single();

    if (fetchError || !taskData) {
      console.error('[CRUD] Failed to fetch task info:', fetchError);
      throw fetchError || new Error('Task not found');
    }

    const initiativeId = (taskData as any).initiatives.initiative_id;

    const { error } = await supabase!
      .from('tasks')
      .delete()
      .eq('task_id', taskId);

    if (error) {
      console.error('[CRUD] Failed to delete task:', error);
      throw error;
    }

    // Update parent initiative's due date based on remaining tasks
    await updateInitiativeDueFromTasks(initiativeId);

    refresh();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // INITIATIVE OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const updateInitiative = async (
    initiativeId: string,
    updates: {
      title?: string;
      description?: string;
      owner?: string;
      due_date?: string;
      quarters?: string[];
      acceptance?: string[];
    }
  ) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // If due date is being updated, adjust all task and unchecked subtask due dates
    if (updates.due_date !== undefined) {
      // Get the initiative's current due date and internal UUID
      const { data: initiativeData, error: initiativeError } = await supabase!
        .from('initiatives')
        .select('id, due_date')
        .eq('initiative_id', initiativeId)
        .single();

      if (initiativeError || !initiativeData) {
        console.error('[CRUD] Failed to fetch initiative for due date adjustment:', initiativeError);
      } else {
        const oldDue = initiativeData.due_date;
        const newDue = updates.due_date;

        // Calculate the time difference in days
        const oldDate = parseDue(oldDue);
        const newDate = parseDue(newDue);

        if (oldDate && newDate) {
          const daysDiff = Math.round((newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24));

          if (daysDiff !== 0) {
            // Get all tasks for this initiative
            const { data: tasks, error: tasksError } = await supabase!
              .from('tasks')
              .select('id, task_id, due')
              .eq('initiative_id', initiativeData.id);

            if (!tasksError && tasks && tasks.length > 0) {
              // Helper function to format date back to string
              const formatDate = (date: Date, hasYear: boolean): string => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const month = monthNames[date.getMonth()];
                const day = date.getDate();
                return hasYear
                  ? `${month} ${day}, ${date.getFullYear()}`
                  : `${month} ${day}`;
              };

              // Update each task's due date
              for (const task of tasks) {
                if (task.due) {
                  const taskDate = parseDue(task.due);
                  if (taskDate) {
                    // Add the day difference to the task date
                    const newTaskDate = new Date(taskDate);
                    newTaskDate.setDate(newTaskDate.getDate() + daysDiff);

                    const hasYear = task.due.includes(',');
                    const newTaskDue = formatDate(newTaskDate, hasYear);

                    // Update the task
                    await supabase!
                      .from('tasks')
                      .update({
                        due: newTaskDue,
                        updated_at: new Date().toISOString(),
                      })
                      .eq('task_id', task.task_id);

                    // Now update unchecked subtasks for this task
                    const { data: subtasks, error: subtasksError } = await supabase!
                      .from('subtasks')
                      .select('subtask_id, due')
                      .eq('task_id', task.id);

                    if (!subtasksError && subtasks && subtasks.length > 0) {
                      // Get checked status for all subtasks
                      const { data: checkboxes, error: checkboxError } = await supabase!
                        .from('checkboxes')
                        .select('subtask_id, checked')
                        .in('subtask_id', subtasks.map(s => s.subtask_id));

                      const checkedMap = new Map<string, boolean>();
                      if (!checkboxError && checkboxes) {
                        checkboxes.forEach(cb => checkedMap.set(cb.subtask_id, cb.checked));
                      }

                      // Update unchecked subtasks with due dates
                      for (const subtask of subtasks) {
                        const isChecked = checkedMap.get(subtask.subtask_id) || false;
                        if (!isChecked && subtask.due) {
                          const subtaskDate = parseDue(subtask.due);
                          if (subtaskDate) {
                            // Add the day difference to the subtask date
                            const newSubtaskDate = new Date(subtaskDate);
                            newSubtaskDate.setDate(newSubtaskDate.getDate() + daysDiff);

                            const hasYear = subtask.due.includes(',');
                            const newSubtaskDue = formatDate(newSubtaskDate, hasYear);

                            // Update the subtask
                            await supabase!
                              .from('subtasks')
                              .update({
                                due: newSubtaskDue,
                                updated_at: new Date().toISOString(),
                              })
                              .eq('subtask_id', subtask.subtask_id);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    const { error } = await supabase!
      .from('initiatives')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('initiative_id', initiativeId);

    if (error) {
      console.error('[CRUD] Failed to update initiative:', error);
      throw error;
    }

    refresh();
  };

  const addInitiative = async (
    pillarId: string,
    initiative: {
      initiative_id: string;
      title: string;
      description?: string;
      owner?: string;
      due_date?: string;
      quarters: string[];
      acceptance?: string[];
      position: number;
    }
  ) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    // Get the pillar's internal UUID
    const { data: pillarData, error: pillarError } = await supabase!
      .from('pillars')
      .select('id')
      .eq('pillar_id', pillarId)
      .single();

    if (pillarError || !pillarData) {
      console.error('[CRUD] Failed to find pillar:', pillarError);
      throw pillarError || new Error('Pillar not found');
    }

    const { error } = await supabase!
      .from('initiatives')
      .insert({
        pillar_id: pillarData.id,
        initiative_id: initiative.initiative_id,
        title: initiative.title,
        description: initiative.description,
        owner: initiative.owner,
        due_date: initiative.due_date,
        quarters: initiative.quarters,
        acceptance: initiative.acceptance || [],
        position: initiative.position,
      });

    if (error) {
      console.error('[CRUD] Failed to add initiative:', error);
      throw error;
    }

    refresh();
  };

  const deleteInitiative = async (initiativeId: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase!
      .from('initiatives')
      .delete()
      .eq('initiative_id', initiativeId);

    if (error) {
      console.error('[CRUD] Failed to delete initiative:', error);
      throw error;
    }

    refresh();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // PILLAR OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const updatePillar = async (
    pillarId: string,
    updates: {
      title?: string;
      subtitle?: string;
      icon?: string;
      color?: string;
    }
  ) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase!
      .from('pillars')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('pillar_id', pillarId);

    if (error) {
      console.error('[CRUD] Failed to update pillar:', error);
      throw error;
    }

    refresh();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // PROJECT OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const updateProject = async (
    projectId: string,
    updates: {
      title?: string;
      subtitle?: string;
      color?: string;
      wiki_url?: string;
    }
  ) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase!
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('project_id', projectId);

    if (error) {
      console.error('[CRUD] Failed to update project:', error);
      throw error;
    }

    refresh();
  };

  return {
    // Subtask operations
    updateSubtask,
    addSubtask,
    deleteSubtask,

    // Task operations
    updateTask,
    addTask,
    deleteTask,

    // Initiative operations
    updateInitiative,
    addInitiative,
    deleteInitiative,

    // Pillar operations
    updatePillar,

    // Project operations
    updateProject,
  };
}
