import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useRoadmapData } from '../hooks/useRoadmapData';
import { ALL_PROJECTS } from '../data/projects';
import type { Project } from '../data/projects';

interface RoadmapContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  lastFetchTime: Date | null;
  refresh: () => void;
  isSupabaseConfigured: boolean;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export function RoadmapProvider({ children }: { children: ReactNode }) {
  const {
    projects: fetchedProjects,
    loading,
    error,
    lastFetchTime,
    refresh,
    isSupabaseConfigured,
  } = useRoadmapData();

  // Fallback to hardcoded projects if:
  // 1. Supabase is not configured, OR
  // 2. No projects were fetched (empty roadmap)
  const projects =
    fetchedProjects.length > 0 ? fetchedProjects : ALL_PROJECTS;

  return (
    <RoadmapContext.Provider
      value={{
        projects,
        loading,
        error,
        lastFetchTime,
        refresh,
        isSupabaseConfigured,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (!context) {
    throw new Error('useRoadmap must be used within RoadmapProvider');
  }
  return context;
}
