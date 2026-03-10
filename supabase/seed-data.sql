-- ============================================
-- Seed Data Migration from projects.ts
-- Generated: 2026-03-10T14:53:02.790Z
-- ============================================

-- This script assumes you have a user account created.
-- IMPORTANT: Replace ALL instances of YOUR_USER_ID_HERE with your actual auth.users UUID

-- Get your user ID by running: SELECT id FROM auth.users WHERE email = 'your-email@example.com';


-- Start transaction
BEGIN;

-- Insert Roadmap
INSERT INTO roadmaps (id, user_id, name, created_at, updated_at)
VALUES ('3e50f1a9-3e50-43e5-a3e5-3e50f1a90000', '4f4046d6-d091-4219-b38c-d6c3a64df73b', 'Jenkins Engineering Roadmap - 2026', NOW(), NOW());

-- ============================================
-- Project: Testing & Testability Roadmap
-- ============================================

-- Insert Project: Testing & Testability Roadmap
INSERT INTO projects (id, roadmap_id, project_id, title, subtitle, color, icon, wiki_url, position, created_at, updated_at)
VALUES (
  '54c8cdf0-54c8-454c-a54c-54c8cdf00000',
  '3e50f1a9-3e50-43e5-a3e5-3e50f1a90000',
  'testing',
  'Testing & Testability Roadmap',
  'Pipeline testing foundations and path to unit testability',
  '#00C2A8',
  NULL,
  NULL,
  0,
  NOW(),
  NOW()
);

-- Insert Pillar: Initial Testing
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '54d3e887-54d3-454d-a54d-54d3e8870000',
  '54c8cdf0-54c8-454c-a54c-54c8cdf00000',
  'initial-testing',
  'Initial Testing',
  'Quick wins & visible progress',
  '⚡',
  '#00C2A8',
  0,
  NOW(),
  NOW()
);

-- Insert Initiative: Gradle Verification
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '7084d61f-7084-4708-a708-7084d61f0000',
  '54d3e887-54d3-454d-a54d-54d3e8870000',
  'gradle-verification',
  'Gradle Verification',
  'Develop and implement Gradle check testing locally to establish a baseline validation layer for all pipeline jobs.',
  'Pipeline / DevOps Engineer',
  'Apr 30, 2026',
  ARRAY['Q1'],
  '["`gradle check` runs end-to-end locally with zero setup ambiguity","All critical failures are resolved or tracked in backlog","Gradle wrapper committed to all repos","Documentation published to team wiki"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Gradle Fundamentals
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '7f5c401a-7f5c-47f5-a7f5-7f5c401a0000',
  '7084d61f-7084-4708-a708-7084d61f0000',
  'gv-learn',
  'Learning: Gradle Fundamentals',
  'learning',
  'Feb 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05e1cee3-05e1-405e-a05e-05e1cee30000',
  '7f5c401a-7f5c-47f5-a7f5-7f5c401a0000',
  'gv-l1',
  'Read the official Gradle Getting Started guide (docs.gradle.org)',
  'Feb 7',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05e1cee4-05e1-405e-a05e-05e1cee40000',
  '7f5c401a-7f5c-47f5-a7f5-7f5c401a0000',
  'gv-l2',
  'Watch: ''Gradle for Java Developers'' intro video (Gradle YouTube channel)',
  'Feb 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05e1cee5-05e1-405e-a05e-05e1cee50000',
  '7f5c401a-7f5c-47f5-a7f5-7f5c401a0000',
  'gv-l3',
  'Learn what `gradle check` does vs `gradle build` — read Gradle Lifecycle docs',
  'Feb 14',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05e1cee6-05e1-405e-a05e-05e1cee60000',
  '7f5c401a-7f5c-47f5-a7f5-7f5c401a0000',
  'gv-l4',
  'Read about Gradle Wrapper (gradlew) and why it locks version consistency',
  'Feb 14',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05e1cee7-05e1-405e-a05e-05e1cee70000',
  '7f5c401a-7f5c-47f5-a7f5-7f5c401a0000',
  'gv-l5',
  'Read intro to Groovy/Kotlin DSL in Gradle build scripts',
  'Feb 14',
  4,
  NOW(),
  NOW()
);

-- Insert Task: Audit existing Gradle build scripts
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05e1cfdb-05e1-405e-a05e-05e1cfdb0000',
  '7084d61f-7084-4708-a708-7084d61f0000',
  'gv-t1',
  'Audit existing Gradle build scripts',
  'task',
  'Feb 28, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d41a-49a7-449a-a49a-49a7d41a0000',
  '05e1cfdb-05e1-405e-a05e-05e1cfdb0000',
  'gv-t1a',
  'List all pipeline job repos and locate their build.gradle files',
  'Feb 21',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d419-49a7-449a-a49a-49a7d4190000',
  '05e1cfdb-05e1-405e-a05e-05e1cfdb0000',
  'gv-t1b',
  'Document what tasks each build script currently defines',
  'Feb 21',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d418-49a7-449a-a49a-49a7d4180000',
  '05e1cfdb-05e1-405e-a05e-05e1cfdb0000',
  'gv-t1c',
  'Note which repos are missing a Gradle wrapper (gradlew)',
  'Feb 28',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Configure `gradle check` task suite locally
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05e1cfdc-05e1-405e-a05e-05e1cfdc0000',
  '7084d61f-7084-4708-a708-7084d61f0000',
  'gv-t2',
  'Configure `gradle check` task suite locally',
  'task',
  'Mar 21, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3fb-49a7-449a-a49a-49a7d3fb0000',
  '05e1cfdc-05e1-405e-a05e-05e1cfdc0000',
  'gv-t2a',
  'Add or verify checkstyle plugin is configured in each build.gradle',
  'Mar 7',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3fa-49a7-449a-a49a-49a7d3fa0000',
  '05e1cfdc-05e1-405e-a05e-05e1cfdc0000',
  'gv-t2b',
  'Add static analysis tool (e.g., SpotBugs or CodeNarc for Groovy)',
  'Mar 14',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3f9-49a7-449a-a49a-49a7d3f90000',
  '05e1cfdc-05e1-405e-a05e-05e1cfdc0000',
  'gv-t2c',
  'Run `gradle check` locally and capture full output log',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3f8-49a7-449a-a49a-49a7d3f80000',
  '05e1cfdc-05e1-405e-a05e-05e1cfdc0000',
  'gv-t2d',
  'Triage failures: categorize as ''fix now'', ''fix later'', or ''false positive''',
  'Mar 21',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Integrate Gradle Wrapper and document setup
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05e1cfdd-05e1-405e-a05e-05e1cfdd0000',
  '7084d61f-7084-4708-a708-7084d61f0000',
  'gv-t3',
  'Integrate Gradle Wrapper and document setup',
  'task',
  'Apr 11, 2026',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3dc-49a7-449a-a49a-49a7d3dc0000',
  '05e1cfdd-05e1-405e-a05e-05e1cfdd0000',
  'gv-t3a',
  'Run `gradle wrapper` to generate gradlew for any repos missing it',
  'Mar 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3db-49a7-449a-a49a-49a7d3db0000',
  '05e1cfdd-05e1-405e-a05e-05e1cfdd0000',
  'gv-t3b',
  'Commit gradlew and gradle/wrapper/* files to each repo',
  'Apr 4',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3da-49a7-449a-a49a-49a7d3da0000',
  '05e1cfdd-05e1-405e-a05e-05e1cfdd0000',
  'gv-t3c',
  'Write setup documentation: required JDK version, how to run checks, how to add new rules',
  'Apr 11',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Resolve critical failures and publish findings
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05e1cfde-05e1-405e-a05e-05e1cfde0000',
  '7084d61f-7084-4708-a708-7084d61f0000',
  'gv-t4',
  'Resolve critical failures and publish findings',
  'task',
  'Apr 30, 2026',
  4,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3bd-49a7-449a-a49a-49a7d3bd0000',
  '05e1cfde-05e1-405e-a05e-05e1cfde0000',
  'gv-t4a',
  'Fix all ''fix now'' failures identified in triage',
  'Apr 18',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3bc-49a7-449a-a49a-49a7d3bc0000',
  '05e1cfde-05e1-405e-a05e-05e1cfde0000',
  'gv-t4b',
  'Create backlog tickets for ''fix later'' items',
  'Apr 25',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '49a7d3bb-49a7-449a-a49a-49a7d3bb0000',
  '05e1cfde-05e1-405e-a05e-05e1cfde0000',
  'gv-t4c',
  'Publish documentation to team wiki',
  'Apr 30',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Check-in Testing
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '59bd9790-59bd-459b-a59b-59bd97900000',
  '54d3e887-54d3-454d-a54d-54d3e8870000',
  'checkin-testing',
  'Check-in Testing',
  'Automate Gradle checks and valid pipeline step verification on every code check-in to enforce code integrity before merging.',
  'DevOps / CI Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Every PR triggers CI automatically within 2 minutes","Merges are blocked if Gradle check fails","Pipeline step validation catches missing or malformed stages","Runbook published and findable by the team"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: CI/CD Pipeline Concepts & Jenkins
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '775295e8-7752-4775-a775-775295e80000',
  '59bd9790-59bd-459b-a59b-59bd97900000',
  'ct-learn',
  'Learning: CI/CD Pipeline Concepts & Jenkins',
  'learning',
  'Mar 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a88821-05a8-405a-a05a-05a888210000',
  '775295e8-7752-4775-a775-775295e80000',
  'ct-l1',
  'Read: ''What is CI/CD?'' — Atlassian CI/CD overview article',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a88822-05a8-405a-a05a-05a888220000',
  '775295e8-7752-4775-a775-775295e80000',
  'ct-l2',
  'Study Jenkins Pipeline documentation: Declarative vs Scripted pipelines',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a88823-05a8-405a-a05a-05a888230000',
  '775295e8-7752-4775-a775-775295e80000',
  'ct-l3',
  'Learn about Webhooks: how GitHub/GitLab triggers Jenkins on push/PR',
  'Mar 7',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a88824-05a8-405a-a05a-05a888240000',
  '775295e8-7752-4775-a775-775295e80000',
  'ct-l4',
  'Read about branch protection rules in GitHub/GitLab docs',
  'Mar 14',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a88825-05a8-405a-a05a-05a888250000',
  '775295e8-7752-4775-a775-775295e80000',
  'ct-l5',
  'Study Jenkins ''when'' directives and stage conditions in Jenkinsfile',
  'Mar 14',
  4,
  NOW(),
  NOW()
);

-- Insert Task: Define pipeline gates and merge eligibility rules
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05a88919-05a8-405a-a05a-05a889190000',
  '59bd9790-59bd-459b-a59b-59bd97900000',
  'ct-t1',
  'Define pipeline gates and merge eligibility rules',
  'task',
  'Apr 11, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976598-5097-4509-a509-509765980000',
  '05a88919-05a8-405a-a05a-05a889190000',
  'ct-t1a',
  'List the minimum required stages a pipeline job must pass before merge',
  'Mar 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976597-5097-4509-a509-509765970000',
  '05a88919-05a8-405a-a05a-05a889190000',
  'ct-t1b',
  'Identify which checks are blocking (fail = no merge) vs advisory',
  'Apr 4',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976596-5097-4509-a509-509765960000',
  '05a88919-05a8-405a-a05a-05a889190000',
  'ct-t1c',
  'Document the gate rules in a shared decision doc for team review',
  'Apr 11',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Configure Jenkins webhook triggers on check-in
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05a8891a-05a8-405a-a05a-05a8891a0000',
  '59bd9790-59bd-459b-a59b-59bd97900000',
  'ct-t2',
  'Configure Jenkins webhook triggers on check-in',
  'task',
  'May 30, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976579-5097-4509-a509-509765790000',
  '05a8891a-05a8-405a-a05a-05a8891a0000',
  'ct-t2a',
  'Set up or verify webhook from source control to Jenkins',
  'May 9',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976578-5097-4509-a509-509765780000',
  '05a8891a-05a8-405a-a05a-05a8891a0000',
  'ct-t2b',
  'Configure Jenkins job to trigger on PR open and push-to-PR events',
  'May 16',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976577-5097-4509-a509-509765770000',
  '05a8891a-05a8-405a-a05a-05a8891a0000',
  'ct-t2c',
  'Test trigger end-to-end: open a test PR and confirm Jenkins job fires',
  'May 23',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976576-5097-4509-a509-509765760000',
  '05a8891a-05a8-405a-a05a-05a8891a0000',
  'ct-t2d',
  'Document the webhook configuration steps for future reference',
  'May 30',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Add Gradle check as a mandatory pre-merge CI stage
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05a8891b-05a8-405a-a05a-05a8891b0000',
  '59bd9790-59bd-459b-a59b-59bd97900000',
  'ct-t3',
  'Add Gradle check as a mandatory pre-merge CI stage',
  'task',
  'Jun 27, 2026',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '5097655a-5097-4509-a509-5097655a0000',
  '05a8891b-05a8-405a-a05a-05a8891b0000',
  'ct-t3a',
  'Add a `gradleCheck` stage to the Jenkinsfile pipeline definition',
  'Jun 6',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976559-5097-4509-a509-509765590000',
  '05a8891b-05a8-405a-a05a-05a8891b0000',
  'ct-t3b',
  'Confirm stage fails the pipeline (exit code != 0) on Gradle errors',
  'Jun 13',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976558-5097-4509-a509-509765580000',
  '05a8891b-05a8-405a-a05a-05a8891b0000',
  'ct-t3c',
  'Verify pipeline status is reported back to the PR as a required check',
  'Jun 20',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976557-5097-4509-a509-509765570000',
  '05a8891b-05a8-405a-a05a-05a8891b0000',
  'ct-t3d',
  'Enable branch protection rule to block merge if check fails',
  'Jun 27',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Write pipeline step validation and create runbook
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05a8891c-05a8-405a-a05a-05a8891c0000',
  '59bd9790-59bd-459b-a59b-59bd97900000',
  'ct-t4',
  'Write pipeline step validation and create runbook',
  'task',
  'Jul 31, 2026',
  4,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '5097653b-5097-4509-a509-5097653b0000',
  '05a8891c-05a8-405a-a05a-05a8891c0000',
  'ct-t4a',
  'Write a validation script that checks Jenkinsfile for required stage names',
  'Jul 11',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '5097653a-5097-4509-a509-5097653a0000',
  '05a8891c-05a8-405a-a05a-05a8891c0000',
  'ct-t4b',
  'Add validation as an early pipeline stage (fail fast on malformed jobs)',
  'Jul 18',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976539-5097-4509-a509-509765390000',
  '05a8891c-05a8-405a-a05a-05a8891c0000',
  'ct-t4c',
  'Write runbook: common CI gate failure causes and how to resolve them',
  'Jul 25',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50976538-5097-4509-a509-509765380000',
  '05a8891c-05a8-405a-a05a-05a8891c0000',
  'ct-t4d',
  'Final review: run a full PR flow and confirm all gates work end-to-end',
  'Jul 31',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Style Testing
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '7d3af1f4-7d3a-47d3-a7d3-7d3af1f40000',
  '54d3e887-54d3-454d-a54d-54d3e8870000',
  'style-testing',
  'Style Testing',
  'Integrate best-practice style warnings into the pipeline to surface code quality recommendations without hard-blocking merges.',
  'Pipeline Engineer',
  'Oct 31, 2026',
  ARRAY['Q2', 'Q3'],
  '["Linter runs on every PR and posts warnings as annotations","No merges are hard-blocked by style warnings in initial rollout","Ruleset is documented and versioned in source control","Style guide published to team wiki"]'::jsonb,
  2,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Linting, Code Style & Static Analysis
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '0a9a9c28-0a9a-40a9-a0a9-0a9a9c280000',
  '7d3af1f4-7d3a-47d3-a7d3-7d3af1f40000',
  'st-learn',
  'Learning: Linting, Code Style & Static Analysis',
  'learning',
  'May 30, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '068a0031-068a-4068-a068-068a00310000',
  '0a9a9c28-0a9a-40a9-a0a9-0a9a9c280000',
  'st-l1',
  'Read: What is a linter and why does code style matter? (ESLint docs intro, CodeNarc docs)',
  'May 16',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '068a0032-068a-4068-a068-068a00320000',
  '0a9a9c28-0a9a-40a9-a0a9-0a9a9c280000',
  'st-l2',
  'Study CodeNarc: the Groovy/pipeline linter — read its rule catalog overview',
  'May 23',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '068a0033-068a-4068-a068-068a00330000',
  '0a9a9c28-0a9a-40a9-a0a9-0a9a9c280000',
  'st-l3',
  'Understand the difference between errors (blocking) vs warnings (advisory) in CI',
  'May 23',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '068a0034-068a-4068-a068-068a00340000',
  '0a9a9c28-0a9a-40a9-a0a9-0a9a9c280000',
  'st-l4',
  'Read about how to configure a CodeNarc ruleset file (.groovy or XML)',
  'May 30',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '068a0035-068a-4068-a068-068a00350000',
  '0a9a9c28-0a9a-40a9-a0a9-0a9a9c280000',
  'st-l5',
  'Study how Jenkins can post lint annotations on PRs (Warnings Next Generation plugin)',
  'May 30',
  4,
  NOW(),
  NOW()
);

