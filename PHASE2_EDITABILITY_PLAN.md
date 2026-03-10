# Phase 2: Add Editability

## Current State (Completed)

✅ **Phase 1 Complete**
- React roadmap app with localStorage persistence
- Supabase authentication (email/password)
- Cross-device sync for checkbox progress
- Deployed to Vercel/hosting platform
- User authentication working

## Architecture for Editability

### Database Schema (Supabase)

**New Tables Needed:**

```sql
-- Store roadmap content (projects, pillars, initiatives, tasks)
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL, -- e.g., "testing", "jenkins"
  title TEXT NOT NULL,
  subtitle TEXT,
  color TEXT NOT NULL,
  icon TEXT,
  wiki_url TEXT,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store pillars (workstreams)
CREATE TABLE pillars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  pillar_id TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  color TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store initiatives
CREATE TABLE initiatives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pillar_id UUID REFERENCES pillars(id) ON DELETE CASCADE,
  initiative_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  owner TEXT,
  due_date TEXT,
  quarters TEXT[] NOT NULL, -- ["Q1", "Q2"]
  acceptance JSONB NOT NULL, -- Array of acceptance criteria
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  initiative_id UUID REFERENCES initiatives(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL, -- "learning" or "implementation"
  due TEXT,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store subtasks
CREATE TABLE subtasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  subtask_id TEXT NOT NULL, -- e.g., "testing-cov-rep-1"
  text TEXT NOT NULL,
  due TEXT,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only see/edit their own data)
CREATE POLICY "Users can CRUD their own roadmaps"
  ON roadmaps FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can CRUD their own projects"
  ON projects FOR ALL
  USING (roadmap_id IN (SELECT id FROM roadmaps WHERE user_id = auth.uid()))
  WITH CHECK (roadmap_id IN (SELECT id FROM roadmaps WHERE user_id = auth.uid()));

-- Similar policies for pillars, initiatives, tasks, subtasks...

-- Indexes for performance
CREATE INDEX idx_projects_roadmap ON projects(roadmap_id);
CREATE INDEX idx_pillars_project ON pillars(project_id);
CREATE INDEX idx_initiatives_pillar ON initiatives(pillar_id);
CREATE INDEX idx_tasks_initiative ON tasks(initiative_id);
CREATE INDEX idx_subtasks_task ON subtasks(task_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE roadmaps;
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE pillars;
ALTER PUBLICATION supabase_realtime ADD TABLE initiatives;
ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
ALTER PUBLICATION supabase_realtime ADD TABLE subtasks;
```

## Implementation Steps

### Step 1: Data Migration
- [ ] Create database schema in Supabase
- [ ] Create migration script to seed current roadmap data
- [ ] Convert `src/data/projects.ts` content to database records

### Step 2: Data Loading
- [ ] Create `useRoadmapData` hook to fetch from Supabase
- [ ] Replace hardcoded `ALL_PROJECTS` with dynamic data
- [ ] Add loading states and error handling
- [ ] Keep localStorage as cache for offline mode

### Step 3: Edit UI Components

**Edit Modes:**
- [ ] Add "Edit Mode" toggle in header (only visible to owner)
- [ ] Inline editing for text fields (click to edit)
- [ ] Modal editors for complex objects (initiatives, tasks)
- [ ] Drag-and-drop reordering

**Components to Create:**
- `EditModeToggle` - Switch between view/edit modes
- `InlineTextEditor` - Click to edit text inline
- `ProjectEditor` - Modal to add/edit projects
- `InitiativeEditor` - Modal to add/edit initiatives
- `TaskEditor` - Modal to add/edit tasks/subtasks
- `DeleteConfirmation` - Confirmation dialog for deletions

### Step 4: CRUD Operations

Create Supabase hooks:
```typescript
// src/hooks/useRoadmapCRUD.ts
export function useRoadmapCRUD() {
  const addProject = async (data) => { ... }
  const updateProject = async (id, data) => { ... }
  const deleteProject = async (id) => { ... }

  const addInitiative = async (pillarId, data) => { ... }
  const updateInitiative = async (id, data) => { ... }
  const deleteInitiative = async (id) => { ... }

  const addTask = async (initiativeId, data) => { ... }
  const updateTask = async (id, data) => { ... }
  const deleteTask = async (id) => { ... }

  const addSubtask = async (taskId, data) => { ... }
  const updateSubtask = async (id, data) => { ... }
  const deleteSubtask = async (id, data) => { ... }

  return { /* all functions */ }
}
```

