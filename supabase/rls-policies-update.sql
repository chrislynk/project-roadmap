-- Add UPDATE policies for editing roadmap data
-- Run this in your Supabase SQL Editor

-- Drop existing UPDATE policies if they exist
DROP POLICY IF EXISTS "Users can update their roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can update their projects" ON projects;
DROP POLICY IF EXISTS "Users can update their pillars" ON pillars;
DROP POLICY IF EXISTS "Users can update their initiatives" ON initiatives;
DROP POLICY IF EXISTS "Users can update their tasks" ON tasks;
DROP POLICY IF EXISTS "Users can update their subtasks" ON subtasks;

-- Roadmaps: Users can update their own roadmaps
CREATE POLICY "Users can update their roadmaps"
  ON roadmaps
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Projects: Users can update projects in their roadmaps
CREATE POLICY "Users can update their projects"
  ON projects
  FOR UPDATE
  USING (
    roadmap_id IN (
      SELECT id FROM roadmaps WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    roadmap_id IN (
      SELECT id FROM roadmaps WHERE user_id = auth.uid()
    )
  );

-- Pillars: Users can update pillars in their projects
CREATE POLICY "Users can update their pillars"
  ON pillars
  FOR UPDATE
  USING (
    project_id IN (
      SELECT id FROM projects
      WHERE roadmap_id IN (
        SELECT id FROM roadmaps WHERE user_id = auth.uid()
      )
    )
  )
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects
      WHERE roadmap_id IN (
        SELECT id FROM roadmaps WHERE user_id = auth.uid()
      )
    )
  );

-- Initiatives: Users can update initiatives in their pillars
CREATE POLICY "Users can update their initiatives"
  ON initiatives
  FOR UPDATE
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
  )
  WITH CHECK (
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

-- Tasks: Users can update tasks in their initiatives
CREATE POLICY "Users can update their tasks"
  ON tasks
  FOR UPDATE
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
  )
  WITH CHECK (
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

-- Subtasks: Users can update subtasks in their tasks
CREATE POLICY "Users can update their subtasks"
  ON subtasks
  FOR UPDATE
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
  )
  WITH CHECK (
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
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('roadmaps', 'projects', 'pillars', 'initiatives', 'tasks', 'subtasks')
ORDER BY tablename, cmd, policyname;