-- Insert Task: Select linter and define initial ruleset
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '068a0129-068a-4068-a068-068a01290000',
  '7d3af1f4-7d3a-47d3-a7d3-7d3af1f40000',
  'st-t1',
  'Select linter and define initial ruleset',
  'task',
  'Jun 27, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549dba8-3549-4354-a354-3549dba80000',
  '068a0129-068a-4068-a068-068a01290000',
  'st-t1a',
  'Evaluate CodeNarc vs alternatives; document decision rationale',
  'Jun 6',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549dba7-3549-4354-a354-3549dba70000',
  '068a0129-068a-4068-a068-068a01290000',
  'st-t1b',
  'Run CodeNarc on existing pipeline code to see baseline violation count',
  'Jun 13',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549dba6-3549-4354-a354-3549dba60000',
  '068a0129-068a-4068-a068-068a01290000',
  'st-t1c',
  'Select an initial ruleset of 5–10 rules that are high-value and low false-positive',
  'Jun 20',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549dba5-3549-4354-a354-3549dba50000',
  '068a0129-068a-4068-a068-068a01290000',
  'st-t1d',
  'Document selected rules with rationale in team style guide',
  'Jun 27',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Integrate linter as non-blocking CI stage
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '068a012a-068a-4068-a068-068a012a0000',
  '7d3af1f4-7d3a-47d3-a7d3-7d3af1f40000',
  'st-t2',
  'Integrate linter as non-blocking CI stage',
  'task',
  'Aug 29, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db89-3549-4354-a354-3549db890000',
  '068a012a-068a-4068-a068-068a012a0000',
  'st-t2a',
  'Add CodeNarc as a pipeline stage with `continueOnFailure: true`',
  'Aug 8',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db88-3549-4354-a354-3549db880000',
  '068a012a-068a-4068-a068-068a012a0000',
  'st-t2b',
  'Configure Jenkins Warnings Next Generation plugin to parse CodeNarc output',
  'Aug 15',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db87-3549-4354-a354-3549db870000',
  '068a012a-068a-4068-a068-068a012a0000',
  'st-t2c',
  'Ensure warnings appear as PR annotations, not pipeline failures',
  'Aug 22',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db86-3549-4354-a354-3549db860000',
  '068a012a-068a-4068-a068-068a012a0000',
  'st-t2d',
  'Test with a deliberately bad Groovy file to confirm warnings surface correctly',
  'Aug 29',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Publish style guide and establish expansion cadence
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '068a012b-068a-4068-a068-068a012b0000',
  '7d3af1f4-7d3a-47d3-a7d3-7d3af1f40000',
  'st-t3',
  'Publish style guide and establish expansion cadence',
  'task',
  'Oct 31, 2026',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db6a-3549-4354-a354-3549db6a0000',
  '068a012b-068a-4068-a068-068a012b0000',
  'st-t3a',
  'Write and publish the pipeline style guide to team wiki',
  'Sep 19',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db69-3549-4354-a354-3549db690000',
  '068a012b-068a-4068-a068-068a012b0000',
  'st-t3b',
  'Version the CodeNarc ruleset file in source control',
  'Sep 26',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db68-3549-4354-a354-3549db680000',
  '068a012b-068a-4068-a068-068a012b0000',
  'st-t3c',
  'Tune false-positive rules based on first 4 weeks of warnings data',
  'Oct 17',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3549db67-3549-4354-a354-3549db670000',
  '068a012b-068a-4068-a068-068a012b0000',
  'st-t3d',
  'Document the process for proposing and adding new rules',
  'Oct 31',
  3,
  NOW(),
  NOW()
);


-- Insert Pillar: Unit Testability Plan
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '03554d8f-0355-4035-a035-03554d8f0000',
  '54c8cdf0-54c8-454c-a54c-54c8cdf00000',
  'unit-testability',
  'Unit Testability Plan',
  'Standardization, modularity & future-proof testing',
  '🏗️',
  '#6C63FF',
  1,
  NOW(),
  NOW()
);

-- Insert Initiative: Code Patterns List
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '774db6c3-774d-4774-a774-774db6c30000',
  '03554d8f-0355-4035-a035-03554d8f0000',
  'code-patterns',
  'Code Patterns List',
  'Identify recurring patterns and functionality across pipeline jobs. Flag anti-patterns and create stories for remediation.',
  'Pipeline Architect / Tech Lead',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["All pipeline jobs catalogued with category tags","Pattern inventory lists at least 10 good and 10 bad patterns with examples","Stories created in Jira and linked to epic","Team review meeting held with findings approved"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Design Patterns & Pipeline Architecture
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '5c46571c-5c46-45c4-a5c4-5c46571c0000',
  '774db6c3-774d-4774-a774-774db6c30000',
  'cp-learn',
  'Learning: Design Patterns & Pipeline Architecture',
  'learning',
  'Feb 28, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a6b6a5-05a6-405a-a05a-05a6b6a50000',
  '5c46571c-5c46-45c4-a5c4-5c46571c0000',
  'cp-l1',
  'Read: ''What are software design patterns?'' (Refactoring.Guru intro)',
  'Feb 7',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a6b6a6-05a6-405a-a05a-05a6b6a60000',
  '5c46571c-5c46-45c4-a5c4-5c46571c0000',
  'cp-l2',
  'Study common pipeline anti-patterns: hardcoding, copy-paste stages, god scripts',
  'Feb 14',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a6b6a7-05a6-405a-a05a-05a6b6a70000',
  '5c46571c-5c46-45c4-a5c4-5c46571c0000',
  'cp-l3',
  'Read Jenkins Shared Library documentation — understand how code reuse works',
  'Feb 21',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05a6b6a8-05a6-405a-a05a-05a6b6a80000',
  '5c46571c-5c46-45c4-a5c4-5c46571c0000',
  'cp-l4',
  'Study what makes code ''testable'' — read a beginner-friendly article on unit testing principles',
  'Feb 28',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Catalog all pipeline jobs and shared libraries
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05a6b79d-05a6-405a-a05a-05a6b79d0000',
  '774db6c3-774d-4774-a774-774db6c30000',
  'cp-t1',
  'Catalog all pipeline jobs and shared libraries',
  'task',
  'Mar 21, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc39c-50cf-450c-a50c-50cfc39c0000',
  '05a6b79d-05a6-405a-a05a-05a6b79d0000',
  'cp-t1a',
  'List all Jenkins jobs with their repo locations and Jenkinsfile paths',
  'Mar 7',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc39b-50cf-450c-a50c-50cfc39b0000',
  '05a6b79d-05a6-405a-a05a-05a6b79d0000',
  'cp-t1b',
  'Tag each job by functional category: build, deploy, test, notify, release, utility',
  'Mar 14',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc39a-50cf-450c-a50c-50cfc39a0000',
  '05a6b79d-05a6-405a-a05a-05a6b79d0000',
  'cp-t1c',
  'Record approximate size (lines of code) and last-modified date for each',
  'Mar 21',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Identify recurring good patterns
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05a6b79e-05a6-405a-a05a-05a6b79e0000',
  '774db6c3-774d-4774-a774-774db6c30000',
  'cp-t2',
  'Identify recurring good patterns',
  'task',
  'Apr 30, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc37d-50cf-450c-a50c-50cfc37d0000',
  '05a6b79e-05a6-405a-a05a-05a6b79e0000',
  'cp-t2a',
  'Review all jobs and note functions or code blocks that appear in 3+ jobs',
  'Apr 4',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc37c-50cf-450c-a50c-50cfc37c0000',
  '05a6b79e-05a6-405a-a05a-05a6b79e0000',
  'cp-t2b',
  'Document each pattern: what it does, where it appears, sample code snippet',
  'Apr 18',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc37b-50cf-450c-a50c-50cfc37b0000',
  '05a6b79e-05a6-405a-a05a-05a6b79e0000',
  'cp-t2c',
  'Rank patterns by reuse frequency and standardization potential',
  'Apr 30',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Identify anti-patterns and write remediation stories
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05a6b79f-05a6-405a-a05a-05a6b79f0000',
  '774db6c3-774d-4774-a774-774db6c30000',
  'cp-t3',
  'Identify anti-patterns and write remediation stories',
  'task',
  'Jul 31, 2026',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc35e-50cf-450c-a50c-50cfc35e0000',
  '05a6b79f-05a6-405a-a05a-05a6b79f0000',
  'cp-t3a',
  'Flag hardcoded credentials, environment-specific values, and magic strings',
  'May 16',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc35d-50cf-450c-a50c-50cfc35d0000',
  '05a6b79f-05a6-405a-a05a-05a6b79f0000',
  'cp-t3b',
  'Flag tightly-coupled stages that can''t be called independently',
  'May 30',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc35c-50cf-450c-a50c-50cfc35c0000',
  '05a6b79f-05a6-405a-a05a-05a6b79f0000',
  'cp-t3c',
  'Flag functions with side effects that make them untestable',
  'Jun 13',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc35b-50cf-450c-a50c-50cfc35b0000',
  '05a6b79f-05a6-405a-a05a-05a6b79f0000',
  'cp-t3d',
  'Write a Jira story for each anti-pattern, linked to ''Consolidate Pipeline Code'' epic',
  'Jul 11',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50cfc35a-50cf-450c-a50c-50cfc35a0000',
  '05a6b79f-05a6-405a-a05a-05a6b79f0000',
  'cp-t3e',
  'Prioritize stories by impact and present findings in a team review meeting',
  'Jul 31',
  4,
  NOW(),
  NOW()
);

-- Insert Initiative: Fix Proposals
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '3e56f3f7-3e56-43e5-a3e5-3e56f3f70000',
  '03554d8f-0355-4035-a035-03554d8f0000',
  'fix-proposals',
  'Fix Proposals',
  'Design and implement story work toward the ''Consolidate Pipeline Code'' epic. Treat every functional unit as an independent product. Make functions mockable.',
  'Pipeline Engineer',
  'Dec 31, 2026',
  ARRAY['Q2', 'Q3', 'Q4'],
  '["Each refactored unit has a documented input/output contract","Functions can be called in isolation without triggering external side effects","Tech design docs written and approved before implementation","80% of identified anti-patterns have stories written by end of Q3","First wave of mockable functions merged and deployed by end of Q4"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Refactoring, Mockability & Dependency Injection
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '24a2d07f-24a2-424a-a24a-24a2d07f0000',
  '3e56f3f7-3e56-43e5-a3e5-3e56f3f70000',
  'fp-learn',
  'Learning: Refactoring, Mockability & Dependency Injection',
  'learning',
  'Jun 13, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05d0fd28-05d0-405d-a05d-05d0fd280000',
  '24a2d07f-24a2-424a-a24a-24a2d07f0000',
  'fp-l1',
  'Read: ''Refactoring: Improving the Design of Existing Code'' Ch. 1–3 (Fowler) or an equivalent summary article',
  'May 23',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05d0fd29-05d0-405d-a05d-05d0fd290000',
  '24a2d07f-24a2-424a-a24a-24a2d07f0000',
  'fp-l2',
  'Study Dependency Injection concepts — read a beginner-friendly DI explainer article',
  'May 30',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05d0fd2a-05d0-405d-a05d-05d0fd2a0000',
  '24a2d07f-24a2-424a-a24a-24a2d07f0000',
  'fp-l3',
  'Read about mocking in unit tests — what is a mock and why does it help isolation?',
  'Jun 6',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05d0fd2b-05d0-405d-a05d-05d0fd2b0000',
  '24a2d07f-24a2-424a-a24a-24a2d07f0000',
  'fp-l4',
  'Study how to write a function contract: inputs, outputs, and side effects documentation',
  'Jun 13',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Define the 'independent product' contract standard
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05d0fe20-05d0-405d-a05d-05d0fe200000',
  '3e56f3f7-3e56-43e5-a3e5-3e56f3f70000',
  'fp-t1',
  'Define the ''independent product'' contract standard',
  'task',
  'Jul 11, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb139bf-4bb1-44bb-a4bb-4bb139bf0000',
  '05d0fe20-05d0-405d-a05d-05d0fe200000',
  'fp-t1a',
  'Draft a template for documenting a pipeline function: name, inputs, outputs, side effects',
  'Jun 27',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb139be-4bb1-44bb-a4bb-4bb139be0000',
  '05d0fe20-05d0-405d-a05d-05d0fe200000',
  'fp-t1b',
  'Apply the template to 3 existing functions as worked examples',
  'Jul 4',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb139bd-4bb1-44bb-a4bb-4bb139bd0000',
  '05d0fe20-05d0-405d-a05d-05d0fe200000',
  'fp-t1c',
  'Publish the contract template to the team wiki',
  'Jul 11',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Refactor tightly-coupled pipeline stages
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05d0fe21-05d0-405d-a05d-05d0fe210000',
  '3e56f3f7-3e56-43e5-a3e5-3e56f3f70000',
  'fp-t2',
  'Refactor tightly-coupled pipeline stages',
  'task',
  'Sep 26, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb139a0-4bb1-44bb-a4bb-4bb139a00000',
  '05d0fe21-05d0-405d-a05d-05d0fe210000',
  'fp-t2a',
  'Pick the top 3 highest-priority anti-patterns from the backlog to refactor first',
  'Aug 8',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb1399f-4bb1-44bb-a4bb-4bb1399f0000',
  '05d0fe21-05d0-405d-a05d-05d0fe210000',
  'fp-t2b',
  'Write tech design doc for each refactor before coding',
  'Aug 22',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb1399e-4bb1-44bb-a4bb-4bb1399e0000',
  '05d0fe21-05d0-405d-a05d-05d0fe210000',
  'fp-t2c',
  'Break each monolithic stage into small, parameterized functions',
  'Sep 5',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb1399d-4bb1-44bb-a4bb-4bb1399d0000',
  '05d0fe21-05d0-405d-a05d-05d0fe210000',
  'fp-t2d',
  'Verify refactored functions work end-to-end in a test pipeline run',
  'Sep 19',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb1399c-4bb1-44bb-a4bb-4bb1399c0000',
  '05d0fe21-05d0-405d-a05d-05d0fe210000',
  'fp-t2e',
  'Submit PRs with testability checklist review',
  'Sep 26',
  4,
  NOW(),
  NOW()
);

-- Insert Task: Make functions mockable — replace hard dependencies with injectable interfaces
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05d0fe22-05d0-405d-a05d-05d0fe220000',
  '3e56f3f7-3e56-43e5-a3e5-3e56f3f70000',
  'fp-t3',
  'Make functions mockable — replace hard dependencies with injectable interfaces',
  'task',
  'Dec 31, 2026',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb13981-4bb1-44bb-a4bb-4bb139810000',
  '05d0fe22-05d0-405d-a05d-05d0fe220000',
  'fp-t3a',
  'Identify all direct calls to external systems (Jira, AWS, Nexus, etc.) in pipeline functions',
  'Oct 10',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb13980-4bb1-44bb-a4bb-4bb139800000',
  '05d0fe22-05d0-405d-a05d-05d0fe220000',
  'fp-t3b',
  'Refactor each external call behind a parameter or closure so it can be swapped in tests',
  'Oct 31',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb1397f-4bb1-44bb-a4bb-4bb1397f0000',
  '05d0fe22-05d0-405d-a05d-05d0fe220000',
  'fp-t3c',
  'Write stories for any remaining mockability gaps not yet addressed',
  'Nov 14',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb1397e-4bb1-44bb-a4bb-4bb1397e0000',
  '05d0fe22-05d0-405d-a05d-05d0fe220000',
  'fp-t3d',
  'Do a final pass: manually verify each function can be called in isolation',
  'Dec 12',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4bb1397d-4bb1-44bb-a4bb-4bb1397d0000',
  '05d0fe22-05d0-405d-a05d-05d0fe220000',
  'fp-t3e',
  'Document mockable interface patterns in team wiki',
  'Dec 31',
  4,
  NOW(),
  NOW()
);

