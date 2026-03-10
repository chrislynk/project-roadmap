-- RLS Policies for Roadmap Tables
-- These policies allow users to read nested data through foreign key relationships
-- Run this in your Supabase SQL Editor

-- Enable RLS on all tables if not already enabled
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can view their projects" ON projects;
DROP POLICY IF EXISTS "Users can view their pillars" ON pillars;
DROP POLICY IF EXISTS "Users can view their initiatives" ON initiatives;
DROP POLICY IF EXISTS "Users can view their tasks" ON tasks;
DROP POLICY IF EXISTS "Users can view their subtasks" ON subtasks;

-- Roadmaps: Users can only see their own roadmaps
CREATE POLICY "Users can view their own roadmaps"
  ON roadmaps
  FOR SELECT
  USING (user_id = auth.uid());

-- Projects: Users can see projects that belong to their roadmaps
CREATE POLICY "Users can view their projects"
  ON projects
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM roadmaps
      WHERE roadmaps.id = projects.roadmap_id
      AND roadmaps.user_id = auth.uid()
    )
  );

-- Pillars: Users can see pillars that belong to their projects
CREATE POLICY "Users can view their pillars"
  ON pillars
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      JOIN roadmaps ON roadmaps.id = projects.roadmap_id
      WHERE projects.id = pillars.project_id
      AND roadmaps.user_id = auth.uid()
    )
  );

-- Initiatives: Users can see initiatives that belong to their pillars
CREATE POLICY "Users can view their initiatives"
  ON initiatives
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM pillars
      JOIN projects ON projects.id = pillars.project_id
      JOIN roadmaps ON roadmaps.id = projects.roadmap_id
      WHERE pillars.id = initiatives.pillar_id
      AND roadmaps.user_id = auth.uid()
    )
  );

-- Tasks: Users can see tasks that belong to their initiatives
CREATE POLICY "Users can view their tasks"
  ON tasks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM initiatives
      JOIN pillars ON pillars.id = initiatives.pillar_id
      JOIN projects ON projects.id = pillars.project_id
      JOIN roadmaps ON roadmaps.id = projects.roadmap_id
      WHERE initiatives.id = tasks.initiative_id
      AND roadmaps.user_id = auth.uid()
    )
  );

-- Subtasks: Users can see subtasks that belong to their tasks
CREATE POLICY "Users can view their subtasks"
  ON subtasks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tasks
      JOIN initiatives ON initiatives.id = tasks.initiative_id
      JOIN pillars ON pillars.id = initiatives.pillar_id
      JOIN projects ON projects.id = pillars.project_id
      JOIN roadmaps ON roadmaps.id = projects.roadmap_id
      WHERE tasks.id = subtasks.task_id
      AND roadmaps.user_id = auth.uid()
    )
  );

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('roadmaps', 'projects', 'pillars', 'initiatives', 'tasks', 'subtasks')
ORDER BY tablename, policyname;
