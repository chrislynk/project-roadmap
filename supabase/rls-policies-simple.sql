-- Simplified RLS Policies for Roadmap Tables
-- These use simpler joins that are less likely to cause transaction errors
-- Run this in your Supabase SQL Editor

-- First, drop all existing policies
DROP POLICY IF EXISTS "Users can view their own roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can view their projects" ON projects;
DROP POLICY IF EXISTS "Users can view their pillars" ON pillars;
DROP POLICY IF EXISTS "Users can view their initiatives" ON initiatives;
DROP POLICY IF EXISTS "Users can view their tasks" ON tasks;
DROP POLICY IF EXISTS "Users can view their subtasks" ON subtasks;

-- Roadmaps: Direct user ownership
CREATE POLICY "Users can view their own roadmaps"
  ON roadmaps
  FOR SELECT
  USING (user_id = auth.uid());

-- Projects: Check through roadmaps table
CREATE POLICY "Users can view their projects"
  ON projects
  FOR SELECT
  USING (
    roadmap_id IN (
      SELECT id FROM roadmaps WHERE user_id = auth.uid()
    )
  );

-- Pillars: Check through projects
CREATE POLICY "Users can view their pillars"
  ON pillars
  FOR SELECT
  USING (
    project_id IN (
      SELECT id FROM projects
      WHERE roadmap_id IN (
        SELECT id FROM roadmaps WHERE user_id = auth.uid()
      )
    )
  );

-- Initiatives: Check through pillars
CREATE POLICY "Users can view their initiatives"
  ON initiatives
  FOR SELECT
  USING (
    pillar_id IN (
      SELECT id FROM pillars
      WHERE project_id IN (
        SELECT id FROM projects
        WHERE roadmap_id IN (
          SELECT id FROM roadmaps WHERE user_id = auth.uid()
        )
      )
    )
  );

-- Tasks: Check through initiatives
CREATE POLICY "Users can view their tasks"
  ON tasks
  FOR SELECT
  USING (
    initiative_id IN (
      SELECT id FROM initiatives
      WHERE pillar_id IN (
        SELECT id FROM pillars
        WHERE project_id IN (
          SELECT id FROM projects
          WHERE roadmap_id IN (
            SELECT id FROM roadmaps WHERE user_id = auth.uid()
          )
        )
      )
    )
  );

-- Subtasks: Check through tasks
CREATE POLICY "Users can view their subtasks"
  ON subtasks
  FOR SELECT
  USING (
    task_id IN (
      SELECT id FROM tasks
      WHERE initiative_id IN (
        SELECT id FROM initiatives
        WHERE pillar_id IN (
          SELECT id FROM pillars
          WHERE project_id IN (
            SELECT id FROM projects
            WHERE roadmap_id IN (
              SELECT id FROM roadmaps WHERE user_id = auth.uid()
            )
          )
        )
      )
    )
  );

-- Verify policies were created
SELECT tablename, policyname
FROM pg_policies
WHERE tablename IN ('roadmaps', 'projects', 'pillars', 'initiatives', 'tasks', 'subtasks')
ORDER BY tablename;