-- Insert Initiative: Library-ize Common Code
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '2468a2be-2468-4246-a246-2468a2be0000',
  '03554d8f-0355-4035-a035-03554d8f0000',
  'library-ize',
  'Library-ize Common Code',
  'Extract common functions into versioned, dependency-bundled shared libraries that can be independently tested and imported by any pipeline job.',
  'Pipeline Engineer',
  'Dec 31, 2026',
  ARRAY['Q3', 'Q4'],
  '["Common library published to artifact registry at v1.0.0","All dependencies locked and documented","Each exported function has at least one unit test","At least 5 pipeline jobs migrated to use the shared library","Library CI pipeline is green on every commit"]'::jsonb,
  2,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Shared Libraries, Versioning & Package Management
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '44b7b304-44b7-444b-a44b-44b7b3040000',
  '2468a2be-2468-4246-a246-2468a2be0000',
  'lib-learn',
  'Learning: Shared Libraries, Versioning & Package Management',
  'learning',
  'Aug 22, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '41bfb673-41bf-441b-a41b-41bfb6730000',
  '44b7b304-44b7-444b-a44b-44b7b3040000',
  'lib-l1',
  'Read Jenkins Shared Libraries documentation in full (jenkins.io/doc/book/pipeline/shared-libraries)',
  'Aug 8',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '41bfb672-41bf-441b-a41b-41bfb6720000',
  '44b7b304-44b7-444b-a44b-44b7b3040000',
  'lib-l2',
  'Study SemVer (Semantic Versioning): read semver.org to understand MAJOR.MINOR.PATCH',
  'Aug 8',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '41bfb671-41bf-441b-a41b-41bfb6710000',
  '44b7b304-44b7-444b-a44b-44b7b3040000',
  'lib-l3',
  'Read about artifact registries: what is Artifactory/Nexus and how do you publish to one?',
  'Aug 15',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '41bfb670-41bf-441b-a41b-41bfb6700000',
  '44b7b304-44b7-444b-a44b-44b7b3040000',
  'lib-l4',
  'Study how to write unit tests for Groovy/pipeline code using the Pipeline Unit Testing Framework',
  'Aug 22',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Select packaging strategy and scaffold the library
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '41bfb57b-41bf-441b-a41b-41bfb57b0000',
  '2468a2be-2468-4246-a246-2468a2be0000',
  'lib-t1',
  'Select packaging strategy and scaffold the library',
  'task',
  'Sep 19, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c9067c-09c9-409c-a09c-09c9067c0000',
  '41bfb57b-41bf-441b-a41b-41bfb57b0000',
  'lib-t1a',
  'Evaluate Jenkins Shared Library vs standalone JAR vs internal registry — document decision',
  'Sep 5',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c9067d-09c9-409c-a09c-09c9067d0000',
  '41bfb57b-41bf-441b-a41b-41bfb57b0000',
  'lib-t1b',
  'Create the shared library repo with the standard Jenkins `vars/` and `src/` structure',
  'Sep 12',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c9067e-09c9-409c-a09c-09c9067e0000',
  '41bfb57b-41bf-441b-a41b-41bfb57b0000',
  'lib-t1c',
  'Set up a basic CI pipeline for the library itself (build + test)',
  'Sep 19',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Extract and bundle the top common functions
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '41bfb57a-41bf-441b-a41b-41bfb57a0000',
  '2468a2be-2468-4246-a246-2468a2be0000',
  'lib-t2',
  'Extract and bundle the top common functions',
  'task',
  'Nov 14, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c9069b-09c9-409c-a09c-09c9069b0000',
  '41bfb57a-41bf-441b-a41b-41bfb57a0000',
  'lib-t2a',
  'Pick the top 10 most-reused functions from the patterns catalog',
  'Oct 3',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c9069c-09c9-409c-a09c-09c9069c0000',
  '41bfb57a-41bf-441b-a41b-41bfb57a0000',
  'lib-t2b',
  'Move each function into the shared library with its full input/output contract documented',
  'Oct 17',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c9069d-09c9-409c-a09c-09c9069d0000',
  '41bfb57a-41bf-441b-a41b-41bfb57a0000',
  'lib-t2c',
  'Lock and document all dependencies (no floating versions)',
  'Oct 31',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c9069e-09c9-409c-a09c-09c9069e0000',
  '41bfb57a-41bf-441b-a41b-41bfb57a0000',
  'lib-t2d',
  'Publish v1.0.0 to the internal artifact registry',
  'Nov 14',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Write unit tests and migrate existing jobs
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '41bfb579-41bf-441b-a41b-41bfb5790000',
  '2468a2be-2468-4246-a246-2468a2be0000',
  'lib-t3',
  'Write unit tests and migrate existing jobs',
  'task',
  'Dec 31, 2026',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c906ba-09c9-409c-a09c-09c906ba0000',
  '41bfb579-41bf-441b-a41b-41bfb5790000',
  'lib-t3a',
  'Write at least one unit test per exported library function using Pipeline Unit Testing Framework',
  'Nov 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c906bb-09c9-409c-a09c-09c906bb0000',
  '41bfb579-41bf-441b-a41b-41bfb5790000',
  'lib-t3b',
  'Migrate at least 5 existing pipeline jobs to import from the shared library',
  'Dec 12',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c906bc-09c9-409c-a09c-09c906bc0000',
  '41bfb579-41bf-441b-a41b-41bfb5790000',
  'lib-t3c',
  'Confirm library CI pipeline passes after every migration',
  'Dec 19',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '09c906bd-09c9-409c-a09c-09c906bd0000',
  '41bfb579-41bf-441b-a41b-41bfb5790000',
  'lib-t3d',
  'Write migration guide: how to update a pipeline job to use the shared library',
  'Dec 31',
  3,
  NOW(),
  NOW()
);



-- ============================================
-- Project: Jenkins Improvement for Customers
-- ============================================

-- Insert Project: Jenkins Improvement for Customers
INSERT INTO projects (id, roadmap_id, project_id, title, subtitle, color, icon, wiki_url, position, created_at, updated_at)
VALUES (
  '6611ab4a-6611-4661-a661-6611ab4a0000',
  '3e50f1a9-3e50-43e5-a3e5-3e50f1a90000',
  'jenkins',
  'Jenkins Improvement for Customers',
  'Improve satisfaction, confidence, discoverability & look and feel',
  '#E85D26',
  NULL,
  'https://wizardsofthecoast.atlassian.net/wiki/spaces/~bodewec/pages/1583382652',
  1,
  NOW(),
  NOW()
);

-- Insert Pillar: Q1–Q2: Write Stories, Spikes & Epics
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '504deffc-504d-4504-a504-504deffc0000',
  '6611ab4a-6611-4661-a661-6611ab4a0000',
  'story-writing',
  'Q1–Q2: Write Stories, Spikes & Epics',
  'Discover, scope, and document all improvement work',
  '📝',
  '#E85D26',
  0,
  NOW(),
  NOW()
);

-- Insert Initiative: Rerun / Reuse
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '3d61dbdf-3d61-43d6-a3d6-3d61dbdf0000',
  '504deffc-504d-4504-a504-504deffc0000',
  'rerun-reuse',
  'Rerun / Reuse',
  'Redesign pipeline flow to allow partial reruns and artifact reuse so successful stages are not recomputed unnecessarily.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Spike completed and approach documented","Epic created with child stories in Jira","All stories have acceptance criteria, estimates, and are board-ready by end of Q2"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins Pipeline Restart & Stash/Unstash
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '23b7c077-23b7-423b-a23b-23b7c0770000',
  '3d61dbdf-3d61-43d6-a3d6-3d61dbdf0000',
  'rr-learn',
  'Learning: Jenkins Pipeline Restart & Stash/Unstash',
  'learning',
  'Feb 28, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067afff2-067a-4067-a067-067afff20000',
  '23b7c077-23b7-423b-a23b-23b7c0770000',
  'rr-l1',
  'Read Jenkins docs on ''Restart from Stage'' feature — understand what is and isn''t supported',
  'Feb 14',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067afff3-067a-4067-a067-067afff30000',
  '23b7c077-23b7-423b-a23b-23b7c0770000',
  'rr-l2',
  'Study Jenkins `stash` and `unstash` — how artifacts are passed between stages/runs',
  'Feb 21',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067afff4-067a-4067-a067-067afff40000',
  '23b7c077-23b7-423b-a23b-23b7c0770000',
  'rr-l3',
  'Research external caching strategies: Artifactory build caching, S3 artifact storage',
  'Feb 28',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Spike: Evaluate partial rerun strategies
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '067b00ea-067b-4067-a067-067b00ea0000',
  '3d61dbdf-3d61-43d6-a3d6-3d61dbdf0000',
  'rr-t1',
  'Spike: Evaluate partial rerun strategies',
  'task',
  'Apr 30, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '371ae349-371a-4371-a371-371ae3490000',
  '067b00ea-067b-4067-a067-067b00ea0000',
  'rr-t1a',
  'Identify the top 3 pipeline jobs where stage recomputation wastes most time',
  'Mar 21',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '371ae348-371a-4371-a371-371ae3480000',
  '067b00ea-067b-4067-a067-067b00ea0000',
  'rr-t1b',
  'Prototype a `stash`/`unstash` artifact reuse approach in a test pipeline',
  'Apr 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '371ae347-371a-4371-a371-371ae3470000',
  '067b00ea-067b-4067-a067-067b00ea0000',
  'rr-t1c',
  'Document findings: effort, risk, and customer time savings estimate',
  'Apr 25',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '371ae346-371a-4371-a371-371ae3460000',
  '067b00ea-067b-4067-a067-067b00ea0000',
  'rr-t1d',
  'Write epic and child stories for approved approach in Jira',
  'Apr 30',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Write fully-detailed stories for board
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '067b00eb-067b-4067-a067-067b00eb0000',
  '3d61dbdf-3d61-43d6-a3d6-3d61dbdf0000',
  'rr-t2',
  'Write fully-detailed stories for board',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '371ae32a-371a-4371-a371-371ae32a0000',
  '067b00eb-067b-4067-a067-067b00eb0000',
  'rr-t2a',
  'Write acceptance criteria for each story covering input, output, and edge cases',
  'Jun 27',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '371ae329-371a-4371-a371-371ae3290000',
  '067b00eb-067b-4067-a067-067b00eb0000',
  'rr-t2b',
  'Estimate story points with t-shirt sizing',
  'Jul 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '371ae328-371a-4371-a371-371ae3280000',
  '067b00eb-067b-4067-a067-067b00eb0000',
  'rr-t2c',
  'Get stories reviewed and approved; move to ''Ready'' column on board',
  'Jul 31',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Maintenance: A/B Deployment
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '12eef313-12ee-412e-a12e-12eef3130000',
  '504deffc-504d-4504-a504-504deffc0000',
  'maintenance',
  'Maintenance: A/B Deployment',
  'Research and spike Jenkins maintenance and A/B deployment possibilities to improve reliability and reduce downtime during upgrades.',
  'DevOps / Infrastructure Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Spike completed with both A/B options evaluated","Preferred approach approved by stakeholders","Stories written, estimated, and board-ready by end of Q2"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins HA, Blue/Green & Maintenance Windows
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '4cbafc2e-4cba-44cb-a4cb-4cbafc2e0000',
  '12eef313-12ee-412e-a12e-12eef3130000',
  'maint-learn',
  'Learning: Jenkins HA, Blue/Green & Maintenance Windows',
  'learning',
  'Mar 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '00730d89-0073-4007-a007-00730d890000',
  '4cbafc2e-4cba-44cb-a4cb-4cbafc2e0000',
  'maint-l1',
  'Read Jenkins documentation on High Availability and clustering options',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '00730d88-0073-4007-a007-00730d880000',
  '4cbafc2e-4cba-44cb-a4cb-4cbafc2e0000',
  'maint-l2',
  'Study Blue/Green deployment concepts — read a clear explainer article on traffic switching',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '00730d87-0073-4007-a007-00730d870000',
  '4cbafc2e-4cba-44cb-a4cb-4cbafc2e0000',
  'maint-l3',
  'Research Jenkins Configuration as Code (JCasC) — how it enables reproducible Jenkins instances',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Spike: A/B and maintenance deployment options
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '00730c91-0073-4007-a007-00730c910000',
  '12eef313-12ee-412e-a12e-12eef3130000',
  'maint-t1',
  'Spike: A/B and maintenance deployment options',
  'task',
  'May 30, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee852e-0dee-40de-a0de-0dee852e0000',
  '00730c91-0073-4007-a007-00730c910000',
  'maint-t1a',
  'Document current Jenkins deployment topology and pain points during upgrades',
  'Apr 11',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee852d-0dee-40de-a0de-0dee852d0000',
  '00730c91-0073-4007-a007-00730c910000',
  'maint-t1b',
  'Evaluate Option A: Blue/Green Jenkins with traffic routing',
  'Apr 25',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee852c-0dee-40de-a0de-0dee852c0000',
  '00730c91-0073-4007-a007-00730c910000',
  'maint-t1c',
  'Evaluate Option B: Staged canary rollout with JCasC',
  'May 9',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee852b-0dee-40de-a0de-0dee852b0000',
  '00730c91-0073-4007-a007-00730c910000',
  'maint-t1d',
  'Write spike findings doc comparing options by cost, risk, and complexity',
  'May 23',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee852a-0dee-40de-a0de-0dee852a0000',
  '00730c91-0073-4007-a007-00730c910000',
  'maint-t1e',
  'Present findings and get approval on preferred approach',
  'May 30',
  4,
  NOW(),
  NOW()
);