### Step 5: Real-time Sync
- [ ] Subscribe to changes from Supabase
- [ ] Update UI when other users make changes
- [ ] Handle concurrent editing conflicts

### Step 6: User Experience Improvements
- [ ] Optimistic updates (instant UI feedback)
- [ ] Undo/redo functionality
- [ ] Auto-save every N seconds
- [ ] "Unsaved changes" warning before navigation
- [ ] Toast notifications for actions

## Features to Add

### Must-Have
1. **Add new subtasks** to existing tasks
2. **Edit subtask text** inline
3. **Delete subtasks** with confirmation
4. **Add new tasks** to initiatives
5. **Edit task details** (title, due date, type)
6. **Reorder tasks** via drag-and-drop

### Nice-to-Have
1. **Add new initiatives** to pillars
2. **Add new projects** to roadmap
3. **Duplicate tasks/initiatives** (templates)
4. **Archive completed items** instead of delete
5. **Import/Export** roadmap as JSON
6. **Share roadmap** (read-only link for others)

## UI/UX Design

### Edit Mode Indicator
```
┌─────────────────────────────────────────┐
│ Jenkins Engineering — 2025  [✏️ Edit Mode] │
│                             [👋 Sign Out] │
└─────────────────────────────────────────┘
```

### Inline Editing
- Hover over any text → show edit icon
- Click → text becomes editable input
- Enter to save, Esc to cancel
- Show save indicator when syncing

### Task Card in Edit Mode
```
┌─────────────────────────────────────────┐
│ 📚 Set up test coverage reporting       │
│ ┌────────────────────────────┐  [✏️] [🗑️]│
│ │ Subtask 1                  │          │
│ │ Subtask 2                  │          │
│ │ + Add subtask              │          │
│ └────────────────────────────┘          │
└─────────────────────────────────────────┘
```

## Technical Considerations

### Offline Support
- Keep localStorage as cache
- Queue mutations when offline
- Sync when back online
- Conflict resolution strategy

### Performance
- Use Supabase indexes
- Implement pagination for large datasets
- Lazy load initiatives/tasks (accordion pattern works well)
- Debounce text input updates

### Security
- RLS policies ensure users only edit their own data
- Validate all inputs on client and server
- Prevent SQL injection via parameterized queries
- Rate limiting on Supabase (built-in)

## Next Session Checklist

When you start Phase 2:
1. ✅ Review this plan
2. ✅ Run Supabase SQL schema
3. ✅ Test with seed data
4. ✅ Create first CRUD hook
5. ✅ Build first edit component

## Files to Create

```
src/
  hooks/
    useRoadmapData.ts      # Fetch roadmap from Supabase
    useRoadmapCRUD.ts      # CRUD operations
    useEditMode.ts         # Edit mode state management

  components/
    EditModeToggle.tsx     # Toggle edit mode
    InlineEditor.tsx       # Inline text editing
    ProjectEditor.tsx      # Add/edit projects
    InitiativeEditor.tsx   # Add/edit initiatives
    TaskEditor.tsx         # Add/edit tasks
    SubtaskEditor.tsx      # Add/edit subtasks
    DeleteConfirm.tsx      # Delete confirmation modal

  contexts/
    EditContext.tsx        # Global edit state

supabase/
  editability-schema.sql   # Database schema
  seed-data.sql           # Initial data from projects.ts
```

## Questions to Answer Next Session

1. Do you want multi-user collaboration or single-user editing?
2. Should changes be public or private by default?
3. Do you want version history / audit log?
4. Should there be different permission levels (owner, editor, viewer)?

---

**Status**: Ready to begin Phase 2 implementation
**Estimated Time**: 4-6 hours of development
**Complexity**: Medium (database design + React CRUD + real-time sync)
