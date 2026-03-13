-- Create subtask_steps table for storing steps within subtasks
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com → SQL Editor

-- Create the subtask_steps table
CREATE TABLE IF NOT EXISTS subtask_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subtask_id TEXT NOT NULL,  -- References subtasks.subtask_id (human-readable ID)
  step_id TEXT NOT NULL,     -- e.g., "gv-l1-step-1"
  text TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subtask_steps_subtask_id ON subtask_steps(subtask_id);
CREATE INDEX IF NOT EXISTS idx_subtask_steps_position ON subtask_steps(subtask_id, position);

-- Enable Row Level Security
ALTER TABLE subtask_steps ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view steps for their own subtasks
CREATE POLICY "Users can view their own subtask steps"
  ON subtask_steps
  FOR SELECT
  USING (
    subtask_id IN (
      SELECT subtask_id FROM subtasks
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
      SELECT subtask_id FROM subtasks
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
      SELECT subtask_id FROM subtasks
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
      SELECT subtask_id FROM subtasks
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