-- Insert Task: Write fully-detailed stories for board
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '00730c90-0073-4007-a007-00730c900000',
  '12eef313-12ee-412e-a12e-12eef3130000',
  'maint-t2',
  'Write fully-detailed stories for board',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee850f-0dee-40de-a0de-0dee850f0000',
  '00730c90-0073-4007-a007-00730c900000',
  'maint-t2a',
  'Write stories for the approved maintenance/deployment approach',
  'Jun 27',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee850e-0dee-40de-a0de-0dee850e0000',
  '00730c90-0073-4007-a007-00730c900000',
  'maint-t2b',
  'Include runbook stories: rollback procedure, health checks, communication plan',
  'Jul 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '0dee850d-0dee-40de-a0de-0dee850d0000',
  '00730c90-0073-4007-a007-00730c900000',
  'maint-t2c',
  'Estimate and get stories to ''Ready'' on the board',
  'Jul 31',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Organizational: Job Clarity & Readability
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '74dc0e2b-74dc-474d-a74d-74dc0e2b0000',
  '504deffc-504d-4504-a504-504deffc0000',
  'org-clarity',
  'Organizational: Job Clarity & Readability',
  'Update jobs for clarity of purpose, readability, and organization for major build projects so customers can easily understand what each job does.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["All ambiguous job names flagged with proposed replacements","Folder structure proposal approved","Stories covering renames, descriptions, and folder restructure are board-ready"]'::jsonb,
  2,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins Job Naming, Folders & Description Best Practices
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '277f561b-277f-4277-a277-277f561b0000',
  '74dc0e2b-74dc-474d-a74d-74dc0e2b0000',
  'org-learn',
  'Learning: Jenkins Job Naming, Folders & Description Best Practices',
  'learning',
  'Feb 28, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c201332-3c20-43c2-a3c2-3c2013320000',
  '277f561b-277f-4277-a277-277f561b0000',
  'org-l1',
  'Read Jenkins Folders plugin documentation — how to organize jobs hierarchically',
  'Feb 14',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c201331-3c20-43c2-a3c2-3c2013310000',
  '277f561b-277f-4277-a277-277f561b0000',
  'org-l2',
  'Study Jenkins job description field — how HTML descriptions improve discoverability',
  'Feb 21',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c201330-3c20-43c2-a3c2-3c2013300000',
  '277f561b-277f-4277-a277-277f561b0000',
  'org-l3',
  'Review industry naming convention guides for CI/CD jobs (e.g., <project>-<env>-<action>)',
  'Feb 28',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Audit current job naming and organization
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3c20123a-3c20-43c2-a3c2-3c20123a0000',
  '74dc0e2b-74dc-474d-a74d-74dc0e2b0000',
  'org-t1',
  'Audit current job naming and organization',
  'task',
  'Apr 11, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '47e234a5-47e2-447e-a47e-47e234a50000',
  '3c20123a-3c20-43c2-a3c2-3c20123a0000',
  'org-t1a',
  'List all jobs and evaluate current names for clarity — flag ambiguous or misleading names',
  'Mar 14',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '47e234a4-47e2-447e-a47e-47e234a40000',
  '3c20123a-3c20-43c2-a3c2-3c20123a0000',
  'org-t1b',
  'Identify jobs missing descriptions or with outdated descriptions',
  'Mar 28',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '47e234a3-47e2-447e-a47e-47e234a30000',
  '3c20123a-3c20-43c2-a3c2-3c20123a0000',
  'org-t1c',
  'Propose a folder structure for major build projects and get team buy-in',
  'Apr 11',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Write stories for job clarity improvements
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3c201239-3c20-43c2-a3c2-3c2012390000',
  '74dc0e2b-74dc-474d-a74d-74dc0e2b0000',
  'org-t2',
  'Write stories for job clarity improvements',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '47e23486-47e2-447e-a47e-47e234860000',
  '3c201239-3c20-43c2-a3c2-3c2012390000',
  'org-t2a',
  'Write stories for job renames with a migration/redirect plan',
  'May 30',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '47e23485-47e2-447e-a47e-47e234850000',
  '3c201239-3c20-43c2-a3c2-3c2012390000',
  'org-t2b',
  'Write stories for adding/updating job descriptions in bulk',
  'Jun 13',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '47e23484-47e2-447e-a47e-47e234840000',
  '3c201239-3c20-43c2-a3c2-3c2012390000',
  'org-t2c',
  'Write stories for folder restructure with customer communication plan',
  'Jun 27',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '47e23483-47e2-447e-a47e-47e234830000',
  '3c201239-3c20-43c2-a3c2-3c2012390000',
  'org-t2d',
  'Estimate and board-ready all stories',
  'Jul 31',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Organizational: Release List Integration
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '274f5eed-274f-4274-a274-274f5eed0000',
  '504deffc-504d-4504-a504-504deffc0000',
  'org-release-list',
  'Organizational: Release List Integration',
  'Release List used to update clients and other release-based jobs with the current release stage.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Release List data model designed and approved","All consumer jobs identified","Implementation stories are board-ready by end of Q2"]'::jsonb,
  3,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Release Management & Jenkins Parameters
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '19ada30f-19ad-419a-a19a-19ada30f0000',
  '274f5eed-274f-4274-a274-274f5eed0000',
  'rl-learn',
  'Learning: Release Management & Jenkins Parameters',
  'learning',
  'Mar 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067845b8-0678-4067-a067-067845b80000',
  '19ada30f-19ad-419a-a19a-19ada30f0000',
  'rl-l1',
  'Understand the current release process end-to-end — trace how release stage info flows today',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067845b9-0678-4067-a067-067845b90000',
  '19ada30f-19ad-419a-a19a-19ada30f0000',
  'rl-l2',
  'Study Jenkins parameterized builds and how downstream jobs consume parameters',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067845ba-0678-4067-a067-067845ba0000',
  '19ada30f-19ad-419a-a19a-19ada30f0000',
  'rl-l3',
  'Research options for a shared release state store (file, artifact, API endpoint, or env var)',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Design the Release List data model and integration points
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '067846b0-0678-4067-a067-067846b00000',
  '274f5eed-274f-4274-a274-274f5eed0000',
  'rl-t1',
  'Design the Release List data model and integration points',
  'task',
  'May 30, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f704f-376f-4376-a376-376f704f0000',
  '067846b0-0678-4067-a067-067846b00000',
  'rl-t1a',
  'Define what ''release stage'' data needs to be tracked and by whom',
  'Apr 11',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f704e-376f-4376-a376-376f704e0000',
  '067846b0-0678-4067-a067-067846b00000',
  'rl-t1b',
  'Identify all jobs and clients that need to consume release stage info',
  'Apr 25',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f704d-376f-4376-a376-376f704d0000',
  '067846b0-0678-4067-a067-067846b00000',
  'rl-t1c',
  'Design a lightweight Release List data structure (JSON file, Jira field, or custom API)',
  'May 16',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f704c-376f-4376-a376-376f704c0000',
  '067846b0-0678-4067-a067-067846b00000',
  'rl-t1d',
  'Document the design and get stakeholder sign-off',
  'May 30',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Write stories for Release List implementation
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '067846b1-0678-4067-a067-067846b10000',
  '274f5eed-274f-4274-a274-274f5eed0000',
  'rl-t2',
  'Write stories for Release List implementation',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f7030-376f-4376-a376-376f70300000',
  '067846b1-0678-4067-a067-067846b10000',
  'rl-t2a',
  'Write story: create/update Release List on stage transitions',
  'Jun 20',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f702f-376f-4376-a376-376f702f0000',
  '067846b1-0678-4067-a067-067846b10000',
  'rl-t2b',
  'Write story: downstream jobs read from Release List before executing',
  'Jun 27',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f702e-376f-4376-a376-376f702e0000',
  '067846b1-0678-4067-a067-067846b10000',
  'rl-t2c',
  'Write story: surface release stage visibly in Jenkins job descriptions or badge',
  'Jul 11',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '376f702d-376f-4376-a376-376f702d0000',
  '067846b1-0678-4067-a067-067846b10000',
  'rl-t2d',
  'Estimate and board-ready all stories',
  'Jul 31',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Organizational: Jenkins Branding Automation
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '0410e03c-0410-4041-a041-0410e03c0000',
  '504deffc-504d-4504-a504-504deffc0000',
  'org-branding',
  'Organizational: Jenkins Branding Automation',
  'Implement Jenkins branding automation so the theme, logos, and look-and-feel can be easily and consistently updated across all instances.',
  'Pipeline / Platform Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Branding can be updated via config change without manual UI steps","Spike proved approach is viable","Stories are board-ready by end of Q2"]'::jsonb,
  4,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins Themes & Configuration as Code
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '6a355382-6a35-46a3-a6a3-6a3553820000',
  '0410e03c-0410-4041-a041-0410e03c0000',
  'brand-learn',
  'Learning: Jenkins Themes & Configuration as Code',
  'learning',
  'Mar 7, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '018416b5-0184-4018-a018-018416b50000',
  '6a355382-6a35-46a3-a6a3-6a3553820000',
  'brand-l1',
  'Read about the Jenkins Simple Theme plugin and how CSS overrides work',
  'Feb 21',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '018416b4-0184-4018-a018-018416b40000',
  '6a355382-6a35-46a3-a6a3-6a3553820000',
  'brand-l2',
  'Study Jenkins Configuration as Code (JCasC) — how it manages theme/appearance settings',
  'Feb 28',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '018416b3-0184-4018-a018-018416b30000',
  '6a355382-6a35-46a3-a6a3-6a3553820000',
  'brand-l3',
  'Review the Jenkins Dark Theme plugin as a reference implementation',
  'Mar 7',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Spike: Branding automation approach
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '018415bd-0184-4018-a018-018415bd0000',
  '0410e03c-0410-4041-a041-0410e03c0000',
  'brand-t1',
  'Spike: Branding automation approach',
  'task',
  'Apr 30, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea182-2efe-42ef-a2ef-2efea1820000',
  '018415bd-0184-4018-a018-018415bd0000',
  'brand-t1a',
  'Prototype a theme CSS override applied via JCasC in a test Jenkins instance',
  'Mar 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea181-2efe-42ef-a2ef-2efea1810000',
  '018415bd-0184-4018-a018-018415bd0000',
  'brand-t1b',
  'Test that a theme update can be applied without a Jenkins restart',
  'Apr 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea180-2efe-42ef-a2ef-2efea1800000',
  '018415bd-0184-4018-a018-018415bd0000',
  'brand-t1c',
  'Document the automation approach and any limitations found',
  'Apr 25',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea17f-2efe-42ef-a2ef-2efea17f0000',
  '018415bd-0184-4018-a018-018415bd0000',
  'brand-t1d',
  'Write spike summary and get approval to proceed',
  'Apr 30',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Write stories for branding automation
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '018415bc-0184-4018-a018-018415bc0000',
  '0410e03c-0410-4041-a041-0410e03c0000',
  'brand-t2',
  'Write stories for branding automation',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea163-2efe-42ef-a2ef-2efea1630000',
  '018415bc-0184-4018-a018-018415bc0000',
  'brand-t2a',
  'Write story: JCasC-managed theme configuration with version control',
  'Jun 13',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea162-2efe-42ef-a2ef-2efea1620000',
  '018415bc-0184-4018-a018-018415bc0000',
  'brand-t2b',
  'Write story: automated theme deployment pipeline (update → test → apply)',
  'Jun 27',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea161-2efe-42ef-a2ef-2efea1610000',
  '018415bc-0184-4018-a018-018415bc0000',
  'brand-t2c',
  'Write story: documentation for how to update branding going forward',
  'Jul 11',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2efea160-2efe-42ef-a2ef-2efea1600000',
  '018415bc-0184-4018-a018-018415bc0000',
  'brand-t2d',
  'Estimate and board-ready all stories',
  'Jul 31',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Reporting: Visual Job Health & History
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '147d036c-147d-4147-a147-147d036c0000',
  '504deffc-504d-4504-a504-504deffc0000',
  'reporting-visuals',
  'Reporting: Visual Job Health & History',
  'Update Jenkins with visual representations explaining job health and history so customers can quickly assess reliability and trends.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Customer needs survey completed","Plugin evaluated and approved","Stories for visual reporting are board-ready by end of Q2"]'::jsonb,
  5,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins Reporting Plugins & Dashboards
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '08af5285-08af-408a-a08a-08af52850000',
  '147d036c-147d-4147-a147-147d036c0000',
  'rv-learn',
  'Learning: Jenkins Reporting Plugins & Dashboards',
  'learning',
  'Mar 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067cd16e-067c-4067-a067-067cd16e0000',
  '08af5285-08af-408a-a08a-08af52850000',
  'rv-l1',
  'Read about the Jenkins Build Monitor plugin and what it visualizes',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067cd16f-067c-4067-a067-067cd16f0000',
  '08af5285-08af-408a-a08a-08af52850000',
  'rv-l2',
  'Study the Jenkins Test Results Analyzer plugin for trend charts',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '067cd170-067c-4067-a067-067cd1700000',
  '08af5285-08af-408a-a08a-08af52850000',
  'rv-l3',
  'Explore the Jenkins Metrics and Monitoring plugin ecosystem overview',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Audit current reporting gaps and evaluate plugins
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '067cd266-067c-4067-a067-067cd2660000',
  '147d036c-147d-4147-a147-147d036c0000',
  'rv-t1',
  'Audit current reporting gaps and evaluate plugins',
  'task',
  'May 16, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28545-36e2-436e-a36e-36e285450000',
  '067cd266-067c-4067-a067-067cd2660000',
  'rv-t1a',
  'Survey 3–5 internal customers: what health/history info do they wish they could see?',
  'Apr 11',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28544-36e2-436e-a36e-36e285440000',
  '067cd266-067c-4067-a067-067cd2660000',
  'rv-t1b',
  'Evaluate top 3 Jenkins dashboard/reporting plugins against those needs',
  'Apr 25',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28543-36e2-436e-a36e-36e285430000',
  '067cd266-067c-4067-a067-067cd2660000',
  'rv-t1c',
  'Install and demo chosen plugin in a non-prod Jenkins; gather feedback',
  'May 9',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28542-36e2-436e-a36e-36e285420000',
  '067cd266-067c-4067-a067-067cd2660000',
  'rv-t1d',
  'Document recommendation and get approval',
  'May 16',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Write stories for visual reporting improvements
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '067cd267-067c-4067-a067-067cd2670000',
  '147d036c-147d-4147-a147-147d036c0000',
  'rv-t2',
  'Write stories for visual reporting improvements',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28526-36e2-436e-a36e-36e285260000',
  '067cd267-067c-4067-a067-067cd2670000',
  'rv-t2a',
  'Write story: install and configure chosen dashboard plugin',
  'Jun 13',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28525-36e2-436e-a36e-36e285250000',
  '067cd267-067c-4067-a067-067cd2670000',
  'rv-t2b',
  'Write story: configure per-folder and per-job health dashboards',
  'Jun 27',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28524-36e2-436e-a36e-36e285240000',
  '067cd267-067c-4067-a067-067cd2670000',
  'rv-t2c',
  'Write story: customer-facing documentation on how to read the dashboards',
  'Jul 11',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '36e28523-36e2-436e-a36e-36e285230000',
  '067cd267-067c-4067-a067-067cd2670000',
  'rv-t2d',
  'Estimate and board-ready all stories',
  'Jul 31',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Reporting: Failed Stages & Log Improvements
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '4e11d0e8-4e11-44e1-a4e1-4e11d0e80000',
  '504deffc-504d-4504-a504-504deffc0000',
  'reporting-failures',
  'Reporting: Failed Stages & Log Improvements',
  'Improve job failure reporting so jobs list failed stages, highlight errors clearly, and provide better log output for faster debugging.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Top 5 failure patterns documented","Stories for failure reporting are board-ready by end of Q2","Customer log pain points addressed in at least one story each"]'::jsonb,
  6,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins Failure Cause & Log Parsing Plugins
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '57130695-5713-4571-a571-571306950000',
  '4e11d0e8-4e11-44e1-a4e1-4e11d0e80000',
  'rf-learn',
  'Learning: Jenkins Failure Cause & Log Parsing Plugins',
  'learning',
  'Mar 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '06758b7e-0675-4067-a067-06758b7e0000',
  '57130695-5713-4571-a571-571306950000',
  'rf-l1',
  'Study the Build Failure Analyzer plugin — how it matches log patterns to named causes',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '06758b7f-0675-4067-a067-06758b7f0000',
  '57130695-5713-4571-a571-571306950000',
  'rf-l2',
  'Read about Jenkins pipeline `catchError` and `unstable` for nuanced failure handling',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '06758b80-0675-4067-a067-06758b800000',
  '57130695-5713-4571-a571-571306950000',
  'rf-l3',
  'Research ANSI color and timestamper plugins for more readable console output',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Catalog common failure modes and current log pain points
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '06758c76-0675-4067-a067-06758c760000',
  '4e11d0e8-4e11-44e1-a4e1-4e11d0e80000',
  'rf-t1',
  'Catalog common failure modes and current log pain points',
  'task',
  'Apr 25, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37c3fd55-37c3-437c-a37c-37c3fd550000',
  '06758c76-0675-4067-a067-06758c760000',
  'rf-t1a',
  'Review the last 30 days of failed builds and categorize root causes',
  'Mar 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37c3fd54-37c3-437c-a37c-37c3fd540000',
  '06758c76-0675-4067-a067-06758c760000',
  'rf-t1b',
  'Ask customers: what makes Jenkins error logs hardest to read or act on?',
  'Apr 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37c3fd53-37c3-437c-a37c-37c3fd530000',
  '06758c76-0675-4067-a067-06758c760000',
  'rf-t1c',
  'Document top 5 failure patterns that should have named causes in Build Failure Analyzer',
  'Apr 25',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Write stories for failure reporting improvements
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '06758c77-0675-4067-a067-06758c770000',
  '4e11d0e8-4e11-44e1-a4e1-4e11d0e80000',
  'rf-t2',
  'Write stories for failure reporting improvements',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37c3fd36-37c3-437c-a37c-37c3fd360000',
  '06758c77-0675-4067-a067-06758c770000',
  'rf-t2a',
  'Write story: configure Build Failure Analyzer with named causes for top 5 patterns',
  'Jun 13',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37c3fd35-37c3-437c-a37c-37c3fd350000',
  '06758c77-0675-4067-a067-06758c770000',
  'rf-t2b',
  'Write story: add ANSI color and timestamps to all pipeline console output',
  'Jun 27',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37c3fd34-37c3-437c-a37c-37c3fd340000',
  '06758c77-0675-4067-a067-06758c770000',
  'rf-t2c',
  'Write story: stage-level failure summaries surfaced on the job run page',
  'Jul 11',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37c3fd33-37c3-437c-a37c-37c3fd330000',
  '06758c77-0675-4067-a067-06758c770000',
  'rf-t2d',
  'Estimate and board-ready all stories',
  'Jul 31',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Reporting: Folder History & Artifact Discovery
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '590df2da-590d-4590-a590-590df2da0000',
  '504deffc-504d-4504-a504-504deffc0000',
  'reporting-folders',
  'Reporting: Folder History & Artifact Discovery',
  'Folders show history in a meaningful way — failure rate, average build time, and artifact discovery.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Customer metric survey completed","Prototype folder view reviewed and approved","Stories for folder reporting are board-ready by end of Q2"]'::jsonb,
  7,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins Folder-Level Metrics & Artifact Management
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '670bd6e7-670b-4670-a670-670bd6e70000',
  '590df2da-590d-4590-a590-590df2da0000',
  'rfd-learn',
  'Learning: Jenkins Folder-Level Metrics & Artifact Management',
  'learning',
  'Mar 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37ac007e-37ac-437a-a37a-37ac007e0000',
  '670bd6e7-670b-4670-a670-670bd6e70000',
  'rfd-l1',
  'Read CloudBees Folders plugin docs — understand what metadata folders can surface',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37ac007d-37ac-437a-a37a-37ac007d0000',
  '670bd6e7-670b-4670-a670-670bd6e70000',
  'rfd-l2',
  'Study Jenkins artifact archiving and the Artifact Manager plugin',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '37ac007c-37ac-437a-a37a-37ac007c0000',
  '670bd6e7-670b-4670-a670-670bd6e70000',
  'rfd-l3',
  'Explore how folder-level views can be customized using Jenkins List Views',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Define meaningful folder-level metrics
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '37abff86-37ab-437a-a37a-37abff860000',
  '590df2da-590d-4590-a590-590df2da0000',
  'rfd-t1',
  'Define meaningful folder-level metrics',
  'task',
  'Apr 25, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '422c0f27-422c-4422-a422-422c0f270000',
  '37abff86-37ab-437a-a37a-37abff860000',
  'rfd-t1a',
  'Survey customers: what metrics at folder level would be most useful?',
  'Mar 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '422c0f28-422c-4422-a422-422c0f280000',
  '37abff86-37ab-437a-a37a-37abff860000',
  'rfd-t1b',
  'Prototype a folder view with failure rate and average build time columns in non-prod Jenkins',
  'Apr 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '422c0f29-422c-4422-a422-422c0f290000',
  '37abff86-37ab-437a-a37a-37abff860000',
  'rfd-t1c',
  'Define the artifact discovery UX: how should customers find artifacts from a folder view?',
  'Apr 25',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Write stories for folder reporting improvements
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '37abff85-37ab-437a-a37a-37abff850000',
  '590df2da-590d-4590-a590-590df2da0000',
  'rfd-t2',
  'Write stories for folder reporting improvements',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '422c0f46-422c-4422-a422-422c0f460000',
  '37abff85-37ab-437a-a37a-37abff850000',
  'rfd-t2a',
  'Write story: configure folder views to show failure rate and average build time',
  'Jun 13',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '422c0f47-422c-4422-a422-422c0f470000',
  '37abff85-37ab-437a-a37a-37abff850000',
  'rfd-t2b',
  'Write story: artifact discovery links surfaced at folder level',
  'Jun 27',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '422c0f48-422c-4422-a422-422c0f480000',
  '37abff85-37ab-437a-a37a-37abff850000',
  'rfd-t2c',
  'Write story: folder health badges visible on Jenkins home dashboard',
  'Jul 11',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '422c0f49-422c-4422-a422-422c0f490000',
  '37abff85-37ab-437a-a37a-37abff850000',
  'rfd-t2d',
  'Estimate and board-ready all stories',
  'Jul 31',
  3,
  NOW(),
  NOW()
);


