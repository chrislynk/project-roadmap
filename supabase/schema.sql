-- Project Roadmap Progress Tracking Schema
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com → SQL Editor

-- Create the progress table
CREATE TABLE IF NOT EXISTS progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  subtask_id TEXT NOT NULL,
  checked BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Unique constraint: one record per user per subtask
  UNIQUE(user_id, subtask_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_progress_user_id ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_updated_at ON progress(updated_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own progress
CREATE POLICY "Users can view their own progress"
  ON progress
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert their own progress"
  ON progress
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy: Users can update their own progress
CREATE POLICY "Users can update their own progress"
  ON progress
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policy: Users can delete their own progress
CREATE POLICY "Users can delete their own progress"
  ON progress
  FOR DELETE
  USING (user_id = auth.uid());

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before update
CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Realtime for the progress table (for live sync)
ALTER PUBLICATION supabase_realtime ADD TABLE progress;

-- Grant necessary permissions
GRANT ALL ON progress TO anon;
GRANT ALL ON progress TO authenticated;
