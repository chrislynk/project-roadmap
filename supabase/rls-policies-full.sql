-- Complete RLS Policies: INSERT and DELETE operations
-- Run this in your Supabase SQL Editor

-- ─────────────────────────────────────────────────────────────────────────────
-- DROP EXISTING INSERT/DELETE POLICIES
-- ─────────────────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Users can insert their roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can insert their projects" ON projects;
DROP POLICY IF EXISTS "Users can insert their pillars" ON pillars;
DROP POLICY IF EXISTS "Users can insert their initiatives" ON initiatives;
DROP POLICY IF EXISTS "Users can insert their tasks" ON tasks;
DROP POLICY IF EXISTS "Users can insert their subtasks" ON subtasks;

DROP POLICY IF EXISTS "Users can delete their roadmaps" ON roadmaps;
DROP POLICY IF EXISTS "Users can delete their projects" ON projects;
DROP POLICY IF EXISTS "Users can delete their pillars" ON pillars;
DROP POLICY IF EXISTS "Users can delete their initiatives" ON initiatives;
DROP POLICY IF EXISTS "Users can delete their tasks" ON tasks;
DROP POLICY IF EXISTS "Users can delete their subtasks" ON subtasks;

-- ─────────────────────────────────────────────────────────────────────────────
-- INSERT POLICIES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "Users can insert their roadmaps"
  ON roadmaps
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert their projects"
  ON projects
  FOR INSERT
  WITH CHECK (
    roadmap_id IN (
      SELECT id FROM roadmaps WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their pillars"
  ON pillars
  FOR INSERT
  WITH CHECK (
    project_id IN (
      SELECT id FROM projects
      WHERE roadmap_id IN (
        SELECT id FROM roadmaps WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can insert their initiatives"
  ON initiatives
  FOR INSERT
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

CREATE POLICY "Users can insert their tasks"
  ON tasks
  FOR INSERT
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

CREATE POLICY "Users can insert their subtasks"
  ON subtasks
  FOR INSERT
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

-- ─────────────────────────────────────────────────────────────────────────────
-- DELETE POLICIES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE POLICY "Users can delete their roadmaps"
  ON roadmaps
  FOR DELETE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their projects"
  ON projects
  FOR DELETE
  USING (
    roadmap_id IN (
      SELECT id FROM roadmaps WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their pillars"
  ON pillars
  FOR DELETE
  USING (
    project_id IN (
      SELECT id FROM projects
      WHERE roadmap_id IN (
        SELECT id FROM roadmaps WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can delete their initiatives"
  ON initiatives
  FOR DELETE
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

CREATE POLICY "Users can delete their tasks"
  ON tasks
  FOR DELETE
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

CREATE POLICY "Users can delete their subtasks"
  ON subtasks
  FOR DELETE
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

-- ─────────────────────────────────────────────────────────────────────────────
-- VERIFY ALL POLICIES
-- ─────────────────────────────────────────────────────────────────────────────

SELECT
  tablename,
  policyname,
  cmd,
  CASE
    WHEN cmd = 'SELECT' THEN 'Read'
    WHEN cmd = 'INSERT' THEN 'Create'
    WHEN cmd = 'UPDATE' THEN 'Update'
    WHEN cmd = 'DELETE' THEN 'Delete'
    ELSE cmd
  END as operation
FROM pg_policies
WHERE tablename IN ('roadmaps', 'projects', 'pillars', 'initiatives', 'tasks', 'subtasks')
ORDER BY tablename,
  CASE cmd
    WHEN 'SELECT' THEN 1
    WHEN 'INSERT' THEN 2
    WHEN 'UPDATE' THEN 3
    WHEN 'DELETE' THEN 4
  END;