-- Insert Pillar: Q2–Q3: Approve, Prioritize & Ready Stories
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '04bdcbe5-04bd-404b-a04b-04bdcbe50000',
  '6611ab4a-6611-4661-a661-6611ab4a0000',
  'story-approval',
  'Q2–Q3: Approve, Prioritize & Ready Stories',
  'Get all work fully scoped and on the board',
  '✅',
  '#C0392B',
  1,
  NOW(),
  NOW()
);

-- Insert Initiative: Story Review & Prioritization
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '0cf55b30-0cf5-40cf-a0cf-0cf55b300000',
  '04bdcbe5-04bd-404b-a04b-04bdcbe50000',
  'story-review',
  'Story Review & Prioritization',
  'All written stories are reviewed, prioritized, fully fleshed out with acceptance criteria and estimates, and placed on the board ready to be picked up.',
  'Pipeline Engineer + Stakeholders',
  'Oct 31, 2026',
  ARRAY['Q2', 'Q3'],
  '["All stories consolidated into one Jira epic view","Every story meets INVEST criteria","Prioritization session completed with stakeholder sign-off","Board is ordered, estimated, and ready to work"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Story Writing, INVEST Criteria & Prioritization
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '746712aa-7467-4746-a746-746712aa0000',
  '0cf55b30-0cf5-40cf-a0cf-0cf55b300000',
  'sr-learn',
  'Learning: Story Writing, INVEST Criteria & Prioritization',
  'learning',
  'Jun 13, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '06891773-0689-4068-a068-068917730000',
  '746712aa-7467-4746-a746-746712aa0000',
  'sr-l1',
  'Read about the INVEST criteria for well-written user stories',
  'May 30',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '06891774-0689-4068-a068-068917740000',
  '746712aa-7467-4746-a746-746712aa0000',
  'sr-l2',
  'Study MoSCoW prioritization method — Must Have vs Should Have vs Could Have',
  'Jun 6',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '06891775-0689-4068-a068-068917750000',
  '746712aa-7467-4746-a746-746712aa0000',
  'sr-l3',
  'Read about story mapping — how to visualize a backlog across a user journey',
  'Jun 13',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Consolidate and deduplicate all written stories
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '0689186b-0689-4068-a068-0689186b0000',
  '0cf55b30-0cf5-40cf-a0cf-0cf55b300000',
  'sr-t1',
  'Consolidate and deduplicate all written stories',
  'task',
  'Jul 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '35660aaa-3566-4356-a356-35660aaa0000',
  '0689186b-0689-4068-a068-0689186b0000',
  'sr-t1a',
  'Gather all stories written across the 8 initiative areas into a single Jira epic view',
  'Jul 11',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '35660aa9-3566-4356-a356-35660aa90000',
  '0689186b-0689-4068-a068-0689186b0000',
  'sr-t1b',
  'Remove duplicates and merge overlapping stories',
  'Jul 18',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '35660aa8-3566-4356-a356-35660aa80000',
  '0689186b-0689-4068-a068-0689186b0000',
  'sr-t1c',
  'Ensure every story meets INVEST criteria — flag any that need more detail',
  'Jul 31',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Prioritize and finalize the board
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '0689186c-0689-4068-a068-0689186c0000',
  '0cf55b30-0cf5-40cf-a0cf-0cf55b300000',
  'sr-t2',
  'Prioritize and finalize the board',
  'task',
  'Oct 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '35660a8b-3566-4356-a356-35660a8b0000',
  '0689186c-0689-4068-a068-0689186c0000',
  'sr-t2a',
  'Run a MoSCoW prioritization session with stakeholders for all stories',
  'Aug 22',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '35660a8a-3566-4356-a356-35660a8a0000',
  '0689186c-0689-4068-a068-0689186c0000',
  'sr-t2b',
  'Ensure every ''Must Have'' story is estimated, acceptance-criteria-complete, and in ''Ready''',
  'Sep 12',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '35660a89-3566-4356-a356-35660a890000',
  '0689186c-0689-4068-a068-0689186c0000',
  'sr-t2c',
  'Order the backlog with top-priority work at the top',
  'Sep 26',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '35660a88-3566-4356-a356-35660a880000',
  '0689186c-0689-4068-a068-0689186c0000',
  'sr-t2d',
  'Publish the prioritized roadmap for customer/stakeholder visibility',
  'Oct 31',
  3,
  NOW(),
  NOW()
);


-- Insert Pillar: Q3–Q4: Revisit & Assess Effectiveness
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '4a549abd-4a54-44a5-a4a5-4a549abd0000',
  '6611ab4a-6611-4661-a661-6611ab4a0000',
  'retrospective',
  'Q3–Q4: Revisit & Assess Effectiveness',
  'Measure outcomes and plan next improvements',
  '🔍',
  '#8E44AD',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Effectiveness Assessment
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '40ec1079-40ec-440e-a40e-40ec10790000',
  '4a549abd-4a54-44a5-a4a5-4a549abd0000',
  'effectiveness-review',
  'Effectiveness Assessment',
  'Revisit all completed work, assess customer satisfaction impact, identify what worked vs what needs refinement, and propose next iterations.',
  'Pipeline Engineer',
  'Dec 31, 2026',
  ARRAY['Q3', 'Q4'],
  '["Customer satisfaction survey completed and results documented","Effectiveness report published with objective metrics where available","Retrospective held with stakeholders","Next-iteration proposals written and shared"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Measuring Developer Experience & Retrospective Techniques
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '59fe89d3-59fe-459f-a59f-59fe89d30000',
  '40ec1079-40ec-440e-a40e-40ec10790000',
  'ea-learn',
  'Learning: Measuring Developer Experience & Retrospective Techniques',
  'learning',
  'Sep 12, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05bc1416-05bc-405b-a05b-05bc14160000',
  '59fe89d3-59fe-459f-a59f-59fe89d30000',
  'ea-l1',
  'Read about DORA metrics (Deployment Frequency, Lead Time, MTTR, Change Failure Rate)',
  'Aug 22',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05bc1417-05bc-405b-a05b-05bc14170000',
  '59fe89d3-59fe-459f-a59f-59fe89d30000',
  'ea-l2',
  'Study how to run an effective retrospective: Start/Stop/Continue format',
  'Aug 29',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '05bc1418-05bc-405b-a05b-05bc14180000',
  '59fe89d3-59fe-459f-a59f-59fe89d30000',
  'ea-l3',
  'Research lightweight developer satisfaction surveys — how to ask the right questions without survey fatigue',
  'Sep 12',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Collect data on completed improvements
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05bc150e-05bc-405b-a05b-05bc150e0000',
  '40ec1079-40ec-440e-a40e-40ec10790000',
  'ea-t1',
  'Collect data on completed improvements',
  'task',
  'Oct 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972ed-4e39-44e3-a4e3-4e3972ed0000',
  '05bc150e-05bc-405b-a05b-05bc150e0000',
  'ea-t1a',
  'List all stories completed in Q1–Q3 and their stated goals',
  'Sep 26',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972ec-4e39-44e3-a4e3-4e3972ec0000',
  '05bc150e-05bc-405b-a05b-05bc150e0000',
  'ea-t1b',
  'Run a short customer satisfaction survey targeted at each improvement area',
  'Oct 10',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972eb-4e39-44e3-a4e3-4e3972eb0000',
  '05bc150e-05bc-405b-a05b-05bc150e0000',
  'ea-t1c',
  'Gather objective metrics where available: build time reduction, rerun rate, failure discovery time',
  'Oct 17',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972ea-4e39-44e3-a4e3-4e3972ea0000',
  '05bc150e-05bc-405b-a05b-05bc150e0000',
  'ea-t1d',
  'Compile findings into an effectiveness report',
  'Oct 31',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Retrospective and next-iteration planning
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '05bc150f-05bc-405b-a05b-05bc150f0000',
  '40ec1079-40ec-440e-a40e-40ec10790000',
  'ea-t2',
  'Retrospective and next-iteration planning',
  'task',
  'Dec 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972ce-4e39-44e3-a4e3-4e3972ce0000',
  '05bc150f-05bc-405b-a05b-05bc150f0000',
  'ea-t2a',
  'Run a formal retrospective with stakeholders: what worked, what didn''t, what to change',
  'Nov 14',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972cd-4e39-44e3-a4e3-4e3972cd0000',
  '05bc150f-05bc-405b-a05b-05bc150f0000',
  'ea-t2b',
  'Identify the top 3 areas needing a second iteration of improvement',
  'Nov 21',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972cc-4e39-44e3-a4e3-4e3972cc0000',
  '05bc150f-05bc-405b-a05b-05bc150f0000',
  'ea-t2c',
  'Write proposals for next year''s improvement stories based on findings',
  'Dec 12',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e3972cb-4e39-44e3-a4e3-4e3972cb0000',
  '05bc150f-05bc-405b-a05b-05bc150f0000',
  'ea-t2d',
  'Publish the effectiveness report and next-iteration proposals for stakeholder review',
  'Dec 31',
  3,
  NOW(),
  NOW()
);



-- ============================================
-- Project: Build Performance & Health Reports
-- ============================================

-- Insert Project: Build Performance & Health Reports
INSERT INTO projects (id, roadmap_id, project_id, title, subtitle, color, icon, wiki_url, position, created_at, updated_at)
VALUES (
  '5374ada9-5374-4537-a537-5374ada90000',
  '3e50f1a9-3e50-43e5-a3e5-3e50f1a90000',
  'buildperf',
  'Build Performance & Health Reports',
  'Framework to report build performance, health, and remediate bottlenecks',
  '#0EA5E9',
  NULL,
  'https://wizardsofthecoast.atlassian.net/wiki/spaces/~bodewec/pages/1584365642',
  2,
  NOW(),
  NOW()
);

-- Insert Pillar: Q1: Build Time Estimates & Health Dashboard
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '6499b7f1-6499-4649-a649-6499b7f10000',
  '5374ada9-5374-4537-a537-5374ada90000',
  'bp-baselines',
  'Q1: Build Time Estimates & Health Dashboard',
  'Establish baselines and get a live health dashboard running',
  '📈',
  '#0EA5E9',
  0,
  NOW(),
  NOW()
);

