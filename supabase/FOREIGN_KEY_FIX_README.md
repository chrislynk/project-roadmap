# Foreign Key Fix for subtask_steps

## Problem
The error occurred because:
1. `subtask_steps.subtask_id` was a TEXT field without a foreign key constraint
2. It was trying to reference `subtasks.subtask_id` (also TEXT) instead of `subtasks.id` (UUID primary key)
3. Supabase requires proper foreign key relationships for nested queries to work

## Solution Applied

### 1. Database Schema Fix
Created [fix-subtask-steps-foreign-key.sql](./fix-subtask-steps-foreign-key.sql) to:
- Drop and recreate `subtask_steps` table with proper foreign key
- Change `subtask_id` from TEXT to UUID
- Add foreign key: `REFERENCES subtasks(id) ON DELETE CASCADE`

### 2. Code Updates
Updated [src/hooks/useRoadmapCRUD.ts](../src/hooks/useRoadmapCRUD.ts) to convert human-readable IDs to UUIDs:

#### Functions Updated:
- **addStep** (line ~355): Now looks up the subtask's UUID before inserting
- **moveStepUp** (line ~428): Converts subtask_id to UUID before querying steps
- **moveStepDown** (line ~476): Converts subtask_id to UUID before querying steps
- **deleteSubtask** (line ~285): Uses UUID when deleting associated steps

All functions now:
1. Query `subtasks` table to get the UUID from the human-readable `subtask_id`
2. Use that UUID when inserting/querying `subtask_steps`

## Migration Steps

### Apply the Database Fix:
1. Go to Supabase SQL Editor
2. Run [fix-subtask-steps-foreign-key.sql](./fix-subtask-steps-foreign-key.sql)
   - ⚠️ This drops the existing table (data loss if you have steps)
   - If you need to preserve data, contact us for a migration script

### Verify the Fix:
```sql
-- Check the foreign key exists
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'subtask_steps';
```

Expected result:
- table_name: `subtask_steps`
- column_name: `subtask_id`
- foreign_table_name: `subtasks`
- foreign_column_name: `id`

### Test Adding Steps:
1. Open your app in edit mode
2. Try adding a step to any subtask
3. Should work without UUID errors

## Technical Details

### Old Schema (Incorrect):
```sql
CREATE TABLE subtask_steps (
  id UUID PRIMARY KEY,
  subtask_id TEXT NOT NULL,  -- ❌ No foreign key, references TEXT field
  ...
);
```

### New Schema (Correct):
```sql
CREATE TABLE subtask_steps (
  id UUID PRIMARY KEY,
  subtask_id UUID NOT NULL REFERENCES subtasks(id) ON DELETE CASCADE,  -- ✅ Proper FK
  ...
);
```

### Code Pattern Used:
```typescript
// Before (ERROR):
await supabase.from('subtask_steps').insert({
  subtask_id: 'brand-l1',  // ❌ TEXT ID doesn't match UUID column
  ...
});

// After (FIXED):
const { data } = await supabase.from('subtasks')
  .select('id')
  .eq('subtask_id', 'brand-l1')
  .single();

await supabase.from('subtask_steps').insert({
  subtask_id: data.id,  // ✅ UUID from primary key
  ...
});
```

## Files Changed
1. ✅ `supabase/fix-subtask-steps-foreign-key.sql` (new)
2. ✅ `src/hooks/useRoadmapCRUD.ts` (updated 4 functions)

## What This Enables
- Nested queries in `useRoadmapData.ts` now work correctly
- Steps are properly associated with subtasks
- Cascade deletes work (delete subtask → auto-delete steps)
- Database referential integrity is maintained
