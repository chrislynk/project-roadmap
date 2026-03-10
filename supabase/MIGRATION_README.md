# Data Migration Guide

This guide will help you migrate your existing roadmap data from the hardcoded TypeScript file into Supabase.

## Overview

The migration process converts all data from [src/data/projects.ts](../src/data/projects.ts) into SQL INSERT statements that populate your Supabase database.

**Migration Statistics:**
- 4 Projects
- 12 Pillars
- 29 Initiatives
- 89 Tasks
- 100+ Subtasks

## Step-by-Step Instructions

### 1. Get Your User ID

First, you need your Supabase user ID. Go to your Supabase project's SQL Editor and run:

```sql
SELECT id FROM auth.users WHERE email = 'your-email@example.com';
```

Copy the UUID that's returned (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 2. Update the Seed Script

Open [supabase/seed-data.sql](./seed-data.sql) and replace **ALL** instances of `YOUR_USER_ID_HERE` with the UUID you copied in step 1.

**Find:** `YOUR_USER_ID_HERE`
**Replace with:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

You can use Find & Replace in your editor to change all instances at once.

### 3. Run the Migration

In your Supabase project's SQL Editor, paste the entire contents of [seed-data.sql](./seed-data.sql) and click "Run".

The script will:
- Create 1 roadmap record
- Insert all 4 projects with their metadata
- Insert all 12 pillars (workstreams)
- Insert all 29 initiatives with acceptance criteria
- Insert all 89 tasks
- Insert all subtasks

### 4. Verify the Migration

After running the script, verify your data with these queries:

```sql
-- Check roadmap
SELECT * FROM roadmaps;

-- Check projects
SELECT id, title, color FROM projects;

-- Check a few pillars
SELECT p.title as project, pl.title as pillar
FROM pillars pl
JOIN projects p ON pl.project_id = p.id
LIMIT 10;

-- Check initiatives count
SELECT COUNT(*) FROM initiatives;

-- Check tasks count
SELECT COUNT(*) FROM tasks;

-- Check subtasks count
SELECT COUNT(*) FROM subtasks;
```

## Regenerating the Seed Data

If you need to regenerate the seed data (e.g., after updating [projects.ts](../src/data/projects.ts)):

```bash
npx tsx supabase/generate-seed-data.ts
```

This will overwrite [seed-data.sql](./seed-data.sql) with fresh data.

## Troubleshooting

### "relation does not exist" error
Make sure you've run the schema creation SQL first. Check [PHASE2_EDITABILITY_PLAN.md](../PHASE2_EDITABILITY_PLAN.md) for the complete schema.

### "duplicate key value" error
You've already run this migration. Either:
- Delete the existing data first:
  ```sql
  DELETE FROM roadmaps WHERE user_id = 'your-user-id';
  ```
- Or modify the roadmap ID in the seed script to create a new roadmap

### RLS policy errors
Make sure your user ID matches exactly and that RLS policies are in place. Check with:
```sql
SELECT * FROM pg_policies WHERE tablename IN ('roadmaps', 'projects', 'pillars', 'initiatives', 'tasks', 'subtasks');
```

## Next Steps

After successful migration:
1. ✅ Your data is now in Supabase
2. Continue with Step 2 in [PHASE2_EDITABILITY_PLAN.md](../PHASE2_EDITABILITY_PLAN.md)
3. Create `useRoadmapData` hook to fetch from Supabase
4. Replace hardcoded `ALL_PROJECTS` with dynamic data