-- Insert Initiative: Build Time Estimates & Baseline Report
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '594214aa-5942-4594-a594-594214aa0000',
  '6499b7f1-6499-4649-a649-6499b7f10000',
  'bp-time-estimates',
  'Build Time Estimates & Baseline Report',
  'Identify build time estimates for all major pipeline elements using DataDog and other tracking tools. Publish a documented baseline build performance and health report.',
  'Pipeline Engineer',
  'Apr 30, 2026',
  ARRAY['Q1'],
  '["Build time estimates documented for all major pipeline elements","Baseline report published to team wiki with p50/p90/max per element","DataDog (or equivalent) collecting live pipeline timing data","Top 5 slowest elements identified and flagged"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: DataDog APM, Traces & CI Visibility
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '337e8687-337e-4337-a337-337e86870000',
  '594214aa-5942-4594-a594-594214aa0000',
  'bp-te-learn',
  'Learning: DataDog APM, Traces & CI Visibility',
  'learning',
  'Feb 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c4873e2-3c48-43c4-a3c4-3c4873e20000',
  '337e8687-337e-4337-a337-337e86870000',
  'bp-te-l1',
  'Read DataDog CI Visibility docs — how it ingests pipeline run data and build durations',
  'Feb 7',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c4873e3-3c48-43c4-a3c4-3c4873e30000',
  '337e8687-337e-4337-a337-337e86870000',
  'bp-te-l2',
  'Study DataDog APM traces — understand spans, services, and how to correlate with pipeline stages',
  'Feb 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c4873e4-3c48-43c4-a3c4-3c4873e40000',
  '337e8687-337e-4337-a337-337e86870000',
  'bp-te-l3',
  'Read about DataDog dashboards and SLOs — how to create performance baseline widgets',
  'Feb 14',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c4873e5-3c48-43c4-a3c4-3c4873e50000',
  '337e8687-337e-4337-a337-337e86870000',
  'bp-te-l4',
  'Research alternatives if DataDog coverage is incomplete: Jenkins Metrics plugin, InfluxDB+Grafana',
  'Feb 14',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Instrument and collect build timing data
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3c4874da-3c48-43c4-a3c4-3c4874da0000',
  '594214aa-5942-4594-a594-594214aa0000',
  'bp-te-t1',
  'Instrument and collect build timing data',
  'task',
  'Mar 21, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626c7-4cc6-44cc-a4cc-4cc626c70000',
  '3c4874da-3c48-43c4-a3c4-3c4874da0000',
  'bp-te-t1a',
  'Identify all major pipeline elements: compile, test, package, deploy, scan, publish',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626c8-4cc6-44cc-a4cc-4cc626c80000',
  '3c4874da-3c48-43c4-a3c4-3c4874da0000',
  'bp-te-t1b',
  'Confirm DataDog CI Visibility is receiving data from Jenkins (or set up the integration)',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626c9-4cc6-44cc-a4cc-4cc626c90000',
  '3c4874da-3c48-43c4-a3c4-3c4874da0000',
  'bp-te-t1c',
  'Collect at least 2 weeks of timing data per major pipeline element',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626ca-4cc6-44cc-a4cc-4cc626ca0000',
  '3c4874da-3c48-43c4-a3c4-3c4874da0000',
  'bp-te-t1d',
  'Export raw timing data per element into a spreadsheet for baseline analysis',
  'Mar 21',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Publish baseline build performance report
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3c4874db-3c48-43c4-a3c4-3c4874db0000',
  '594214aa-5942-4594-a594-594214aa0000',
  'bp-te-t2',
  'Publish baseline build performance report',
  'task',
  'Apr 30, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626e6-4cc6-44cc-a4cc-4cc626e60000',
  '3c4874db-3c48-43c4-a3c4-3c4874db0000',
  'bp-te-t2a',
  'Calculate p50, p90, and max durations for each major pipeline element',
  'Apr 4',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626e7-4cc6-44cc-a4cc-4cc626e70000',
  '3c4874db-3c48-43c4-a3c4-3c4874db0000',
  'bp-te-t2b',
  'Identify top 5 slowest elements and flag as candidates for bottleneck analysis',
  'Apr 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626e8-4cc6-44cc-a4cc-4cc626e80000',
  '3c4874db-3c48-43c4-a3c4-3c4874db0000',
  'bp-te-t2c',
  'Write and publish the baseline build performance report to team wiki',
  'Apr 18',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4cc626e9-4cc6-44cc-a4cc-4cc626e90000',
  '3c4874db-3c48-43c4-a3c4-3c4874db0000',
  'bp-te-t2d',
  'Create a DataDog dashboard widget showing baseline build times per element',
  'Apr 30',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Build Health Dashboard
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '201913fe-2019-4201-a201-201913fe0000',
  '6499b7f1-6499-4649-a649-6499b7f10000',
  'bp-health-dashboard',
  'Build Health Dashboard',
  'Implement a live Build Health Dashboard tracking failure rate, rerun frequency, and average build time across all major pipeline jobs.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q1', 'Q2'],
  '["Dashboard live with Failure Rate, Rerun Frequency, and Avg Build Time","Alerts configured for threshold breaches","Dashboard accessible to stakeholders with a published user guide","Trend charts showing 7-day and 30-day rolling views"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Build Health Metrics & Dashboard Design
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '200a30d2-200a-4200-a200-200a30d20000',
  '201913fe-2019-4201-a201-201913fe0000',
  'bp-hd-learn',
  'Learning: Build Health Metrics & Dashboard Design',
  'learning',
  'Mar 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b9ee577-3b9e-43b9-a3b9-3b9ee5770000',
  '200a30d2-200a-4200-a200-200a30d20000',
  'bp-hd-l1',
  'Read about DORA''s four key metrics — understand failure rate and MTTR in CI context',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b9ee578-3b9e-43b9-a3b9-3b9ee5780000',
  '200a30d2-200a-4200-a200-200a30d20000',
  'bp-hd-l2',
  'Study DataDog monitor and alert configuration — how to set thresholds for health signals',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b9ee579-3b9e-43b9-a3b9-3b9ee5790000',
  '200a30d2-200a-4200-a200-200a30d20000',
  'bp-hd-l3',
  'Research rerun frequency tracking — how to distinguish a manual rerun from a first-run in Jenkins logs',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Define health metrics and data sources
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b9ee66f-3b9e-43b9-a3b9-3b9ee66f0000',
  '201913fe-2019-4201-a201-201913fe0000',
  'bp-hd-t1',
  'Define health metrics and data sources',
  'task',
  'Apr 30, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7d2-383d-4383-a383-383de7d20000',
  '3b9ee66f-3b9e-43b9-a3b9-3b9ee66f0000',
  'bp-hd-t1a',
  'Define exactly how ''failure rate'' is calculated (per job? per stage? over what window?)',
  'Mar 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7d3-383d-4383-a383-383de7d30000',
  '3b9ee66f-3b9e-43b9-a3b9-3b9ee66f0000',
  'bp-hd-t1b',
  'Define how ''rerun frequency'' is measured — identify the Jenkins log field or tag that indicates a rerun',
  'Apr 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7d4-383d-4383-a383-383de7d40000',
  '3b9ee66f-3b9e-43b9-a3b9-3b9ee66f0000',
  'bp-hd-t1c',
  'Confirm all three metrics (failure rate, rerun frequency, avg build time) are flowing into DataDog',
  'Apr 25',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7d5-383d-4383-a383-383de7d50000',
  '3b9ee66f-3b9e-43b9-a3b9-3b9ee66f0000',
  'bp-hd-t1d',
  'Document metric definitions in a shared spec doc for stakeholder review',
  'Apr 30',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Build and publish the health dashboard
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b9ee670-3b9e-43b9-a3b9-3b9ee6700000',
  '201913fe-2019-4201-a201-201913fe0000',
  'bp-hd-t2',
  'Build and publish the health dashboard',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7f1-383d-4383-a383-383de7f10000',
  '3b9ee670-3b9e-43b9-a3b9-3b9ee6700000',
  'bp-hd-t2a',
  'Create DataDog dashboard with Failure Rate, Rerun Frequency, and Avg Build Time widgets',
  'May 30',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7f2-383d-4383-a383-383de7f20000',
  '3b9ee670-3b9e-43b9-a3b9-3b9ee6700000',
  'bp-hd-t2b',
  'Add time-series trend charts (7-day and 30-day rolling views) for each metric',
  'Jun 13',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7f3-383d-4383-a383-383de7f30000',
  '3b9ee670-3b9e-43b9-a3b9-3b9ee6700000',
  'bp-hd-t2c',
  'Set up DataDog monitors/alerts for when failure rate or rerun frequency exceeds thresholds',
  'Jun 27',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7f4-383d-4383-a383-383de7f40000',
  '3b9ee670-3b9e-43b9-a3b9-3b9ee6700000',
  'bp-hd-t2d',
  'Publish dashboard link to team wiki and configure access for stakeholders',
  'Jul 11',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '383de7f5-383d-4383-a383-383de7f50000',
  '3b9ee670-3b9e-43b9-a3b9-3b9ee6700000',
  'bp-hd-t2e',
  'Write a dashboard user guide explaining each metric and how to act on alerts',
  'Jul 31',
  4,
  NOW(),
  NOW()
);


-- Insert Pillar: Q2–Q3: Common Failures & Visual Reporting
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '17ff6ec8-17ff-417f-a17f-17ff6ec80000',
  '5374ada9-5374-4537-a537-5374ada90000',
  'bp-failures',
  'Q2–Q3: Common Failures & Visual Reporting',
  'Identify failure patterns and enable visual job state reporting',
  '🔎',
  '#0284C7',
  1,
  NOW(),
  NOW()
);

-- Insert Initiative: Identify Common Build Failures
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '7349024c-7349-4734-a734-7349024c0000',
  '17ff6ec8-17ff-417f-a17f-17ff6ec80000',
  'bp-common-failures',
  'Identify Common Build Failures',
  'Identify common build failures, their stage, and root cause across all major build projects. Build a catalog of top failure patterns.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q2'],
  '["Top 10 build failures catalogued by stage and root cause","All top failures registered as named causes in Build Failure Analyzer","Failures catalog published to team wiki"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Log Analysis & Root Cause Categorization
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '7d8f3907-7d8f-47d8-a7d8-7d8f39070000',
  '7349024c-7349-4734-a734-7349024c0000',
  'bp-cf-learn',
  'Learning: Log Analysis & Root Cause Categorization',
  'learning',
  'May 16, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b5958b0-3b59-43b5-a3b5-3b5958b00000',
  '7d8f3907-7d8f-47d8-a7d8-7d8f39070000',
  'bp-cf-l1',
  'Read about Jenkins Build Failure Analyzer plugin — how to create and match failure patterns',
  'May 2',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b5958b1-3b59-43b5-a3b5-3b5958b10000',
  '7d8f3907-7d8f-47d8-a7d8-7d8f39070000',
  'bp-cf-l2',
  'Study DataDog Log Management — how to search, filter, and aggregate pipeline log lines',
  'May 9',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b5958b2-3b59-43b5-a3b5-3b5958b20000',
  '7d8f3907-7d8f-47d8-a7d8-7d8f39070000',
  'bp-cf-l3',
  'Read about root cause analysis techniques: 5-Why, fishbone diagram for systemic issues',
  'May 16',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Catalog common failures by stage and cause
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b5959a8-3b59-43b5-a3b5-3b5959a80000',
  '7349024c-7349-4734-a734-7349024c0000',
  'bp-cf-t1',
  'Catalog common failures by stage and cause',
  'task',
  'Jun 27, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2fd1dbb9-2fd1-42fd-a2fd-2fd1dbb90000',
  '3b5959a8-3b59-43b5-a3b5-3b5959a80000',
  'bp-cf-t1a',
  'Pull 60-day failure history from DataDog and Jenkins for all major build projects',
  'May 30',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2fd1dbba-2fd1-42fd-a2fd-2fd1dbba0000',
  '3b5959a8-3b59-43b5-a3b5-3b5959a80000',
  'bp-cf-t1b',
  'Group failures by pipeline stage (compile, test, package, deploy, scan)',
  'Jun 6',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2fd1dbbb-2fd1-42fd-a2fd-2fd1dbbb0000',
  '3b5959a8-3b59-43b5-a3b5-3b5959a80000',
  'bp-cf-t1c',
  'Identify the top 10 failure messages and categorize each by root cause type',
  'Jun 13',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2fd1dbbc-2fd1-42fd-a2fd-2fd1dbbc0000',
  '3b5959a8-3b59-43b5-a3b5-3b5959a80000',
  'bp-cf-t1d',
  'Document each failure: stage, error message, frequency, and known cause',
  'Jun 27',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Register top failures in Build Failure Analyzer
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b5959a9-3b59-43b5-a3b5-3b5959a90000',
  '7349024c-7349-4734-a734-7349024c0000',
  'bp-cf-t2',
  'Register top failures in Build Failure Analyzer',
  'task',
  'Jul 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2fd1dbd8-2fd1-42fd-a2fd-2fd1dbd80000',
  '3b5959a9-3b59-43b5-a3b5-3b5959a90000',
  'bp-cf-t2a',
  'Create named failure causes in Build Failure Analyzer for the top 10 patterns',
  'Jul 11',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2fd1dbd9-2fd1-42fd-a2fd-2fd1dbd90000',
  '3b5959a9-3b59-43b5-a3b5-3b5959a90000',
  'bp-cf-t2b',
  'Verify that new builds are now being tagged with named causes on failure',
  'Jul 18',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2fd1dbda-2fd1-42fd-a2fd-2fd1dbda0000',
  '3b5959a9-3b59-43b5-a3b5-3b5959a90000',
  'bp-cf-t2c',
  'Publish common failures catalog to team wiki',
  'Jul 31',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Visual Job State & History Reporting
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '33b48080-33b4-433b-a33b-33b480800000',
  '17ff6ec8-17ff-417f-a17f-17ff6ec80000',
  'bp-visual-reporting',
  'Visual Job State & History Reporting',
  'Enable visual job state and history reporting for major build projects, surfacing common failures, trend data, and actionable health signals.',
  'Pipeline Engineer',
  'Oct 31, 2026',
  ARRAY['Q2', 'Q3'],
  '["Visual reporting enabled for all major build projects","Stage-level failure visualization active for top 5 projects","Monthly health report template created and first report published","Stakeholders informed and able to access dashboard"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Jenkins Visual Plugins & DataDog Dashboard Advanced
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '4d0e1d6e-4d0e-44d0-a4d0-4d0e1d6e0000',
  '33b48080-33b4-433b-a33b-33b480800000',
  'bp-vr-learn',
  'Learning: Jenkins Visual Plugins & DataDog Dashboard Advanced',
  'learning',
  'Jun 13, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c6a8bb7-3c6a-43c6-a3c6-3c6a8bb70000',
  '4d0e1d6e-4d0e-44d0-a4d0-4d0e1d6e0000',
  'bp-vr-l1',
  'Study Jenkins Blue Ocean or similar UI — how it visualizes stage-level status across builds',
  'May 30',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c6a8bb8-3c6a-43c6-a3c6-3c6a8bb80000',
  '4d0e1d6e-4d0e-44d0-a4d0-4d0e1d6e0000',
  'bp-vr-l2',
  'Read DataDog Notebook docs — how to create narrative-style reporting that combines charts and text',
  'Jun 6',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3c6a8bb9-3c6a-43c6-a3c6-3c6a8bb90000',
  '4d0e1d6e-4d0e-44d0-a4d0-4d0e1d6e0000',
  'bp-vr-l3',
  'Research embedding DataDog dashboard widgets into Confluence or wiki pages for stakeholder sharing',
  'Jun 13',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Implement visual reporting for major build projects
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3c6a8caf-3c6a-43c6-a3c6-3c6a8caf0000',
  '33b48080-33b4-433b-a33b-33b480800000',
  'bp-vr-t1',
  'Implement visual reporting for major build projects',
  'task',
  'Aug 29, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e70992-50e7-450e-a50e-50e709920000',
  '3c6a8caf-3c6a-43c6-a3c6-3c6a8caf0000',
  'bp-vr-t1a',
  'Add per-project breakdown panels to the health dashboard (failure rate per project)',
  'Jul 25',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e70993-50e7-450e-a50e-50e709930000',
  '3c6a8caf-3c6a-43c6-a3c6-3c6a8caf0000',
  'bp-vr-t1b',
  'Add a ''Top Failures by Project'' table widget showing the most common named failures',
  'Aug 8',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e70994-50e7-450e-a50e-50e709940000',
  '3c6a8caf-3c6a-43c6-a3c6-3c6a8caf0000',
  'bp-vr-t1c',
  'Enable stage-level pass/fail visualization in Jenkins for the top 5 major build projects',
  'Aug 22',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e70995-50e7-450e-a50e-50e709950000',
  '3c6a8caf-3c6a-43c6-a3c6-3c6a8caf0000',
  'bp-vr-t1d',
  'Test that visual reporting surfaces known failures from the catalog correctly',
  'Aug 29',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Publish and communicate visual reporting to stakeholders
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3c6a8cb0-3c6a-43c6-a3c6-3c6a8cb00000',
  '33b48080-33b4-433b-a33b-33b480800000',
  'bp-vr-t2',
  'Publish and communicate visual reporting to stakeholders',
  'task',
  'Oct 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e709b1-50e7-450e-a50e-50e709b10000',
  '3c6a8cb0-3c6a-43c6-a3c6-3c6a8cb00000',
  'bp-vr-t2a',
  'Share dashboard link with stakeholders and walk through what each visual means',
  'Sep 19',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e709b2-50e7-450e-a50e-50e709b20000',
  '3c6a8cb0-3c6a-43c6-a3c6-3c6a8cb00000',
  'bp-vr-t2b',
  'Create a DataDog Notebook as a monthly health report template',
  'Oct 3',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e709b3-50e7-450e-a50e-50e709b30000',
  '3c6a8cb0-3c6a-43c6-a3c6-3c6a8cb00000',
  'bp-vr-t2c',
  'Publish the first monthly health report using the notebook template',
  'Oct 17',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '50e709b4-50e7-450e-a50e-50e709b40000',
  '3c6a8cb0-3c6a-43c6-a3c6-3c6a8cb00000',
  'bp-vr-t2d',
  'Document the process for producing monthly health reports going forward',
  'Oct 31',
  3,
  NOW(),
  NOW()
);


