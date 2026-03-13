-- Fix foreign key relationship between subtask_steps and subtasks
-- This migration adds a proper foreign key constraint

-- Step 1: Drop the existing table if needed (WARNING: this deletes data!)
-- If you have existing data, you'll need to migrate it first
DROP TABLE IF EXISTS subtask_steps CASCADE;

-- Step 2: Recreate the table with proper foreign key
CREATE TABLE subtask_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subtask_id UUID NOT NULL REFERENCES subtasks(id) ON DELETE CASCADE,  -- FIXED: Now references subtasks.id (UUID) instead of subtask_id (TEXT)
  step_id TEXT NOT NULL,     -- Human-readable ID, e.g., "gv-l1-step-1"
  text TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_subtask_steps_subtask_id ON subtask_steps(subtask_id);
CREATE INDEX idx_subtask_steps_position ON subtask_steps(subtask_id, position);

-- Enable Row Level Security
ALTER TABLE subtask_steps ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view steps for their own subtasks
CREATE POLICY "Users can view their own subtask steps"
  ON subtask_steps
  FOR SELECT
  USING (
    subtask_id IN (
      SELECT id FROM subtasks
      WHERE task_id IN (
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
  );

-- RLS Policy: Users can insert steps for their own subtasks
CREATE POLICY "Users can insert their own subtask steps"
  ON subtask_steps
  FOR INSERT
  WITH CHECK (
    subtask_id IN (
      SELECT id FROM subtasks
      WHERE task_id IN (
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
  );

-- RLS Policy: Users can update their own subtask steps
CREATE POLICY "Users can update their own subtask steps"
  ON subtask_steps
  FOR UPDATE
  USING (
    subtask_id IN (
      SELECT id FROM subtasks
      WHERE task_id IN (
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
  );

-- RLS Policy: Users can delete their own subtask steps
CREATE POLICY "Users can delete their own subtask steps"
  ON subtask_steps
  FOR DELETE
  USING (
    subtask_id IN (
      SELECT id FROM subtasks
      WHERE task_id IN (
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
  );

-- Trigger to automatically update the updated_at timestamp
CREATE TRIGGER update_subtask_steps_updated_at
  BEFORE UPDATE ON subtask_steps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Realtime for the subtask_steps table (for live sync across devices)
ALTER PUBLICATION supabase_realtime ADD TABLE subtask_steps;

-- Grant necessary permissions
GRANT ALL ON subtask_steps TO anon;
GRANT ALL ON subtask_steps TO authenticated;
