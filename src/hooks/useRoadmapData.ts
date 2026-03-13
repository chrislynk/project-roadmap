import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useLocalStorage } from './useLocalStorage';
import type { Project } from '../data/projects';

interface RoadmapDataState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  lastFetchTime: Date | null;
}

export function useRoadmapData() {
  const [state, setState] = useState<RoadmapDataState>({
    projects: [],
    loading: true,
    error: null,
    lastFetchTime: null,
  });

  // localStorage cache for offline support
  const [cachedProjects, setCachedProjects] = useLocalStorage<Project[]>(
    'project-roadmap-data',
    []
  );

  // Track if we're currently fetching to prevent concurrent requests
  const isFetchingRef = useRef(false);
  // Track current user to prevent unnecessary refetches
  const currentUserRef = useRef<string | null>(null);

  // Transform Supabase data to match TypeScript interfaces
  const transformSupabaseData = useCallback((data: any[]): Project[] => {
    // Group data by project
    const projectsMap = new Map<string, any>();

    data.forEach((row) => {
      const { project_id, project_title, project_subtitle, project_color, project_wiki_url } = row;

      if (!projectsMap.has(project_id)) {
        projectsMap.set(project_id, {
          id: project_id,
          title: project_title,
          subtitle: project_subtitle,
          color: project_color,
          wikiUrl: project_wiki_url,
          pillars: [],
        });
      }
    });

    // Group pillars, initiatives, tasks, and subtasks
    data.forEach((row) => {
      const project = projectsMap.get(row.project_id);
      if (!project) return;

      // Find or create pillar
      let pillar = project.pillars.find((p: any) => p.id === row.pillar_id);
      if (!pillar && row.pillar_id) {
        pillar = {
          id: row.pillar_id,
          title: row.pillar_title,
          subtitle: row.pillar_subtitle,
          color: row.pillar_color,
          icon: row.pillar_icon,
          initiatives: [],
        };
        project.pillars.push(pillar);
      }

      if (!pillar) return;

      // Find or create initiative
      let initiative = pillar.initiatives.find((i: any) => i.id === row.initiative_id);
      if (!initiative && row.initiative_id) {
        initiative = {
          id: row.initiative_id,
          title: row.initiative_title,
          quarters: row.initiative_quarters || [],
          dueDate: row.initiative_due_date,
          description: row.initiative_description,
          owner: row.initiative_owner,
          tasks: [],
          acceptance: row.initiative_acceptance || [],
        };
        pillar.initiatives.push(initiative);
      }

      if (!initiative) return;

      // Find or create task
      let task = initiative.tasks.find((t: any) => t.id === row.task_id);
      if (!task && row.task_id) {
        task = {
          id: row.task_id,
          type: row.task_type,
          title: row.task_title,
          due: row.task_due,
          subtasks: [],
        };
        initiative.tasks.push(task);
      }

      if (!task) return;

      // Add subtask if it doesn't exist
      if (row.subtask_id && !task.subtasks.find((s: any) => s.id === row.subtask_id)) {
        task.subtasks.push({
          id: row.subtask_id,
          text: row.subtask_text,
          due: row.subtask_due,
        });
      }
    });

    return Array.from(projectsMap.values());
  }, []);

  // Fetch roadmap data from Supabase
  const fetchRoadmapData = useCallback(async () => {
    // Prevent concurrent fetches
    if (isFetchingRef.current) {
      return;
    }

    if (!isSupabaseConfigured()) {
      setState({
        projects: cachedProjects,
        loading: false,
        error: null,
        lastFetchTime: null,
      });
      return;
    }

    try {
      isFetchingRef.current = true;
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Get current user
      const {
        data: { session },
      } = await supabase!.auth.getSession();

      if (!session?.user?.id) {
        setState({
          projects: cachedProjects,
          loading: false,
          error: null,
          lastFetchTime: null,
        });
        return;
      }

      // Store current user
      currentUserRef.current = session.user.id;

      // Fetch all roadmap data with a single query using joins
      const { data, error } = await supabase!
        .from('roadmaps')
        .select(
          `
          id,
          name,
          projects (
            id,
            project_id,
            title,
            subtitle,
            color,
            wiki_url,
            position,
            pillars (
              id,
              pillar_id,
              title,
              subtitle,
              icon,
              color,
              position,
              initiatives (
                id,
                initiative_id,
                title,
                description,
                owner,
                due_date,
                quarters,
                acceptance,
                position,
                tasks (
                  id,
                  task_id,
                  title,
                  type,
                  due,
                  position,
                  subtasks (
                    id,
                    subtask_id,
                    text,
                    due,
                    position,
                    subtask_steps (
                      id,
                      step_id,
                      text,
                      position
                    )
                  )
                )
              )
            )
          )
        `
        )
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No roadmap found - use cached data or empty
          setState({
            projects: cachedProjects.length > 0 ? cachedProjects : [],
            loading: false,
            error: null,
            lastFetchTime: null,
          });
          return;
        }
        throw error;
      }

      if (data?.projects) {
        // Transform the nested data structure
        const transformedProjects: Project[] = data.projects
          .sort((a: any, b: any) => a.position - b.position)
          .map((proj: any) => ({
            id: proj.project_id,
            title: proj.title,
            subtitle: proj.subtitle,
            color: proj.color,
            wikiUrl: proj.wiki_url,
            pillars: proj.pillars
              .sort((a: any, b: any) => a.position - b.position)
              .map((pill: any) => ({
                id: pill.pillar_id,
                title: pill.title,
                subtitle: pill.subtitle,
                color: pill.color,
                icon: pill.icon,
                initiatives: pill.initiatives
                  .sort((a: any, b: any) => a.position - b.position)
                  .map((init: any) => ({
                    id: init.initiative_id,
                    title: init.title,
                    quarters: init.quarters,
                    dueDate: init.due_date,
                    description: init.description,
                    owner: init.owner,
                    acceptance: init.acceptance,
                    tasks: init.tasks
                      .sort((a: any, b: any) => a.position - b.position)
                      .map((task: any) => ({
                        id: task.task_id,
                        type: task.type,
                        title: task.title,
                        due: task.due,
                        subtasks: task.subtasks
                          .sort((a: any, b: any) => a.position - b.position)
                          .map((sub: any) => ({
                            id: sub.subtask_id,
                            text: sub.text,
                            due: sub.due,
                            steps: sub.subtask_steps
                              ? sub.subtask_steps
                                  .sort((a: any, b: any) => a.position - b.position)
                                  .map((step: any) => ({
                                    id: step.step_id,
                                    text: step.text,
                                  }))
                              : [],
                          })),
                      })),
                  })),
              })),
          }));

        // Update cache
        setCachedProjects(transformedProjects);

        setState({
          projects: transformedProjects,
          loading: false,
          error: null,
          lastFetchTime: new Date(),
        });
      } else {
        // No projects found, use cache
        setState({
          projects: cachedProjects,
          loading: false,
          error: null,
          lastFetchTime: new Date(),
        });
      }
    } catch (error: any) {
      console.error('[Roadmap] Failed to fetch data:', error);

      // Fall back to cached data on error
      setState({
        projects: cachedProjects,
        loading: false,
        error: error.message || 'Failed to load roadmap data',
        lastFetchTime: null,
      });
    } finally {
      isFetchingRef.current = false;
    }
  }, [cachedProjects, setCachedProjects]);

  // Refresh roadmap data
  const refresh = useCallback(() => {
    fetchRoadmapData();
  }, [fetchRoadmapData]);

  // Load data on mount and when auth state changes
  useEffect(() => {
    fetchRoadmapData();

    if (!isSupabaseConfigured()) return;

    // Listen for auth changes and refetch only if user changed
    const {
      data: { subscription },
    } = supabase!.auth.onAuthStateChange((_event, session) => {
      const newUserId = session?.user?.id;
      // Only refetch if user actually changed (not just auth state refresh)
      if (newUserId && newUserId !== currentUserRef.current) {
        fetchRoadmapData();
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchRoadmapData]);

  return {
    projects: state.projects,
    loading: state.loading,
    error: state.error,
    lastFetchTime: state.lastFetchTime,
    refresh,
    isSupabaseConfigured: isSupabaseConfigured(),
  };
}