-- Insert Pillar: Q3–Q4: Failure Discovery Refinement & Bottleneck Remediation
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '58e88526-58e8-458e-a58e-58e885260000',
  '5374ada9-5374-4537-a537-5374ada90000',
  'bp-remediation',
  'Q3–Q4: Failure Discovery Refinement & Bottleneck Remediation',
  'Solve persistent issues and reduce top bottlenecks',
  '🛠️',
  '#075985',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Refine Failure Discovery Process
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '0b8e496e-0b8e-40b8-a0b8-0b8e496e0000',
  '58e88526-58e8-458e-a58e-58e885260000',
  'bp-failure-discovery',
  'Refine Failure Discovery Process',
  'Refine the failure discovery process to continuously surface and triage top build failures, increasing the ability to identify and solve persistent and novel issues.',
  'Pipeline Engineer',
  'Dec 31, 2026',
  ARRAY['Q3', 'Q4'],
  '["Weekly failure triage ritual established and running for at least 4 weeks","Anomaly detection monitor active in DataDog","Failure discovery runbook published to team wiki","Retrospective written documenting novel vs recurring failures resolved"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Continuous Improvement & Failure Triage Workflows
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '5047d714-5047-4504-a504-5047d7140000',
  '0b8e496e-0b8e-40b8-a0b8-0b8e496e0000',
  'bp-fd-learn',
  'Learning: Continuous Improvement & Failure Triage Workflows',
  'learning',
  'Sep 12, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b82b675-3b82-43b8-a3b8-3b82b6750000',
  '5047d714-5047-4504-a504-5047d7140000',
  'bp-fd-l1',
  'Study how high-performing teams run failure triage rituals — read SRE-style incident review processes',
  'Aug 22',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b82b676-3b82-43b8-a3b8-3b82b6760000',
  '5047d714-5047-4504-a504-5047d7140000',
  'bp-fd-l2',
  'Read about DataDog anomaly detection monitors — how to auto-alert on unusual failure spikes',
  'Sep 5',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b82b677-3b82-43b8-a3b8-3b82b6770000',
  '5047d714-5047-4504-a504-5047d7140000',
  'bp-fd-l3',
  'Research how to track ''novel'' vs ''recurring'' failures — read about deduplication in alerting tools',
  'Sep 12',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Establish recurring failure triage process
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b82b76d-3b82-43b8-a3b8-3b82b76d0000',
  '0b8e496e-0b8e-40b8-a0b8-0b8e496e0000',
  'bp-fd-t1',
  'Establish recurring failure triage process',
  'task',
  'Oct 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d43694-34d4-434d-a34d-34d436940000',
  '3b82b76d-3b82-43b8-a3b8-3b82b76d0000',
  'bp-fd-t1a',
  'Define a weekly failure triage ritual: review top failures, update catalog, assign owners',
  'Sep 26',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d43695-34d4-434d-a34d-34d436950000',
  '3b82b76d-3b82-43b8-a3b8-3b82b76d0000',
  'bp-fd-t1b',
  'Set up DataDog anomaly detection for failure rate — alert when spike exceeds baseline by 20%',
  'Oct 10',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d43696-34d4-434d-a34d-34d436960000',
  '3b82b76d-3b82-43b8-a3b8-3b82b76d0000',
  'bp-fd-t1c',
  'Create a Jira template for logging novel failures found during triage',
  'Oct 17',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d43697-34d4-434d-a34d-34d436970000',
  '3b82b76d-3b82-43b8-a3b8-3b82b76d0000',
  'bp-fd-t1d',
  'Run the triage ritual for 4 consecutive weeks and refine the process based on feedback',
  'Oct 31',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Document and institutionalize the failure discovery process
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b82b76e-3b82-43b8-a3b8-3b82b76e0000',
  '0b8e496e-0b8e-40b8-a0b8-0b8e496e0000',
  'bp-fd-t2',
  'Document and institutionalize the failure discovery process',
  'task',
  'Dec 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d436b3-34d4-434d-a34d-34d436b30000',
  '3b82b76e-3b82-43b8-a3b8-3b82b76e0000',
  'bp-fd-t2a',
  'Write the failure discovery runbook: how to triage, log, assign, and close failure investigations',
  'Nov 14',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d436b4-34d4-434d-a34d-34d436b40000',
  '3b82b76e-3b82-43b8-a3b8-3b82b76e0000',
  'bp-fd-t2b',
  'Publish the runbook to team wiki',
  'Nov 21',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d436b5-34d4-434d-a34d-34d436b50000',
  '3b82b76e-3b82-43b8-a3b8-3b82b76e0000',
  'bp-fd-t2c',
  'Update Build Failure Analyzer with any new patterns found during the Q3–Q4 triage cycles',
  'Dec 12',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '34d436b6-34d4-434d-a34d-34d436b60000',
  '3b82b76e-3b82-43b8-a3b8-3b82b76e0000',
  'bp-fd-t2d',
  'Write a retrospective: how many novel vs recurring failures were caught in Q3–Q4 and what was resolved',
  'Dec 31',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Bottleneck Remediation
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '5a9b2eef-5a9b-45a9-a5a9-5a9b2eef0000',
  '58e88526-58e8-458e-a58e-58e885260000',
  'bp-bottlenecks',
  'Bottleneck Remediation',
  'Identify, prioritize, and remediate the top 3 build bottlenecks. Document each remediation with before/after build time measurements.',
  'Pipeline Engineer',
  'Dec 31, 2026',
  ARRAY['Q4'],
  '["Top 3 bottlenecks identified from dashboard data with documented justification","All 3 remediations implemented and verified","Before/after build time measurements documented in DataDog","Remediation report published to team wiki"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Pipeline Optimization Techniques
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3e3e8bde-3e3e-43e3-a3e3-3e3e8bde0000',
  '5a9b2eef-5a9b-45a9-a5a9-5a9b2eef0000',
  'bp-bn-learn',
  'Learning: Pipeline Optimization Techniques',
  'learning',
  'Oct 17, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b4ee427-3b4e-43b4-a3b4-3b4ee4270000',
  '3e3e8bde-3e3e-43e3-a3e3-3e3e8bde0000',
  'bp-bn-l1',
  'Read about Jenkins parallel stage execution — when and how to parallelize pipeline steps',
  'Oct 3',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b4ee428-3b4e-43b4-a3b4-3b4ee4280000',
  '3e3e8bde-3e3e-43e3-a3e3-3e3e8bde0000',
  'bp-bn-l2',
  'Study build caching strategies: Gradle build cache, Docker layer caching, dependency caching',
  'Oct 10',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '3b4ee429-3b4e-43b4-a3b4-3b4ee4290000',
  '3e3e8bde-3e3e-43e3-a3e3-3e3e8bde0000',
  'bp-bn-l3',
  'Read about test splitting and parallel test execution to reduce test stage duration',
  'Oct 17',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Identify and prioritize top 3 bottlenecks
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b4ee51f-3b4e-43b4-a3b4-3b4ee51f0000',
  '5a9b2eef-5a9b-45a9-a5a9-5a9b2eef0000',
  'bp-bn-t1',
  'Identify and prioritize top 3 bottlenecks',
  'task',
  'Nov 14, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf22-2e8d-42e8-a2e8-2e8dbf220000',
  '3b4ee51f-3b4e-43b4-a3b4-3b4ee51f0000',
  'bp-bn-t1a',
  'Use baseline report and health dashboard to rank pipeline elements by worst p90 duration',
  'Oct 24',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf23-2e8d-42e8-a2e8-2e8dbf230000',
  '3b4ee51f-3b4e-43b4-a3b4-3b4ee51f0000',
  'bp-bn-t1b',
  'Investigate each top candidate: is the slowness inherent, or is there a known fix?',
  'Oct 31',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf24-2e8d-42e8-a2e8-2e8dbf240000',
  '3b4ee51f-3b4e-43b4-a3b4-3b4ee51f0000',
  'bp-bn-t1c',
  'Select top 3 bottlenecks where remediation is feasible within Q4 scope',
  'Nov 7',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf25-2e8d-42e8-a2e8-2e8dbf250000',
  '3b4ee51f-3b4e-43b4-a3b4-3b4ee51f0000',
  'bp-bn-t1d',
  'Write a design doc for each remediation approach before starting work',
  'Nov 14',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Remediate top 3 bottlenecks and document results
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '3b4ee520-3b4e-43b4-a3b4-3b4ee5200000',
  '5a9b2eef-5a9b-45a9-a5a9-5a9b2eef0000',
  'bp-bn-t2',
  'Remediate top 3 bottlenecks and document results',
  'task',
  'Dec 31, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf41-2e8d-42e8-a2e8-2e8dbf410000',
  '3b4ee520-3b4e-43b4-a3b4-3b4ee5200000',
  'bp-bn-t2a',
  'Implement remediation #1 and measure before/after build time in DataDog',
  'Nov 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf42-2e8d-42e8-a2e8-2e8dbf420000',
  '3b4ee520-3b4e-43b4-a3b4-3b4ee5200000',
  'bp-bn-t2b',
  'Implement remediation #2 and measure before/after build time',
  'Dec 12',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf43-2e8d-42e8-a2e8-2e8dbf430000',
  '3b4ee520-3b4e-43b4-a3b4-3b4ee5200000',
  'bp-bn-t2c',
  'Implement remediation #3 and measure before/after build time',
  'Dec 19',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '2e8dbf44-2e8d-42e8-a2e8-2e8dbf440000',
  '3b4ee520-3b4e-43b4-a3b4-3b4ee5200000',
  'bp-bn-t2d',
  'Publish remediation report: what changed, measured impact, and lessons learned',
  'Dec 31',
  3,
  NOW(),
  NOW()
);



-- ============================================
-- Project: Expand Knowledge on Technical Stack & Codebase
-- ============================================

-- Insert Project: Expand Knowledge on Technical Stack & Codebase
INSERT INTO projects (id, roadmap_id, project_id, title, subtitle, color, icon, wiki_url, position, created_at, updated_at)
VALUES (
  '5c61687e-5c61-45c6-a5c6-5c61687e0000',
  '3e50f1a9-3e50-43e5-a3e5-3e50f1a90000',
  'knowledge',
  'Expand Knowledge on Technical Stack & Codebase',
  'Architectural map, codebase index, and documentation coverage for the full CI/build ecosystem',
  '#8B5CF6',
  NULL,
  'https://wizardsofthecoast.atlassian.net/wiki/spaces/~bodewec/pages/412715769',
  3,
  NOW(),
  NOW()
);

-- Insert Pillar: Q1: Core System Flow & Index Foundation
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '25675637-2567-4256-a256-256756370000',
  '5c61687e-5c61-45c6-a5c6-5c61687e0000',
  'kn-core',
  'Q1: Core System Flow & Index Foundation',
  'Map the big picture before diving into details',
  '🗺️',
  '#8B5CF6',
  0,
  NOW(),
  NOW()
);

-- Insert Initiative: High-Level CI Flow Diagram & System Index
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '3d8ec3cb-3d8e-43d8-a3d8-3d8ec3cb0000',
  '25675637-2567-4256-a256-256756370000',
  'kn-ci-flow',
  'High-Level CI Flow Diagram & System Index',
  'Create an index of all existing projects with a broad outline and main links. Complete a high-level CI flow diagram covering major build and release paths. Identify all primary system components.',
  'Pipeline Engineer',
  'Apr 30, 2026',
  ARRAY['Q1'],
  '["Project index published with one-sentence descriptions for every known pipeline repo","All primary system components identified (Jenkins, SCM, artifact storage, monitoring, deploy targets)","High-level CI flow diagram completed covering major build and release paths","Authentication paths between components mapped"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Architecture Diagramming & CI System Concepts
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '2a17d27c-2a17-42a1-a2a1-2a17d27c0000',
  '3d8ec3cb-3d8e-43d8-a3d8-3d8ec3cb0000',
  'kn-cf-learn',
  'Learning: Architecture Diagramming & CI System Concepts',
  'learning',
  'Feb 14, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '78777605-7877-4787-a787-787776050000',
  '2a17d27c-2a17-42a1-a2a1-2a17d27c0000',
  'kn-cf-l1',
  'Read about C4 model for software architecture diagrams — understand Context, Container, Component levels',
  'Feb 7',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '78777606-7877-4787-a787-787776060000',
  '2a17d27c-2a17-42a1-a2a1-2a17d27c0000',
  'kn-cf-l2',
  'Study Mermaid.js or draw.io for creating CI flow diagrams in Confluence/wiki',
  'Feb 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '78777607-7877-4787-a787-787776070000',
  '2a17d27c-2a17-42a1-a2a1-2a17d27c0000',
  'kn-cf-l3',
  'Read an overview of how CI/CD systems are typically architected: SCM → CI → artifact store → deploy',
  'Feb 14',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '78777608-7877-4787-a787-787776080000',
  '2a17d27c-2a17-42a1-a2a1-2a17d27c0000',
  'kn-cf-l4',
  'Review the team wiki for any existing architecture docs or diagrams as a starting point',
  'Feb 14',
  3,
  NOW(),
  NOW()
);

-- Insert Task: Create the project index
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '787776fd-7877-4787-a787-787776fd0000',
  '3d8ec3cb-3d8e-43d8-a3d8-3d8ec3cb0000',
  'kn-cf-t1',
  'Create the project index',
  'task',
  'Mar 14, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896fc-6988-4698-a698-698896fc0000',
  '787776fd-7877-4787-a787-787776fd0000',
  'kn-cf-t1a',
  'List every known Jenkins pipeline repo and shared library with its repo URL',
  'Feb 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896fb-6988-4698-a698-698896fb0000',
  '787776fd-7877-4787-a787-787776fd0000',
  'kn-cf-t1b',
  'For each project, write a one-sentence description of its purpose',
  'Mar 7',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896fa-6988-4698-a698-698896fa0000',
  '787776fd-7877-4787-a787-787776fd0000',
  'kn-cf-t1c',
  'Publish the initial project index to team wiki as a living document',
  'Mar 14',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Draw the high-level CI flow diagram
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '787776fe-7877-4787-a787-787776fe0000',
  '3d8ec3cb-3d8e-43d8-a3d8-3d8ec3cb0000',
  'kn-cf-t2',
  'Draw the high-level CI flow diagram',
  'task',
  'Apr 30, 2026',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896dd-6988-4698-a698-698896dd0000',
  '787776fe-7877-4787-a787-787776fe0000',
  'kn-cf-t2a',
  'Identify all primary system components: Jenkins, SCM (GitHub/GitLab), artifact storage (Nexus/Artifactory), monitoring (DataDog), deployment targets',
  'Mar 28',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896dc-6988-4698-a698-698896dc0000',
  '787776fe-7877-4787-a787-787776fe0000',
  'kn-cf-t2b',
  'Map authentication paths between components (service accounts, tokens, SSH keys)',
  'Apr 4',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896db-6988-4698-a698-698896db0000',
  '787776fe-7877-4787-a787-787776fe0000',
  'kn-cf-t2c',
  'Draw the major build flow: code push → CI trigger → build stages → artifact publish → deploy',
  'Apr 11',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896da-6988-4698-a698-698896da0000',
  '787776fe-7877-4787-a787-787776fe0000',
  'kn-cf-t2d',
  'Draw the major release flow separately, noting differences from the build flow',
  'Apr 18',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '698896d9-6988-4698-a698-698896d90000',
  '787776fe-7877-4787-a787-787776fe0000',
  'kn-cf-t2e',
  'Publish the completed CI flow diagram to team wiki and get review from a senior team member',
  'Apr 30',
  4,
  NOW(),
  NOW()
);


-- Insert Pillar: Q2: Technical Stack Documentation & Top 20% Projects
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '79600d9e-7960-4796-a796-79600d9e0000',
  '5c61687e-5c61-45c6-a5c6-5c61687e0000',
  'kn-stack',
  'Q2: Technical Stack Documentation & Top 20% Projects',
  'Document getting started steps and prioritize the most important projects',
  '📚',
  '#7C3AED',
  1,
  NOW(),
  NOW()
);

-- Insert Initiative: Technical Stack Documentation
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '5e18f6f6-5e18-45e1-a5e1-5e18f6f60000',
  '79600d9e-7960-4796-a796-79600d9e0000',
  'kn-stack-docs',
  'Technical Stack Documentation',
  'Document all technical stack areas based on system components. Each area should have getting started steps, technical requirements, and how-to-test details.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q2'],
  '["Getting started guide published for each primary system component","Technical requirements listed for each component","How-to-test section included for each component","All docs versioned in wiki or Docs-as-Code repo"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Technical Writing & Getting Started Guide Best Practices
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '15d17b0e-15d1-415d-a15d-15d17b0e0000',
  '5e18f6f6-5e18-45e1-a5e1-5e18f6f60000',
  'kn-sd-learn',
  'Learning: Technical Writing & Getting Started Guide Best Practices',
  'learning',
  'May 16, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '79580557-7958-4795-a795-795805570000',
  '15d17b0e-15d1-415d-a15d-15d17b0e0000',
  'kn-sd-l1',
  'Read Google''s Technical Writing fundamentals course (free at developers.google.com/tech-writing)',
  'May 2',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '79580558-7958-4795-a795-795805580000',
  '15d17b0e-15d1-415d-a15d-15d17b0e0000',
  'kn-sd-l2',
  'Study what a good ''Getting Started'' guide looks like — find 2–3 examples from open source projects',
  'May 9',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '79580559-7958-4795-a795-795805590000',
  '15d17b0e-15d1-415d-a15d-15d17b0e0000',
  'kn-sd-l3',
  'Read about Docs-as-Code: treating documentation like source code (versioned, reviewed, tested)',
  'May 16',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Document each primary system component
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '7958064f-7958-4795-a795-7958064f0000',
  '5e18f6f6-5e18-45e1-a5e1-5e18f6f60000',
  'kn-sd-t1',
  'Document each primary system component',
  'task',
  'Jul 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e573c0e-4e57-44e5-a4e5-4e573c0e0000',
  '7958064f-7958-4795-a795-7958064f0000',
  'kn-sd-t1a',
  'Write a getting started page for Jenkins: how to access, authenticate, run a job, and view logs',
  'May 30',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e573c0d-4e57-44e5-a4e5-4e573c0d0000',
  '7958064f-7958-4795-a795-7958064f0000',
  'kn-sd-t1b',
  'Write a getting started page for the SCM system (GitHub/GitLab): branching, PR workflow, webhooks',
  'Jun 13',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e573c0c-4e57-44e5-a4e5-4e573c0c0000',
  '7958064f-7958-4795-a795-7958064f0000',
  'kn-sd-t1c',
  'Write a getting started page for artifact storage (Nexus/Artifactory): how to publish and consume artifacts',
  'Jun 27',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e573c0b-4e57-44e5-a4e5-4e573c0b0000',
  '7958064f-7958-4795-a795-7958064f0000',
  'kn-sd-t1d',
  'Write a getting started page for DataDog: how to access dashboards, set monitors, and read alerts',
  'Jul 11',
  3,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4e573c0a-4e57-44e5-a4e5-4e573c0a0000',
  '7958064f-7958-4795-a795-7958064f0000',
  'kn-sd-t1e',
  'Write a ''How to Test'' section for each component describing how to verify changes locally or in non-prod',
  'Jul 31',
  4,
  NOW(),
  NOW()
);

