import { ALL_PROJECTS } from '../src/data/projects';
import * as fs from 'fs';

// Helper function to escape SQL strings
function escapeSql(str: string | undefined): string {
  if (!str) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
}

// Helper to generate UUID v4 format (deterministic based on ID)
function generateUuid(id: string): string {
  // Create a deterministic UUID from the string ID
  // In production, use actual UUIDs, but for migration we want consistency
  const hash = id.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0) | 0;
  }, 0);

  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex.slice(0, 8)}-${hex.slice(0, 4)}-4${hex.slice(0, 3)}-a${hex.slice(0, 3)}-${hex.slice(0, 12).padEnd(12, '0')}`;
}

// Generate SQL INSERT statements
function generateSeedSql(): string {
  const sql: string[] = [];

  sql.push('-- ============================================');
  sql.push('-- Seed Data Migration from projects.ts');
  sql.push('-- Generated: ' + new Date().toISOString());
  sql.push('-- ============================================\n');

  sql.push('-- This script assumes you have a user account created.');
  sql.push('-- IMPORTANT: Replace ALL instances of YOUR_USER_ID_HERE with your actual auth.users UUID\n');

  sql.push("-- Get your user ID by running: SELECT id FROM auth.users WHERE email = 'your-email@example.com';\n");

  sql.push('-- Start transaction');
  sql.push('BEGIN;\n');

  // Create roadmap
  const roadmapId = generateUuid('jenkins-roadmap');
  sql.push('-- Insert Roadmap');
  sql.push(`INSERT INTO roadmaps (id, user_id, name, created_at, updated_at)`);
  sql.push(`VALUES ('${roadmapId}', 'YOUR_USER_ID_HERE', 'Jenkins Engineering Roadmap', NOW(), NOW());\n`);

  let projectPosition = 0;

  // Iterate through all projects
  for (const project of ALL_PROJECTS) {
    sql.push(`-- ============================================`);
    sql.push(`-- Project: ${project.title}`);
    sql.push(`-- ============================================\n`);

    const projectUuid = generateUuid(project.id);

    // Insert project
    sql.push(`-- Insert Project: ${project.title}`);
    sql.push(`INSERT INTO projects (id, roadmap_id, project_id, title, subtitle, color, icon, wiki_url, position, created_at, updated_at)`);
    sql.push(`VALUES (`);
    sql.push(`  '${projectUuid}',`);
    sql.push(`  '${roadmapId}',`);
    sql.push(`  ${escapeSql(project.id)},`);
    sql.push(`  ${escapeSql(project.title)},`);
    sql.push(`  ${escapeSql(project.subtitle)},`);
    sql.push(`  ${escapeSql(project.color)},`);
    sql.push(`  NULL,`); // icon
    sql.push(`  ${escapeSql(project.wikiUrl)},`);
    sql.push(`  ${projectPosition},`);
    sql.push(`  NOW(),`);
    sql.push(`  NOW()`);
    sql.push(`);\n`);

    projectPosition++;

    let pillarPosition = 0;

    // Iterate through pillars
    for (const pillar of project.pillars) {
      const pillarUuid = generateUuid(pillar.id);

      sql.push(`-- Insert Pillar: ${pillar.title}`);
      sql.push(`INSERT INTO pillars (id, project_id, pillar_id, title, subtitle, icon, color, position, created_at, updated_at)`);
      sql.push(`VALUES (`);
      sql.push(`  '${pillarUuid}',`);
      sql.push(`  '${projectUuid}',`);
      sql.push(`  ${escapeSql(pillar.id)},`);
      sql.push(`  ${escapeSql(pillar.title)},`);
      sql.push(`  ${escapeSql(pillar.subtitle)},`);
      sql.push(`  ${escapeSql(pillar.icon)},`);
      sql.push(`  ${escapeSql(pillar.color)},`);
      sql.push(`  ${pillarPosition},`);
      sql.push(`  NOW(),`);
      sql.push(`  NOW()`);
      sql.push(`);\n`);

      pillarPosition++;

      let initiativePosition = 0;

      // Iterate through initiatives
      for (const initiative of pillar.initiatives) {
        const initiativeUuid = generateUuid(initiative.id);

        // Convert acceptance array to JSON
        const acceptanceJson = JSON.stringify(initiative.acceptance).replace(/'/g, "''");
        const quartersArray = `ARRAY[${initiative.quarters.map(q => `'${q}'`).join(', ')}]`;

        sql.push(`-- Insert Initiative: ${initiative.title}`);
        sql.push(`INSERT INTO initiatives (id, pillar_id, initiative_id, title, description, owner, due_date, quarters, acceptance, position, created_at, updated_at)`);
        sql.push(`VALUES (`);
        sql.push(`  '${initiativeUuid}',`);
        sql.push(`  '${pillarUuid}',`);
        sql.push(`  ${escapeSql(initiative.id)},`);
        sql.push(`  ${escapeSql(initiative.title)},`);
        sql.push(`  ${escapeSql(initiative.description)},`);
        sql.push(`  ${escapeSql(initiative.owner)},`);
        sql.push(`  ${escapeSql(initiative.dueDate)},`);
        sql.push(`  ${quartersArray},`);
        sql.push(`  '${acceptanceJson}'::jsonb,`);
        sql.push(`  ${initiativePosition},`);
        sql.push(`  NOW(),`);
        sql.push(`  NOW()`);
        sql.push(`);\n`);

        initiativePosition++;

        let taskPosition = 0;

        // Iterate through tasks
        for (const task of initiative.tasks) {
          const taskUuid = generateUuid(task.id);

          sql.push(`-- Insert Task: ${task.title}`);
          sql.push(`INSERT INTO tasks (id, initiative_id, task_id, title, type, due, position, created_at, updated_at)`);
          sql.push(`VALUES (`);
          sql.push(`  '${taskUuid}',`);
          sql.push(`  '${initiativeUuid}',`);
          sql.push(`  ${escapeSql(task.id)},`);
          sql.push(`  ${escapeSql(task.title)},`);
          sql.push(`  ${escapeSql(task.type)},`);
          sql.push(`  ${escapeSql(task.due)},`);
          sql.push(`  ${taskPosition},`);
          sql.push(`  NOW(),`);
          sql.push(`  NOW()`);
          sql.push(`);\n`);

          taskPosition++;

          let subtaskPosition = 0;

          // Iterate through subtasks
          for (const subtask of task.subtasks) {
            const subtaskUuid = generateUuid(subtask.id);

            sql.push(`INSERT INTO subtasks (id, task_id, subtask_id, text, due, position, created_at, updated_at)`);
            sql.push(`VALUES (`);
            sql.push(`  '${subtaskUuid}',`);
            sql.push(`  '${taskUuid}',`);
            sql.push(`  ${escapeSql(subtask.id)},`);
            sql.push(`  ${escapeSql(subtask.text)},`);
            sql.push(`  ${escapeSql(subtask.due)},`);
            sql.push(`  ${subtaskPosition},`);
            sql.push(`  NOW(),`);
            sql.push(`  NOW()`);
            sql.push(`);\n`);

            subtaskPosition++;
          }
        }
      }

      sql.push(''); // Empty line between pillars
    }

    sql.push(''); // Empty line between projects
  }

  sql.push('-- Commit transaction');
  sql.push('COMMIT;\n');

  sql.push('-- ============================================');
  sql.push('-- Migration Complete');
  sql.push('-- ============================================');
  sql.push(`-- Total Projects: ${ALL_PROJECTS.length}`);
  sql.push(`-- Total Pillars: ${ALL_PROJECTS.reduce((sum, p) => sum + p.pillars.length, 0)}`);
  sql.push(`-- Total Initiatives: ${ALL_PROJECTS.reduce((sum, p) => sum + p.pillars.reduce((s, pl) => s + pl.initiatives.length, 0), 0)}`);
  sql.push(`-- Total Tasks: ${ALL_PROJECTS.reduce((sum, p) => sum + p.pillars.reduce((s, pl) => s + pl.initiatives.reduce((si, i) => si + i.tasks.length, 0), 0), 0)}`);

  return sql.join('\n');
}

// Main execution
const sqlContent = generateSeedSql();
const outputPath = './supabase/seed-data.sql';

fs.writeFileSync(outputPath, sqlContent, 'utf-8');

console.log(`✅ Seed data SQL generated successfully!`);
console.log(`📄 Output file: ${outputPath}`);
console.log(`\n📋 Next steps:`);
console.log(`1. Get your user ID from Supabase:`);
console.log(`   SELECT id FROM auth.users WHERE email = 'your-email@example.com';`);
console.log(`2. Replace 'YOUR_USER_ID' in seed-data.sql with your actual user ID`);
console.log(`3. Run the SQL script in Supabase SQL Editor`);
