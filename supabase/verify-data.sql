-- Quick verification queries to check if migration data exists
-- Run these in Supabase SQL Editor to verify your data

-- 1. Check roadmaps table
SELECT id, name, user_id, created_at
FROM roadmaps
ORDER BY created_at DESC
LIMIT 5;

-- 2. Check projects count and sample
SELECT COUNT(*) as project_count FROM projects;
SELECT p.project_id, p.title, p.roadmap_id
FROM projects p
ORDER BY p.position
LIMIT 5;

-- 3. Check pillars count and sample
SELECT COUNT(*) as pillar_count FROM pillars;
SELECT pi.pillar_id, pi.title, pi.project_id
FROM pillars pi
ORDER BY pi.position
LIMIT 5;

-- 4. Check initiatives count
SELECT COUNT(*) as initiative_count FROM initiatives;
SELECT i.initiative_id, i.title, i.pillar_id
FROM initiatives i
ORDER BY i.position
LIMIT 5;

-- 5. Check tasks count
SELECT COUNT(*) as task_count FROM tasks;

-- 6. Check subtasks count
SELECT COUNT(*) as subtask_count FROM subtasks;

-- 7. Full hierarchy check for one project
SELECT
  p.project_id,
  p.title as project_title,
  COUNT(DISTINCT pi.id) as pillar_count,
  COUNT(DISTINCT i.id) as initiative_count,
  COUNT(DISTINCT t.id) as task_count,
  COUNT(DISTINCT s.id) as subtask_count
FROM projects p
LEFT JOIN pillars pi ON pi.project_id = p.id
LEFT JOIN initiatives i ON i.pillar_id = pi.id
LEFT JOIN tasks t ON t.initiative_id = i.id
LEFT JOIN subtasks s ON s.task_id = t.id
WHERE p.project_id = 'jenkins'
GROUP BY p.project_id, p.title;