-- Insert Initiative: Top 20% Projects: Overview & Documentation Links
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '796c1169-796c-4796-a796-796c11690000',
  '79600d9e-7960-4796-a796-79600d9e0000',
  'kn-top20',
  'Top 20% Projects: Overview & Documentation Links',
  'Identify the top 20% of pipeline projects by importance/usage. Write an overview for each, link existing documentation, and note where documentation is missing.',
  'Pipeline Engineer',
  'Jul 31, 2026',
  ARRAY['Q2'],
  '["Top 20% of projects identified and ranked","Overview written for each top-20% project","Existing documentation linked from project index","Missing documentation flagged with ''Missing Docs'' labels"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Identify and rank the top 20% of projects
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '4f62a01e-4f62-44f6-a4f6-4f62a01e0000',
  '796c1169-796c-4796-a796-796c11690000',
  'kn-t20-t1',
  'Identify and rank the top 20% of projects',
  'task',
  'May 30, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '630e9cbf-630e-4630-a630-630e9cbf0000',
  '4f62a01e-4f62-44f6-a4f6-4f62a01e0000',
  'kn-t20-t1a',
  'Use Jenkins run frequency data and team feedback to rank all pipeline projects by importance',
  'May 16',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '630e9cc0-630e-4630-a630-630e9cc00000',
  '4f62a01e-4f62-44f6-a4f6-4f62a01e0000',
  'kn-t20-t1b',
  'Select the top 20% (roughly 1 in 5 projects) as priority documentation targets',
  'May 23',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '630e9cc1-630e-4630-a630-630e9cc10000',
  '4f62a01e-4f62-44f6-a4f6-4f62a01e0000',
  'kn-t20-t1c',
  'Publish the ranked project list to the team wiki',
  'May 30',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Write overviews and link docs for top 20%
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '4f62a01d-4f62-44f6-a4f6-4f62a01d0000',
  '796c1169-796c-4796-a796-796c11690000',
  'kn-t20-t2',
  'Write overviews and link docs for top 20%',
  'task',
  'Jul 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '630e9cde-630e-4630-a630-630e9cde0000',
  '4f62a01d-4f62-44f6-a4f6-4f62a01d0000',
  'kn-t20-t2a',
  'For each top-20% project, write a 3–5 sentence overview: purpose, inputs, outputs, consumers',
  'Jun 20',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '630e9cdf-630e-4630-a630-630e9cdf0000',
  '4f62a01d-4f62-44f6-a4f6-4f62a01d0000',
  'kn-t20-t2b',
  'Link all existing documentation (Confluence pages, README files, runbooks) from each project''s index entry',
  'Jul 11',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '630e9ce0-630e-4630-a630-630e9ce00000',
  '4f62a01d-4f62-44f6-a4f6-4f62a01d0000',
  'kn-t20-t2c',
  'Flag documentation gaps with a ''Missing Docs'' label in the index for each project',
  'Jul 31',
  2,
  NOW(),
  NOW()
);


-- Insert Pillar: Q3: Majority Coverage — 50%+ Projects & Stack Requirements
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '447cb17f-447c-4447-a447-447cb17f0000',
  '5c61687e-5c61-45c6-a5c6-5c61687e0000',
  'kn-majority',
  'Q3: Majority Coverage — 50%+ Projects & Stack Requirements',
  'Broaden documentation to cover the majority of the codebase',
  '🔬',
  '#6D28D9',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: 50%+ Projects Listed with Overviews
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '75d7ab7c-75d7-475d-a75d-75d7ab7c0000',
  '447cb17f-447c-4447-a447-447cb17f0000',
  'kn-50pct',
  '50%+ Projects Listed with Overviews',
  'Expand the project index to cover the majority of pipeline projects (50%+), each with existing and missing documentation noted.',
  'Pipeline Engineer',
  'Oct 31, 2026',
  ARRAY['Q3'],
  '["50%+ of pipeline projects listed in the index with overviews","Existing and missing documentation status noted for each","Project index coverage percentage updated and published","Most critical missing-doc gaps flagged for Q4"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Document the next tier of projects (20%–50%)
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '75d6b1c5-75d6-475d-a75d-75d6b1c50000',
  '75d7ab7c-75d7-475d-a75d-75d7ab7c0000',
  'kn-50-t1',
  'Document the next tier of projects (20%–50%)',
  'task',
  'Sep 26, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '44ff873c-44ff-444f-a44f-44ff873c0000',
  '75d6b1c5-75d6-475d-a75d-75d6b1c50000',
  'kn-50-t1a',
  'Work through the ranked project list from Q2, documenting projects from rank 21% to 50%',
  'Aug 29',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '44ff873d-44ff-444f-a44f-44ff873d0000',
  '75d6b1c5-75d6-475d-a75d-75d6b1c50000',
  'kn-50-t1b',
  'Write a 3–5 sentence overview for each project in this tier',
  'Sep 12',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '44ff873e-44ff-444f-a44f-44ff873e0000',
  '75d6b1c5-75d6-475d-a75d-75d6b1c50000',
  'kn-50-t1c',
  'Link existing docs and flag missing documentation for each project',
  'Sep 26',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Review and quality-check 50%+ coverage
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '75d6b1c6-75d6-475d-a75d-75d6b1c60000',
  '75d7ab7c-75d7-475d-a75d-75d7ab7c0000',
  'kn-50-t2',
  'Review and quality-check 50%+ coverage',
  'task',
  'Oct 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '44ff875b-44ff-444f-a44f-44ff875b0000',
  '75d6b1c6-75d6-475d-a75d-75d6b1c60000',
  'kn-50-t2a',
  'Verify that all projects at 50%+ coverage have at minimum an overview and a status (documented/partial/missing)',
  'Oct 10',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '44ff875c-44ff-444f-a44f-44ff875c0000',
  '75d6b1c6-75d6-475d-a75d-75d6b1c60000',
  'kn-50-t2b',
  'Update the project index to reflect current coverage percentage',
  'Oct 17',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '44ff875d-44ff-444f-a44f-44ff875d0000',
  '75d6b1c6-75d6-475d-a75d-75d6b1c60000',
  'kn-50-t2c',
  'Identify the most critical missing-doc gaps in the 50% covered set and flag for Q4 story work',
  'Oct 31',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Technical Stack Requirements per Project
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '06c5aba1-06c5-406c-a06c-06c5aba10000',
  '447cb17f-447c-4447-a447-447cb17f0000',
  'kn-stack-requirements',
  'Technical Stack Requirements per Project',
  'Identify and document the technical stack requirements for each existing project: language version, dependencies, plugins, credentials, and environment assumptions.',
  'Pipeline Engineer',
  'Oct 31, 2026',
  ARRAY['Q3'],
  '["Technical stack requirements documented for all projects in the index","Required credentials/env vars listed by name for each project","Environment assumptions noted for each project","Stack requirements section published in wiki"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Dependency Management & Environment Documentation
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '313a3d80-313a-4313-a313-313a3d800000',
  '06c5aba1-06c5-406c-a06c-06c5aba10000',
  'kn-sr-learn',
  'Learning: Dependency Management & Environment Documentation',
  'learning',
  'Aug 22, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '795e6289-795e-4795-a795-795e62890000',
  '313a3d80-313a-4313-a313-313a3d800000',
  'kn-sr-l1',
  'Read about dependency pinning best practices — why floating versions cause build instability',
  'Aug 8',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '795e628a-795e-4795-a795-795e628a0000',
  '313a3d80-313a-4313-a313-313a3d800000',
  'kn-sr-l2',
  'Study how to read and interpret a Gradle dependency tree (`gradle dependencies`)',
  'Aug 15',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '795e628b-795e-4795-a795-795e628b0000',
  '313a3d80-313a-4313-a313-313a3d800000',
  'kn-sr-l3',
  'Read about environment variable and credential documentation standards',
  'Aug 22',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Document stack requirements for all indexed projects
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '795e6381-795e-4795-a795-795e63810000',
  '06c5aba1-06c5-406c-a06c-06c5aba10000',
  'kn-sr-t1',
  'Document stack requirements for all indexed projects',
  'task',
  'Oct 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4d91f300-4d91-44d9-a4d9-4d91f3000000',
  '795e6381-795e-4795-a795-795e63810000',
  'kn-sr-t1a',
  'For each project in the index, list: required JDK/language version, Gradle version, key plugins',
  'Sep 19',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4d91f2ff-4d91-44d9-a4d9-4d91f2ff0000',
  '795e6381-795e-4795-a795-795e63810000',
  'kn-sr-t1b',
  'List required credentials and environment variables (names only, not values) for each project',
  'Oct 3',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4d91f2fe-4d91-44d9-a4d9-4d91f2fe0000',
  '795e6381-795e-4795-a795-795e63810000',
  'kn-sr-t1c',
  'Note any known environment assumptions (specific OS, network access, agent label requirements)',
  'Oct 17',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '4d91f2fd-4d91-44d9-a4d9-4d91f2fd0000',
  '795e6381-795e-4795-a795-795e63810000',
  'kn-sr-t1d',
  'Publish updated stack requirements to each project''s index entry',
  'Oct 31',
  3,
  NOW(),
  NOW()
);


-- Insert Pillar: Q4: Complete Coverage & Missing Documentation Story Work
INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)
VALUES (
  '1f720663-1f72-41f7-a1f7-1f7206630000',
  '5c61687e-5c61-45c6-a5c6-5c61687e0000',
  'kn-complete',
  'Q4: Complete Coverage & Missing Documentation Story Work',
  'Finish the index and create story work for all documentation gaps',
  '✅',
  '#5B21B6',
  3,
  NOW(),
  NOW()
);

-- Insert Initiative: Remaining Projects — Full Index Coverage
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '56467e0c-5646-4564-a564-56467e0c0000',
  '1f720663-1f72-41f7-a1f7-1f7206630000',
  'kn-remaining',
  'Remaining Projects — Full Index Coverage',
  'Document all remaining pipeline projects so that 100% of the codebase has at least an overview entry in the index.',
  'Pipeline Engineer',
  'Dec 31, 2026',
  ARRAY['Q4'],
  '["100% of pipeline projects have at least an overview entry in the index","Documentation status (Full/Partial/Overview Only/Missing) set for every project","Complete project index published to team wiki","Coverage summary published in end-of-year retrospective"]'::jsonb,
  0,
  NOW(),
  NOW()
);

-- Insert Task: Document remaining 50% of projects
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '4fe1e806-4fe1-44fe-a4fe-4fe1e8060000',
  '56467e0c-5646-4564-a564-56467e0c0000',
  'kn-rem-t1',
  'Document remaining 50% of projects',
  'task',
  'Nov 28, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '53a4e7a7-53a4-453a-a53a-53a4e7a70000',
  '4fe1e806-4fe1-44fe-a4fe-4fe1e8060000',
  'kn-rem-t1a',
  'Work through all projects not yet covered and write at least a brief overview for each',
  'Oct 31',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '53a4e7a8-53a4-453a-a53a-53a4e7a80000',
  '4fe1e806-4fe1-44fe-a4fe-4fe1e8060000',
  'kn-rem-t1b',
  'Link any existing READMEs, Confluence pages, or runbooks found during this pass',
  'Nov 14',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '53a4e7a9-53a4-453a-a53a-53a4e7a90000',
  '4fe1e806-4fe1-44fe-a4fe-4fe1e8060000',
  'kn-rem-t1c',
  'Mark documentation status for every project: Full / Partial / Overview Only / Missing',
  'Nov 28',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Publish final project index and coverage report
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '4fe1e805-4fe1-44fe-a4fe-4fe1e8050000',
  '56467e0c-5646-4564-a564-56467e0c0000',
  'kn-rem-t2',
  'Publish final project index and coverage report',
  'task',
  'Dec 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '53a4e7c6-53a4-453a-a53a-53a4e7c60000',
  '4fe1e805-4fe1-44fe-a4fe-4fe1e8050000',
  'kn-rem-t2a',
  'Publish the complete project index to team wiki with all entries filled in',
  'Dec 12',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '53a4e7c7-53a4-453a-a53a-53a4e7c70000',
  '4fe1e805-4fe1-44fe-a4fe-4fe1e8050000',
  'kn-rem-t2b',
  'Write a coverage summary: how many projects are at each documentation status level',
  'Dec 19',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '53a4e7c8-53a4-453a-a53a-53a4e7c80000',
  '4fe1e805-4fe1-44fe-a4fe-4fe1e8050000',
  'kn-rem-t2c',
  'Publish the coverage summary as part of the end-of-year engineering retrospective doc',
  'Dec 31',
  2,
  NOW(),
  NOW()
);

-- Insert Initiative: Missing Documentation Story Work
INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)
VALUES (
  '6647bef2-6647-4664-a664-6647bef20000',
  '1f720663-1f72-41f7-a1f7-1f7206630000',
  'kn-gap-stories',
  'Missing Documentation Story Work',
  'Write Jira story work for all identified documentation gaps and missing coverage areas so they are planned for and addressable in the next cycle.',
  'Pipeline Engineer',
  'Dec 31, 2026',
  ARRAY['Q4'],
  '["Jira epic created for all documentation gaps","Every missing-doc gap has a written story with acceptance criteria","All stories estimated with complexity tiers","Top 10 highest-priority stories in ''Ready'' state on the board"]'::jsonb,
  1,
  NOW(),
  NOW()
);

-- Insert Task: Learning: Writing Documentation Stories & Estimating Doc Debt
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '251de34d-251d-4251-a251-251de34d0000',
  '6647bef2-6647-4664-a664-6647bef20000',
  'kn-gs-learn',
  'Learning: Writing Documentation Stories & Estimating Doc Debt',
  'learning',
  'Oct 17, 2026',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '78b5bcdc-78b5-478b-a78b-78b5bcdc0000',
  '251de34d-251d-4251-a251-251de34d0000',
  'kn-gs-l1',
  'Read about how to write actionable documentation stories: what makes a doc story ''done''?',
  'Oct 3',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '78b5bcdd-78b5-478b-a78b-78b5bcdd0000',
  '251de34d-251d-4251-a251-251de34d0000',
  'kn-gs-l2',
  'Study how teams estimate documentation effort — time-boxing by complexity tier (small/medium/large)',
  'Oct 10',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '78b5bcde-78b5-478b-a78b-78b5bcde0000',
  '251de34d-251d-4251-a251-251de34d0000',
  'kn-gs-l3',
  'Read about doc debt: how to triage and prioritize missing documentation by risk and impact',
  'Oct 17',
  2,
  NOW(),
  NOW()
);

-- Insert Task: Write Jira stories for all documentation gaps
INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)
VALUES (
  '78b5bdd4-78b5-478b-a78b-78b5bdd40000',
  '6647bef2-6647-4664-a664-6647bef20000',
  'kn-gs-t1',
  'Write Jira stories for all documentation gaps',
  'task',
  'Dec 31, 2026',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '61fe02f3-61fe-461f-a61f-61fe02f30000',
  '78b5bdd4-78b5-478b-a78b-78b5bdd40000',
  'kn-gs-t1a',
  'Collect all ''Missing Docs'' flags from the project index into a single Jira epic',
  'Nov 14',
  0,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '61fe02f2-61fe-461f-a61f-61fe02f20000',
  '78b5bdd4-78b5-478b-a78b-78b5bdd40000',
  'kn-gs-t1b',
  'Write one Jira story per documentation gap with: what''s missing, why it matters, and acceptance criteria',
  'Nov 28',
  1,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '61fe02f1-61fe-461f-a61f-61fe02f10000',
  '78b5bdd4-78b5-478b-a78b-78b5bdd40000',
  'kn-gs-t1c',
  'Estimate each story using complexity tiers (S/M/L)',
  'Dec 12',
  2,
  NOW(),
  NOW()
);

INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)
VALUES (
  '61fe02f0-61fe-461f-a61f-61fe02f00000',
  '78b5bdd4-78b5-478b-a78b-78b5bdd40000',
  'kn-gs-t1d',
  'Prioritize the top 10 stories by risk/impact and move them to ''Ready'' on the board',
  'Dec 31',
  3,
  NOW(),
  NOW()
);



-- Commit transaction
COMMIT;

-- ============================================
-- Migration Complete
-- ============================================
-- Total Projects: 4
-- Total Pillars: 12
-- Total Initiatives: 29
-- Total Tasks: 89