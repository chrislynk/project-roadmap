import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useRoadmap } from '../contexts/RoadmapContext';

export function useRoadmapCRUD() {
  const { refresh } = useRoadmap();

  // ─────────────────────────────────────────────────────────────────────────────
  // SUBTASK OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const updateSubtask = async (subtaskId: string, updates: { text?: string; due?: string }) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
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

    refresh();
  };

  const deleteSubtask = async (subtaskId: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase!
      .from('subtasks')
      .delete()
      .eq('subtask_id', subtaskId);

    if (error) {
      console.error('[CRUD] Failed to delete subtask:', error);
      throw error;
    }

    refresh();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // TASK OPERATIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const updateTask = async (taskId: string, updates: { title?: string; type?: string; due?: string }) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

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

    refresh();
  };

  const deleteTask = async (taskId: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase is not configured');
    }

    const { error } = await supabase!
      .from('tasks')
      .delete()
      .eq('task_id', taskId);

    if (error) {
      console.error('[CRUD] Failed to delete task:', error);
      throw error;
    }

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
  };
}
