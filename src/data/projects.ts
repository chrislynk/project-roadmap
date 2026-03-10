// ─────────────────────────────────────────────────────────────────────────────
// TYPESCRIPT INTERFACES
// ─────────────────────────────────────────────────────────────────────────────

export interface Subtask {
  id: string;
  text: string;
  due?: string;
}

export interface Task {
  id: string;
  type: "learning" | "task";
  title: string;
  due: string;
  subtasks: Subtask[];
}

export interface Initiative {
  id: string;
  title: string;
  quarters: string[];
  dueDate: string;
  description: string;
  owner: string;
  tasks: Task[];
  acceptance: string[];
}

export interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  initiatives: Initiative[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  wikiUrl?: string;
  pillars: Pillar[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────────────────────────────────────

const testingProject: Project = {
  id: "testing",
  title: "Testing & Testability Roadmap",
  subtitle: "Pipeline testing foundations and path to unit testability",
  color: "#00C2A8",
  pillars: [
    {
      id: "initial-testing", title: "Initial Testing", subtitle: "Quick wins & visible progress", color: "#00C2A8", icon: "⚡",
      initiatives: [
        {
          id: "gradle-verification", title: "Gradle Verification", quarters: ["Q1"], dueDate: "Apr 30, 2025",
          description: "Develop and implement Gradle check testing locally to establish a baseline validation layer for all pipeline jobs.",
          owner: "Pipeline / DevOps Engineer",
          tasks: [
            { id: "gv-learn", type: "learning", title: "Learning: Gradle Fundamentals", due: "Feb 14, 2025", subtasks: [
              { id: "gv-l1", text: "Read the official Gradle Getting Started guide (docs.gradle.org)", due: "Feb 7" },
              { id: "gv-l2", text: "Watch: 'Gradle for Java Developers' intro video (Gradle YouTube channel)", due: "Feb 7" },
              { id: "gv-l3", text: "Learn what `gradle check` does vs `gradle build` — read Gradle Lifecycle docs", due: "Feb 14" },
              { id: "gv-l4", text: "Read about Gradle Wrapper (gradlew) and why it locks version consistency", due: "Feb 14" },
              { id: "gv-l5", text: "Read intro to Groovy/Kotlin DSL in Gradle build scripts", due: "Feb 14" },
            ]},
            { id: "gv-t1", type: "task", title: "Audit existing Gradle build scripts", due: "Feb 28, 2025", subtasks: [
              { id: "gv-t1a", text: "List all pipeline job repos and locate their build.gradle files", due: "Feb 21" },
              { id: "gv-t1b", text: "Document what tasks each build script currently defines", due: "Feb 21" },
              { id: "gv-t1c", text: "Note which repos are missing a Gradle wrapper (gradlew)", due: "Feb 28" },
            ]},
            { id: "gv-t2", type: "task", title: "Configure `gradle check` task suite locally", due: "Mar 21, 2025", subtasks: [
              { id: "gv-t2a", text: "Add or verify checkstyle plugin is configured in each build.gradle", due: "Mar 7" },
              { id: "gv-t2b", text: "Add static analysis tool (e.g., SpotBugs or CodeNarc for Groovy)", due: "Mar 14" },
              { id: "gv-t2c", text: "Run `gradle check` locally and capture full output log", due: "Mar 14" },
              { id: "gv-t2d", text: "Triage failures: categorize as 'fix now', 'fix later', or 'false positive'", due: "Mar 21" },
            ]},
            { id: "gv-t3", type: "task", title: "Integrate Gradle Wrapper and document setup", due: "Apr 11, 2025", subtasks: [
              { id: "gv-t3a", text: "Run `gradle wrapper` to generate gradlew for any repos missing it", due: "Mar 28" },
              { id: "gv-t3b", text: "Commit gradlew and gradle/wrapper/* files to each repo", due: "Apr 4" },
              { id: "gv-t3c", text: "Write setup documentation: required JDK version, how to run checks, how to add new rules", due: "Apr 11" },
            ]},
            { id: "gv-t4", type: "task", title: "Resolve critical failures and publish findings", due: "Apr 30, 2025", subtasks: [
              { id: "gv-t4a", text: "Fix all 'fix now' failures identified in triage", due: "Apr 18" },
              { id: "gv-t4b", text: "Create backlog tickets for 'fix later' items", due: "Apr 25" },
              { id: "gv-t4c", text: "Publish documentation to team wiki", due: "Apr 30" },
            ]},
          ],
          acceptance: ["`gradle check` runs end-to-end locally with zero setup ambiguity","All critical failures are resolved or tracked in backlog","Gradle wrapper committed to all repos","Documentation published to team wiki"],
        },
        {
          id: "checkin-testing", title: "Check-in Testing", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Automate Gradle checks and valid pipeline step verification on every code check-in to enforce code integrity before merging.",
          owner: "DevOps / CI Engineer",
          tasks: [
            { id: "ct-learn", type: "learning", title: "Learning: CI/CD Pipeline Concepts & Jenkins", due: "Mar 14, 2025", subtasks: [
              { id: "ct-l1", text: "Read: 'What is CI/CD?' — Atlassian CI/CD overview article", due: "Feb 28" },
              { id: "ct-l2", text: "Study Jenkins Pipeline documentation: Declarative vs Scripted pipelines", due: "Mar 7" },
              { id: "ct-l3", text: "Learn about Webhooks: how GitHub/GitLab triggers Jenkins on push/PR", due: "Mar 7" },
              { id: "ct-l4", text: "Read about branch protection rules in GitHub/GitLab docs", due: "Mar 14" },
              { id: "ct-l5", text: "Study Jenkins 'when' directives and stage conditions in Jenkinsfile", due: "Mar 14" },
            ]},
            { id: "ct-t1", type: "task", title: "Define pipeline gates and merge eligibility rules", due: "Apr 11, 2025", subtasks: [
              { id: "ct-t1a", text: "List the minimum required stages a pipeline job must pass before merge", due: "Mar 28" },
              { id: "ct-t1b", text: "Identify which checks are blocking (fail = no merge) vs advisory", due: "Apr 4" },
              { id: "ct-t1c", text: "Document the gate rules in a shared decision doc for team review", due: "Apr 11" },
            ]},
            { id: "ct-t2", type: "task", title: "Configure Jenkins webhook triggers on check-in", due: "May 30, 2025", subtasks: [
              { id: "ct-t2a", text: "Set up or verify webhook from source control to Jenkins", due: "May 9" },
              { id: "ct-t2b", text: "Configure Jenkins job to trigger on PR open and push-to-PR events", due: "May 16" },
              { id: "ct-t2c", text: "Test trigger end-to-end: open a test PR and confirm Jenkins job fires", due: "May 23" },
              { id: "ct-t2d", text: "Document the webhook configuration steps for future reference", due: "May 30" },
            ]},
            { id: "ct-t3", type: "task", title: "Add Gradle check as a mandatory pre-merge CI stage", due: "Jun 27, 2025", subtasks: [
              { id: "ct-t3a", text: "Add a `gradleCheck` stage to the Jenkinsfile pipeline definition", due: "Jun 6" },
              { id: "ct-t3b", text: "Confirm stage fails the pipeline (exit code != 0) on Gradle errors", due: "Jun 13" },
              { id: "ct-t3c", text: "Verify pipeline status is reported back to the PR as a required check", due: "Jun 20" },
              { id: "ct-t3d", text: "Enable branch protection rule to block merge if check fails", due: "Jun 27" },
            ]},
            { id: "ct-t4", type: "task", title: "Write pipeline step validation and create runbook", due: "Jul 31, 2025", subtasks: [
              { id: "ct-t4a", text: "Write a validation script that checks Jenkinsfile for required stage names", due: "Jul 11" },
              { id: "ct-t4b", text: "Add validation as an early pipeline stage (fail fast on malformed jobs)", due: "Jul 18" },
              { id: "ct-t4c", text: "Write runbook: common CI gate failure causes and how to resolve them", due: "Jul 25" },
              { id: "ct-t4d", text: "Final review: run a full PR flow and confirm all gates work end-to-end", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Every PR triggers CI automatically within 2 minutes","Merges are blocked if Gradle check fails","Pipeline step validation catches missing or malformed stages","Runbook published and findable by the team"],
        },
        {
          id: "style-testing", title: "Style Testing", quarters: ["Q2","Q3"], dueDate: "Oct 31, 2025",
          description: "Integrate best-practice style warnings into the pipeline to surface code quality recommendations without hard-blocking merges.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "st-learn", type: "learning", title: "Learning: Linting, Code Style & Static Analysis", due: "May 30, 2025", subtasks: [
              { id: "st-l1", text: "Read: What is a linter and why does code style matter? (ESLint docs intro, CodeNarc docs)", due: "May 16" },
              { id: "st-l2", text: "Study CodeNarc: the Groovy/pipeline linter — read its rule catalog overview", due: "May 23" },
              { id: "st-l3", text: "Understand the difference between errors (blocking) vs warnings (advisory) in CI", due: "May 23" },
              { id: "st-l4", text: "Read about how to configure a CodeNarc ruleset file (.groovy or XML)", due: "May 30" },
              { id: "st-l5", text: "Study how Jenkins can post lint annotations on PRs (Warnings Next Generation plugin)", due: "May 30" },
            ]},
            { id: "st-t1", type: "task", title: "Select linter and define initial ruleset", due: "Jun 27, 2025", subtasks: [
              { id: "st-t1a", text: "Evaluate CodeNarc vs alternatives; document decision rationale", due: "Jun 6" },
              { id: "st-t1b", text: "Run CodeNarc on existing pipeline code to see baseline violation count", due: "Jun 13" },
              { id: "st-t1c", text: "Select an initial ruleset of 5–10 rules that are high-value and low false-positive", due: "Jun 20" },
              { id: "st-t1d", text: "Document selected rules with rationale in team style guide", due: "Jun 27" },
            ]},
            { id: "st-t2", type: "task", title: "Integrate linter as non-blocking CI stage", due: "Aug 29, 2025", subtasks: [
              { id: "st-t2a", text: "Add CodeNarc as a pipeline stage with `continueOnFailure: true`", due: "Aug 8" },
              { id: "st-t2b", text: "Configure Jenkins Warnings Next Generation plugin to parse CodeNarc output", due: "Aug 15" },
              { id: "st-t2c", text: "Ensure warnings appear as PR annotations, not pipeline failures", due: "Aug 22" },
              { id: "st-t2d", text: "Test with a deliberately bad Groovy file to confirm warnings surface correctly", due: "Aug 29" },
            ]},
            { id: "st-t3", type: "task", title: "Publish style guide and establish expansion cadence", due: "Oct 31, 2025", subtasks: [
              { id: "st-t3a", text: "Write and publish the pipeline style guide to team wiki", due: "Sep 19" },
              { id: "st-t3b", text: "Version the CodeNarc ruleset file in source control", due: "Sep 26" },
              { id: "st-t3c", text: "Tune false-positive rules based on first 4 weeks of warnings data", due: "Oct 17" },
              { id: "st-t3d", text: "Document the process for proposing and adding new rules", due: "Oct 31" },
            ]},
          ],
          acceptance: ["Linter runs on every PR and posts warnings as annotations","No merges are hard-blocked by style warnings in initial rollout","Ruleset is documented and versioned in source control","Style guide published to team wiki"],
        },
      ],
    },
    {
      id: "unit-testability", title: "Unit Testability Plan", subtitle: "Standardization, modularity & future-proof testing", color: "#6C63FF", icon: "🏗️",
      initiatives: [
        {
          id: "code-patterns", title: "Code Patterns List", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Identify recurring patterns and functionality across pipeline jobs. Flag anti-patterns and create stories for remediation.",
          owner: "Pipeline Architect / Tech Lead",
          tasks: [
            { id: "cp-learn", type: "learning", title: "Learning: Design Patterns & Pipeline Architecture", due: "Feb 28, 2025", subtasks: [
              { id: "cp-l1", text: "Read: 'What are software design patterns?' (Refactoring.Guru intro)", due: "Feb 7" },
              { id: "cp-l2", text: "Study common pipeline anti-patterns: hardcoding, copy-paste stages, god scripts", due: "Feb 14" },
              { id: "cp-l3", text: "Read Jenkins Shared Library documentation — understand how code reuse works", due: "Feb 21" },
              { id: "cp-l4", text: "Study what makes code 'testable' — read a beginner-friendly article on unit testing principles", due: "Feb 28" },
            ]},
            { id: "cp-t1", type: "task", title: "Catalog all pipeline jobs and shared libraries", due: "Mar 21, 2025", subtasks: [
              { id: "cp-t1a", text: "List all Jenkins jobs with their repo locations and Jenkinsfile paths", due: "Mar 7" },
              { id: "cp-t1b", text: "Tag each job by functional category: build, deploy, test, notify, release, utility", due: "Mar 14" },
              { id: "cp-t1c", text: "Record approximate size (lines of code) and last-modified date for each", due: "Mar 21" },
            ]},
            { id: "cp-t2", type: "task", title: "Identify recurring good patterns", due: "Apr 30, 2025", subtasks: [
              { id: "cp-t2a", text: "Review all jobs and note functions or code blocks that appear in 3+ jobs", due: "Apr 4" },
              { id: "cp-t2b", text: "Document each pattern: what it does, where it appears, sample code snippet", due: "Apr 18" },
              { id: "cp-t2c", text: "Rank patterns by reuse frequency and standardization potential", due: "Apr 30" },
            ]},
            { id: "cp-t3", type: "task", title: "Identify anti-patterns and write remediation stories", due: "Jul 31, 2025", subtasks: [
              { id: "cp-t3a", text: "Flag hardcoded credentials, environment-specific values, and magic strings", due: "May 16" },
              { id: "cp-t3b", text: "Flag tightly-coupled stages that can't be called independently", due: "May 30" },
              { id: "cp-t3c", text: "Flag functions with side effects that make them untestable", due: "Jun 13" },
              { id: "cp-t3d", text: "Write a Jira story for each anti-pattern, linked to 'Consolidate Pipeline Code' epic", due: "Jul 11" },
              { id: "cp-t3e", text: "Prioritize stories by impact and present findings in a team review meeting", due: "Jul 31" },
            ]},
          ],
          acceptance: ["All pipeline jobs catalogued with category tags","Pattern inventory lists at least 10 good and 10 bad patterns with examples","Stories created in Jira and linked to epic","Team review meeting held with findings approved"],
        },
        {
          id: "fix-proposals", title: "Fix Proposals", quarters: ["Q2","Q3","Q4"], dueDate: "Dec 31, 2025",
          description: "Design and implement story work toward the 'Consolidate Pipeline Code' epic. Treat every functional unit as an independent product. Make functions mockable.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "fp-learn", type: "learning", title: "Learning: Refactoring, Mockability & Dependency Injection", due: "Jun 13, 2025", subtasks: [
              { id: "fp-l1", text: "Read: 'Refactoring: Improving the Design of Existing Code' Ch. 1–3 (Fowler) or an equivalent summary article", due: "May 23" },
              { id: "fp-l2", text: "Study Dependency Injection concepts — read a beginner-friendly DI explainer article", due: "May 30" },
              { id: "fp-l3", text: "Read about mocking in unit tests — what is a mock and why does it help isolation?", due: "Jun 6" },
              { id: "fp-l4", text: "Study how to write a function contract: inputs, outputs, and side effects documentation", due: "Jun 13" },
            ]},
            { id: "fp-t1", type: "task", title: "Define the 'independent product' contract standard", due: "Jul 11, 2025", subtasks: [
              { id: "fp-t1a", text: "Draft a template for documenting a pipeline function: name, inputs, outputs, side effects", due: "Jun 27" },
              { id: "fp-t1b", text: "Apply the template to 3 existing functions as worked examples", due: "Jul 4" },
              { id: "fp-t1c", text: "Publish the contract template to the team wiki", due: "Jul 11" },
            ]},
            { id: "fp-t2", type: "task", title: "Refactor tightly-coupled pipeline stages", due: "Sep 26, 2025", subtasks: [
              { id: "fp-t2a", text: "Pick the top 3 highest-priority anti-patterns from the backlog to refactor first", due: "Aug 8" },
              { id: "fp-t2b", text: "Write tech design doc for each refactor before coding", due: "Aug 22" },
              { id: "fp-t2c", text: "Break each monolithic stage into small, parameterized functions", due: "Sep 5" },
              { id: "fp-t2d", text: "Verify refactored functions work end-to-end in a test pipeline run", due: "Sep 19" },
              { id: "fp-t2e", text: "Submit PRs with testability checklist review", due: "Sep 26" },
            ]},
            { id: "fp-t3", type: "task", title: "Make functions mockable — replace hard dependencies with injectable interfaces", due: "Dec 31, 2025", subtasks: [
              { id: "fp-t3a", text: "Identify all direct calls to external systems (Jira, AWS, Nexus, etc.) in pipeline functions", due: "Oct 10" },
              { id: "fp-t3b", text: "Refactor each external call behind a parameter or closure so it can be swapped in tests", due: "Oct 31" },
              { id: "fp-t3c", text: "Write stories for any remaining mockability gaps not yet addressed", due: "Nov 14" },
              { id: "fp-t3d", text: "Do a final pass: manually verify each function can be called in isolation", due: "Dec 12" },
              { id: "fp-t3e", text: "Document mockable interface patterns in team wiki", due: "Dec 31" },
            ]},
          ],
          acceptance: ["Each refactored unit has a documented input/output contract","Functions can be called in isolation without triggering external side effects","Tech design docs written and approved before implementation","80% of identified anti-patterns have stories written by end of Q3","First wave of mockable functions merged and deployed by end of Q4"],
        },
        {
          id: "library-ize", title: "Library-ize Common Code", quarters: ["Q3","Q4"], dueDate: "Dec 31, 2025",
          description: "Extract common functions into versioned, dependency-bundled shared libraries that can be independently tested and imported by any pipeline job.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "lib-learn", type: "learning", title: "Learning: Shared Libraries, Versioning & Package Management", due: "Aug 22, 2025", subtasks: [
              { id: "lib-l1", text: "Read Jenkins Shared Libraries documentation in full (jenkins.io/doc/book/pipeline/shared-libraries)", due: "Aug 8" },
              { id: "lib-l2", text: "Study SemVer (Semantic Versioning): read semver.org to understand MAJOR.MINOR.PATCH", due: "Aug 8" },
              { id: "lib-l3", text: "Read about artifact registries: what is Artifactory/Nexus and how do you publish to one?", due: "Aug 15" },
              { id: "lib-l4", text: "Study how to write unit tests for Groovy/pipeline code using the Pipeline Unit Testing Framework", due: "Aug 22" },
            ]},
            { id: "lib-t1", type: "task", title: "Select packaging strategy and scaffold the library", due: "Sep 19, 2025", subtasks: [
              { id: "lib-t1a", text: "Evaluate Jenkins Shared Library vs standalone JAR vs internal registry — document decision", due: "Sep 5" },
              { id: "lib-t1b", text: "Create the shared library repo with the standard Jenkins `vars/` and `src/` structure", due: "Sep 12" },
              { id: "lib-t1c", text: "Set up a basic CI pipeline for the library itself (build + test)", due: "Sep 19" },
            ]},
            { id: "lib-t2", type: "task", title: "Extract and bundle the top common functions", due: "Nov 14, 2025", subtasks: [
              { id: "lib-t2a", text: "Pick the top 10 most-reused functions from the patterns catalog", due: "Oct 3" },
              { id: "lib-t2b", text: "Move each function into the shared library with its full input/output contract documented", due: "Oct 17" },
              { id: "lib-t2c", text: "Lock and document all dependencies (no floating versions)", due: "Oct 31" },
              { id: "lib-t2d", text: "Publish v1.0.0 to the internal artifact registry", due: "Nov 14" },
            ]},
            { id: "lib-t3", type: "task", title: "Write unit tests and migrate existing jobs", due: "Dec 31, 2025", subtasks: [
              { id: "lib-t3a", text: "Write at least one unit test per exported library function using Pipeline Unit Testing Framework", due: "Nov 28" },
              { id: "lib-t3b", text: "Migrate at least 5 existing pipeline jobs to import from the shared library", due: "Dec 12" },
              { id: "lib-t3c", text: "Confirm library CI pipeline passes after every migration", due: "Dec 19" },
              { id: "lib-t3d", text: "Write migration guide: how to update a pipeline job to use the shared library", due: "Dec 31" },
            ]},
          ],
          acceptance: ["Common library published to artifact registry at v1.0.0","All dependencies locked and documented","Each exported function has at least one unit test","At least 5 pipeline jobs migrated to use the shared library","Library CI pipeline is green on every commit"],
        },
      ],
    },
  ],
};

const jenkinsProject: Project = {
  id: "jenkins",
  title: "Jenkins Improvement for Customers",
  subtitle: "Improve satisfaction, confidence, discoverability & look and feel",
  color: "#E85D26",
  wikiUrl: "https://wizardsofthecoast.atlassian.net/wiki/spaces/~bodewec/pages/1583382652",
  pillars: [
    {
      id: "story-writing", title: "Q1–Q2: Write Stories, Spikes & Epics", subtitle: "Discover, scope, and document all improvement work", color: "#E85D26", icon: "📝",
      initiatives: [
        {
          id: "rerun-reuse", title: "Rerun / Reuse", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Redesign pipeline flow to allow partial reruns and artifact reuse so successful stages are not recomputed unnecessarily.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "rr-learn", type: "learning", title: "Learning: Jenkins Pipeline Restart & Stash/Unstash", due: "Feb 28, 2025", subtasks: [
              { id: "rr-l1", text: "Read Jenkins docs on 'Restart from Stage' feature — understand what is and isn't supported", due: "Feb 14" },
              { id: "rr-l2", text: "Study Jenkins `stash` and `unstash` — how artifacts are passed between stages/runs", due: "Feb 21" },
              { id: "rr-l3", text: "Research external caching strategies: Artifactory build caching, S3 artifact storage", due: "Feb 28" },
            ]},
            { id: "rr-t1", type: "task", title: "Spike: Evaluate partial rerun strategies", due: "Apr 30, 2025", subtasks: [
              { id: "rr-t1a", text: "Identify the top 3 pipeline jobs where stage recomputation wastes most time", due: "Mar 21" },
              { id: "rr-t1b", text: "Prototype a `stash`/`unstash` artifact reuse approach in a test pipeline", due: "Apr 11" },
              { id: "rr-t1c", text: "Document findings: effort, risk, and customer time savings estimate", due: "Apr 25" },
              { id: "rr-t1d", text: "Write epic and child stories for approved approach in Jira", due: "Apr 30" },
            ]},
            { id: "rr-t2", type: "task", title: "Write fully-detailed stories for board", due: "Jul 31, 2025", subtasks: [
              { id: "rr-t2a", text: "Write acceptance criteria for each story covering input, output, and edge cases", due: "Jun 27" },
              { id: "rr-t2b", text: "Estimate story points with t-shirt sizing", due: "Jul 11" },
              { id: "rr-t2c", text: "Get stories reviewed and approved; move to 'Ready' column on board", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Spike completed and approach documented","Epic created with child stories in Jira","All stories have acceptance criteria, estimates, and are board-ready by end of Q2"],
        },
        {
          id: "maintenance", title: "Maintenance: A/B Deployment", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Research and spike Jenkins maintenance and A/B deployment possibilities to improve reliability and reduce downtime during upgrades.",
          owner: "DevOps / Infrastructure Engineer",
          tasks: [
            { id: "maint-learn", type: "learning", title: "Learning: Jenkins HA, Blue/Green & Maintenance Windows", due: "Mar 14, 2025", subtasks: [
              { id: "maint-l1", text: "Read Jenkins documentation on High Availability and clustering options", due: "Feb 28" },
              { id: "maint-l2", text: "Study Blue/Green deployment concepts — read a clear explainer article on traffic switching", due: "Mar 7" },
              { id: "maint-l3", text: "Research Jenkins Configuration as Code (JCasC) — how it enables reproducible Jenkins instances", due: "Mar 14" },
            ]},
            { id: "maint-t1", type: "task", title: "Spike: A/B and maintenance deployment options", due: "May 30, 2025", subtasks: [
              { id: "maint-t1a", text: "Document current Jenkins deployment topology and pain points during upgrades", due: "Apr 11" },
              { id: "maint-t1b", text: "Evaluate Option A: Blue/Green Jenkins with traffic routing", due: "Apr 25" },
              { id: "maint-t1c", text: "Evaluate Option B: Staged canary rollout with JCasC", due: "May 9" },
              { id: "maint-t1d", text: "Write spike findings doc comparing options by cost, risk, and complexity", due: "May 23" },
              { id: "maint-t1e", text: "Present findings and get approval on preferred approach", due: "May 30" },
            ]},
            { id: "maint-t2", type: "task", title: "Write fully-detailed stories for board", due: "Jul 31, 2025", subtasks: [
              { id: "maint-t2a", text: "Write stories for the approved maintenance/deployment approach", due: "Jun 27" },
              { id: "maint-t2b", text: "Include runbook stories: rollback procedure, health checks, communication plan", due: "Jul 11" },
              { id: "maint-t2c", text: "Estimate and get stories to 'Ready' on the board", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Spike completed with both A/B options evaluated","Preferred approach approved by stakeholders","Stories written, estimated, and board-ready by end of Q2"],
        },
        {
          id: "org-clarity", title: "Organizational: Job Clarity & Readability", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Update jobs for clarity of purpose, readability, and organization for major build projects so customers can easily understand what each job does.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "org-learn", type: "learning", title: "Learning: Jenkins Job Naming, Folders & Description Best Practices", due: "Feb 28, 2025", subtasks: [
              { id: "org-l1", text: "Read Jenkins Folders plugin documentation — how to organize jobs hierarchically", due: "Feb 14" },
              { id: "org-l2", text: "Study Jenkins job description field — how HTML descriptions improve discoverability", due: "Feb 21" },
              { id: "org-l3", text: "Review industry naming convention guides for CI/CD jobs (e.g., <project>-<env>-<action>)", due: "Feb 28" },
            ]},
            { id: "org-t1", type: "task", title: "Audit current job naming and organization", due: "Apr 11, 2025", subtasks: [
              { id: "org-t1a", text: "List all jobs and evaluate current names for clarity — flag ambiguous or misleading names", due: "Mar 14" },
              { id: "org-t1b", text: "Identify jobs missing descriptions or with outdated descriptions", due: "Mar 28" },
              { id: "org-t1c", text: "Propose a folder structure for major build projects and get team buy-in", due: "Apr 11" },
            ]},
            { id: "org-t2", type: "task", title: "Write stories for job clarity improvements", due: "Jul 31, 2025", subtasks: [
              { id: "org-t2a", text: "Write stories for job renames with a migration/redirect plan", due: "May 30" },
              { id: "org-t2b", text: "Write stories for adding/updating job descriptions in bulk", due: "Jun 13" },
              { id: "org-t2c", text: "Write stories for folder restructure with customer communication plan", due: "Jun 27" },
              { id: "org-t2d", text: "Estimate and board-ready all stories", due: "Jul 31" },
            ]},
          ],
          acceptance: ["All ambiguous job names flagged with proposed replacements","Folder structure proposal approved","Stories covering renames, descriptions, and folder restructure are board-ready"],
        },
        {
          id: "org-release-list", title: "Organizational: Release List Integration", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Release List used to update clients and other release-based jobs with the current release stage.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "rl-learn", type: "learning", title: "Learning: Release Management & Jenkins Parameters", due: "Mar 14, 2025", subtasks: [
              { id: "rl-l1", text: "Understand the current release process end-to-end — trace how release stage info flows today", due: "Feb 28" },
              { id: "rl-l2", text: "Study Jenkins parameterized builds and how downstream jobs consume parameters", due: "Mar 7" },
              { id: "rl-l3", text: "Research options for a shared release state store (file, artifact, API endpoint, or env var)", due: "Mar 14" },
            ]},
            { id: "rl-t1", type: "task", title: "Design the Release List data model and integration points", due: "May 30, 2025", subtasks: [
              { id: "rl-t1a", text: "Define what 'release stage' data needs to be tracked and by whom", due: "Apr 11" },
              { id: "rl-t1b", text: "Identify all jobs and clients that need to consume release stage info", due: "Apr 25" },
              { id: "rl-t1c", text: "Design a lightweight Release List data structure (JSON file, Jira field, or custom API)", due: "May 16" },
              { id: "rl-t1d", text: "Document the design and get stakeholder sign-off", due: "May 30" },
            ]},
            { id: "rl-t2", type: "task", title: "Write stories for Release List implementation", due: "Jul 31, 2025", subtasks: [
              { id: "rl-t2a", text: "Write story: create/update Release List on stage transitions", due: "Jun 20" },
              { id: "rl-t2b", text: "Write story: downstream jobs read from Release List before executing", due: "Jun 27" },
              { id: "rl-t2c", text: "Write story: surface release stage visibly in Jenkins job descriptions or badge", due: "Jul 11" },
              { id: "rl-t2d", text: "Estimate and board-ready all stories", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Release List data model designed and approved","All consumer jobs identified","Implementation stories are board-ready by end of Q2"],
        },
        {
          id: "org-branding", title: "Organizational: Jenkins Branding Automation", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Implement Jenkins branding automation so the theme, logos, and look-and-feel can be easily and consistently updated across all instances.",
          owner: "Pipeline / Platform Engineer",
          tasks: [
            { id: "brand-learn", type: "learning", title: "Learning: Jenkins Themes & Configuration as Code", due: "Mar 7, 2025", subtasks: [
              { id: "brand-l1", text: "Read about the Jenkins Simple Theme plugin and how CSS overrides work", due: "Feb 21" },
              { id: "brand-l2", text: "Study Jenkins Configuration as Code (JCasC) — how it manages theme/appearance settings", due: "Feb 28" },
              { id: "brand-l3", text: "Review the Jenkins Dark Theme plugin as a reference implementation", due: "Mar 7" },
            ]},
            { id: "brand-t1", type: "task", title: "Spike: Branding automation approach", due: "Apr 30, 2025", subtasks: [
              { id: "brand-t1a", text: "Prototype a theme CSS override applied via JCasC in a test Jenkins instance", due: "Mar 28" },
              { id: "brand-t1b", text: "Test that a theme update can be applied without a Jenkins restart", due: "Apr 11" },
              { id: "brand-t1c", text: "Document the automation approach and any limitations found", due: "Apr 25" },
              { id: "brand-t1d", text: "Write spike summary and get approval to proceed", due: "Apr 30" },
            ]},
            { id: "brand-t2", type: "task", title: "Write stories for branding automation", due: "Jul 31, 2025", subtasks: [
              { id: "brand-t2a", text: "Write story: JCasC-managed theme configuration with version control", due: "Jun 13" },
              { id: "brand-t2b", text: "Write story: automated theme deployment pipeline (update → test → apply)", due: "Jun 27" },
              { id: "brand-t2c", text: "Write story: documentation for how to update branding going forward", due: "Jul 11" },
              { id: "brand-t2d", text: "Estimate and board-ready all stories", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Branding can be updated via config change without manual UI steps","Spike proved approach is viable","Stories are board-ready by end of Q2"],
        },
        {
          id: "reporting-visuals", title: "Reporting: Visual Job Health & History", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Update Jenkins with visual representations explaining job health and history so customers can quickly assess reliability and trends.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "rv-learn", type: "learning", title: "Learning: Jenkins Reporting Plugins & Dashboards", due: "Mar 14, 2025", subtasks: [
              { id: "rv-l1", text: "Read about the Jenkins Build Monitor plugin and what it visualizes", due: "Feb 28" },
              { id: "rv-l2", text: "Study the Jenkins Test Results Analyzer plugin for trend charts", due: "Mar 7" },
              { id: "rv-l3", text: "Explore the Jenkins Metrics and Monitoring plugin ecosystem overview", due: "Mar 14" },
            ]},
            { id: "rv-t1", type: "task", title: "Audit current reporting gaps and evaluate plugins", due: "May 16, 2025", subtasks: [
              { id: "rv-t1a", text: "Survey 3–5 internal customers: what health/history info do they wish they could see?", due: "Apr 11" },
              { id: "rv-t1b", text: "Evaluate top 3 Jenkins dashboard/reporting plugins against those needs", due: "Apr 25" },
              { id: "rv-t1c", text: "Install and demo chosen plugin in a non-prod Jenkins; gather feedback", due: "May 9" },
              { id: "rv-t1d", text: "Document recommendation and get approval", due: "May 16" },
            ]},
            { id: "rv-t2", type: "task", title: "Write stories for visual reporting improvements", due: "Jul 31, 2025", subtasks: [
              { id: "rv-t2a", text: "Write story: install and configure chosen dashboard plugin", due: "Jun 13" },
              { id: "rv-t2b", text: "Write story: configure per-folder and per-job health dashboards", due: "Jun 27" },
              { id: "rv-t2c", text: "Write story: customer-facing documentation on how to read the dashboards", due: "Jul 11" },
              { id: "rv-t2d", text: "Estimate and board-ready all stories", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Customer needs survey completed","Plugin evaluated and approved","Stories for visual reporting are board-ready by end of Q2"],
        },
        {
          id: "reporting-failures", title: "Reporting: Failed Stages & Log Improvements", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Improve job failure reporting so jobs list failed stages, highlight errors clearly, and provide better log output for faster debugging.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "rf-learn", type: "learning", title: "Learning: Jenkins Failure Cause & Log Parsing Plugins", due: "Mar 14, 2025", subtasks: [
              { id: "rf-l1", text: "Study the Build Failure Analyzer plugin — how it matches log patterns to named causes", due: "Feb 28" },
              { id: "rf-l2", text: "Read about Jenkins pipeline `catchError` and `unstable` for nuanced failure handling", due: "Mar 7" },
              { id: "rf-l3", text: "Research ANSI color and timestamper plugins for more readable console output", due: "Mar 14" },
            ]},
            { id: "rf-t1", type: "task", title: "Catalog common failure modes and current log pain points", due: "Apr 25, 2025", subtasks: [
              { id: "rf-t1a", text: "Review the last 30 days of failed builds and categorize root causes", due: "Mar 28" },
              { id: "rf-t1b", text: "Ask customers: what makes Jenkins error logs hardest to read or act on?", due: "Apr 11" },
              { id: "rf-t1c", text: "Document top 5 failure patterns that should have named causes in Build Failure Analyzer", due: "Apr 25" },
            ]},
            { id: "rf-t2", type: "task", title: "Write stories for failure reporting improvements", due: "Jul 31, 2025", subtasks: [
              { id: "rf-t2a", text: "Write story: configure Build Failure Analyzer with named causes for top 5 patterns", due: "Jun 13" },
              { id: "rf-t2b", text: "Write story: add ANSI color and timestamps to all pipeline console output", due: "Jun 27" },
              { id: "rf-t2c", text: "Write story: stage-level failure summaries surfaced on the job run page", due: "Jul 11" },
              { id: "rf-t2d", text: "Estimate and board-ready all stories", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Top 5 failure patterns documented","Stories for failure reporting are board-ready by end of Q2","Customer log pain points addressed in at least one story each"],
        },
        {
          id: "reporting-folders", title: "Reporting: Folder History & Artifact Discovery", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Folders show history in a meaningful way — failure rate, average build time, and artifact discovery.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "rfd-learn", type: "learning", title: "Learning: Jenkins Folder-Level Metrics & Artifact Management", due: "Mar 14, 2025", subtasks: [
              { id: "rfd-l1", text: "Read CloudBees Folders plugin docs — understand what metadata folders can surface", due: "Feb 28" },
              { id: "rfd-l2", text: "Study Jenkins artifact archiving and the Artifact Manager plugin", due: "Mar 7" },
              { id: "rfd-l3", text: "Explore how folder-level views can be customized using Jenkins List Views", due: "Mar 14" },
            ]},
            { id: "rfd-t1", type: "task", title: "Define meaningful folder-level metrics", due: "Apr 25, 2025", subtasks: [
              { id: "rfd-t1a", text: "Survey customers: what metrics at folder level would be most useful?", due: "Mar 28" },
              { id: "rfd-t1b", text: "Prototype a folder view with failure rate and average build time columns in non-prod Jenkins", due: "Apr 11" },
              { id: "rfd-t1c", text: "Define the artifact discovery UX: how should customers find artifacts from a folder view?", due: "Apr 25" },
            ]},
            { id: "rfd-t2", type: "task", title: "Write stories for folder reporting improvements", due: "Jul 31, 2025", subtasks: [
              { id: "rfd-t2a", text: "Write story: configure folder views to show failure rate and average build time", due: "Jun 13" },
              { id: "rfd-t2b", text: "Write story: artifact discovery links surfaced at folder level", due: "Jun 27" },
              { id: "rfd-t2c", text: "Write story: folder health badges visible on Jenkins home dashboard", due: "Jul 11" },
              { id: "rfd-t2d", text: "Estimate and board-ready all stories", due: "Jul 31" },
            ]},
          ],
          acceptance: ["Customer metric survey completed","Prototype folder view reviewed and approved","Stories for folder reporting are board-ready by end of Q2"],
        },
      ],
    },
    {
      id: "story-approval", title: "Q2–Q3: Approve, Prioritize & Ready Stories", subtitle: "Get all work fully scoped and on the board", color: "#C0392B", icon: "✅",
      initiatives: [
        {
          id: "story-review", title: "Story Review & Prioritization", quarters: ["Q2","Q3"], dueDate: "Oct 31, 2025",
          description: "All written stories are reviewed, prioritized, fully fleshed out with acceptance criteria and estimates, and placed on the board ready to be picked up.",
          owner: "Pipeline Engineer + Stakeholders",
          tasks: [
            { id: "sr-learn", type: "learning", title: "Learning: Story Writing, INVEST Criteria & Prioritization", due: "Jun 13, 2025", subtasks: [
              { id: "sr-l1", text: "Read about the INVEST criteria for well-written user stories", due: "May 30" },
              { id: "sr-l2", text: "Study MoSCoW prioritization method — Must Have vs Should Have vs Could Have", due: "Jun 6" },
              { id: "sr-l3", text: "Read about story mapping — how to visualize a backlog across a user journey", due: "Jun 13" },
            ]},
            { id: "sr-t1", type: "task", title: "Consolidate and deduplicate all written stories", due: "Jul 31, 2025", subtasks: [
              { id: "sr-t1a", text: "Gather all stories written across the 8 initiative areas into a single Jira epic view", due: "Jul 11" },
              { id: "sr-t1b", text: "Remove duplicates and merge overlapping stories", due: "Jul 18" },
              { id: "sr-t1c", text: "Ensure every story meets INVEST criteria — flag any that need more detail", due: "Jul 31" },
            ]},
            { id: "sr-t2", type: "task", title: "Prioritize and finalize the board", due: "Oct 31, 2025", subtasks: [
              { id: "sr-t2a", text: "Run a MoSCoW prioritization session with stakeholders for all stories", due: "Aug 22" },
              { id: "sr-t2b", text: "Ensure every 'Must Have' story is estimated, acceptance-criteria-complete, and in 'Ready'", due: "Sep 12" },
              { id: "sr-t2c", text: "Order the backlog with top-priority work at the top", due: "Sep 26" },
              { id: "sr-t2d", text: "Publish the prioritized roadmap for customer/stakeholder visibility", due: "Oct 31" },
            ]},
          ],
          acceptance: ["All stories consolidated into one Jira epic view","Every story meets INVEST criteria","Prioritization session completed with stakeholder sign-off","Board is ordered, estimated, and ready to work"],
        },
      ],
    },
    {
      id: "retrospective", title: "Q3–Q4: Revisit & Assess Effectiveness", subtitle: "Measure outcomes and plan next improvements", color: "#8E44AD", icon: "🔍",
      initiatives: [
        {
          id: "effectiveness-review", title: "Effectiveness Assessment", quarters: ["Q3","Q4"], dueDate: "Dec 31, 2025",
          description: "Revisit all completed work, assess customer satisfaction impact, identify what worked vs what needs refinement, and propose next iterations.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "ea-learn", type: "learning", title: "Learning: Measuring Developer Experience & Retrospective Techniques", due: "Sep 12, 2025", subtasks: [
              { id: "ea-l1", text: "Read about DORA metrics (Deployment Frequency, Lead Time, MTTR, Change Failure Rate)", due: "Aug 22" },
              { id: "ea-l2", text: "Study how to run an effective retrospective: Start/Stop/Continue format", due: "Aug 29" },
              { id: "ea-l3", text: "Research lightweight developer satisfaction surveys — how to ask the right questions without survey fatigue", due: "Sep 12" },
            ]},
            { id: "ea-t1", type: "task", title: "Collect data on completed improvements", due: "Oct 31, 2025", subtasks: [
              { id: "ea-t1a", text: "List all stories completed in Q1–Q3 and their stated goals", due: "Sep 26" },
              { id: "ea-t1b", text: "Run a short customer satisfaction survey targeted at each improvement area", due: "Oct 10" },
              { id: "ea-t1c", text: "Gather objective metrics where available: build time reduction, rerun rate, failure discovery time", due: "Oct 17" },
              { id: "ea-t1d", text: "Compile findings into an effectiveness report", due: "Oct 31" },
            ]},
            { id: "ea-t2", type: "task", title: "Retrospective and next-iteration planning", due: "Dec 31, 2025", subtasks: [
              { id: "ea-t2a", text: "Run a formal retrospective with stakeholders: what worked, what didn't, what to change", due: "Nov 14" },
              { id: "ea-t2b", text: "Identify the top 3 areas needing a second iteration of improvement", due: "Nov 21" },
              { id: "ea-t2c", text: "Write proposals for next year's improvement stories based on findings", due: "Dec 12" },
              { id: "ea-t2d", text: "Publish the effectiveness report and next-iteration proposals for stakeholder review", due: "Dec 31" },
            ]},
          ],
          acceptance: ["Customer satisfaction survey completed and results documented","Effectiveness report published with objective metrics where available","Retrospective held with stakeholders","Next-iteration proposals written and shared"],
        },
      ],
    },
  ],
};

const buildPerfProject: Project = {
  id: "buildperf",
  title: "Build Performance & Health Reports",
  subtitle: "Framework to report build performance, health, and remediate bottlenecks",
  color: "#0EA5E9",
  wikiUrl: "https://wizardsofthecoast.atlassian.net/wiki/spaces/~bodewec/pages/1584365642",
  pillars: [
    {
      id: "bp-baselines", title: "Q1: Build Time Estimates & Health Dashboard", subtitle: "Establish baselines and get a live health dashboard running", color: "#0EA5E9", icon: "📈",
      initiatives: [
        {
          id: "bp-time-estimates", title: "Build Time Estimates & Baseline Report", quarters: ["Q1"], dueDate: "Apr 30, 2025",
          description: "Identify build time estimates for all major pipeline elements using DataDog and other tracking tools. Publish a documented baseline build performance and health report.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "bp-te-learn", type: "learning", title: "Learning: DataDog APM, Traces & CI Visibility", due: "Feb 14, 2025", subtasks: [
              { id: "bp-te-l1", text: "Read DataDog CI Visibility docs — how it ingests pipeline run data and build durations", due: "Feb 7" },
              { id: "bp-te-l2", text: "Study DataDog APM traces — understand spans, services, and how to correlate with pipeline stages", due: "Feb 7" },
              { id: "bp-te-l3", text: "Read about DataDog dashboards and SLOs — how to create performance baseline widgets", due: "Feb 14" },
              { id: "bp-te-l4", text: "Research alternatives if DataDog coverage is incomplete: Jenkins Metrics plugin, InfluxDB+Grafana", due: "Feb 14" },
            ]},
            { id: "bp-te-t1", type: "task", title: "Instrument and collect build timing data", due: "Mar 21, 2025", subtasks: [
              { id: "bp-te-t1a", text: "Identify all major pipeline elements: compile, test, package, deploy, scan, publish", due: "Feb 28" },
              { id: "bp-te-t1b", text: "Confirm DataDog CI Visibility is receiving data from Jenkins (or set up the integration)", due: "Mar 7" },
              { id: "bp-te-t1c", text: "Collect at least 2 weeks of timing data per major pipeline element", due: "Mar 14" },
              { id: "bp-te-t1d", text: "Export raw timing data per element into a spreadsheet for baseline analysis", due: "Mar 21" },
            ]},
            { id: "bp-te-t2", type: "task", title: "Publish baseline build performance report", due: "Apr 30, 2025", subtasks: [
              { id: "bp-te-t2a", text: "Calculate p50, p90, and max durations for each major pipeline element", due: "Apr 4" },
              { id: "bp-te-t2b", text: "Identify top 5 slowest elements and flag as candidates for bottleneck analysis", due: "Apr 11" },
              { id: "bp-te-t2c", text: "Write and publish the baseline build performance report to team wiki", due: "Apr 18" },
              { id: "bp-te-t2d", text: "Create a DataDog dashboard widget showing baseline build times per element", due: "Apr 30" },
            ]},
          ],
          acceptance: [
            "Build time estimates documented for all major pipeline elements",
            "Baseline report published to team wiki with p50/p90/max per element",
            "DataDog (or equivalent) collecting live pipeline timing data",
            "Top 5 slowest elements identified and flagged",
          ],
        },
        {
          id: "bp-health-dashboard", title: "Build Health Dashboard", quarters: ["Q1","Q2"], dueDate: "Jul 31, 2025",
          description: "Implement a live Build Health Dashboard tracking failure rate, rerun frequency, and average build time across all major pipeline jobs.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "bp-hd-learn", type: "learning", title: "Learning: Build Health Metrics & Dashboard Design", due: "Mar 14, 2025", subtasks: [
              { id: "bp-hd-l1", text: "Read about DORA's four key metrics — understand failure rate and MTTR in CI context", due: "Feb 28" },
              { id: "bp-hd-l2", text: "Study DataDog monitor and alert configuration — how to set thresholds for health signals", due: "Mar 7" },
              { id: "bp-hd-l3", text: "Research rerun frequency tracking — how to distinguish a manual rerun from a first-run in Jenkins logs", due: "Mar 14" },
            ]},
            { id: "bp-hd-t1", type: "task", title: "Define health metrics and data sources", due: "Apr 30, 2025", subtasks: [
              { id: "bp-hd-t1a", text: "Define exactly how 'failure rate' is calculated (per job? per stage? over what window?)", due: "Mar 28" },
              { id: "bp-hd-t1b", text: "Define how 'rerun frequency' is measured — identify the Jenkins log field or tag that indicates a rerun", due: "Apr 11" },
              { id: "bp-hd-t1c", text: "Confirm all three metrics (failure rate, rerun frequency, avg build time) are flowing into DataDog", due: "Apr 25" },
              { id: "bp-hd-t1d", text: "Document metric definitions in a shared spec doc for stakeholder review", due: "Apr 30" },
            ]},
            { id: "bp-hd-t2", type: "task", title: "Build and publish the health dashboard", due: "Jul 31, 2025", subtasks: [
              { id: "bp-hd-t2a", text: "Create DataDog dashboard with Failure Rate, Rerun Frequency, and Avg Build Time widgets", due: "May 30" },
              { id: "bp-hd-t2b", text: "Add time-series trend charts (7-day and 30-day rolling views) for each metric", due: "Jun 13" },
              { id: "bp-hd-t2c", text: "Set up DataDog monitors/alerts for when failure rate or rerun frequency exceeds thresholds", due: "Jun 27" },
              { id: "bp-hd-t2d", text: "Publish dashboard link to team wiki and configure access for stakeholders", due: "Jul 11" },
              { id: "bp-hd-t2e", text: "Write a dashboard user guide explaining each metric and how to act on alerts", due: "Jul 31" },
            ]},
          ],
          acceptance: [
            "Dashboard live with Failure Rate, Rerun Frequency, and Avg Build Time",
            "Alerts configured for threshold breaches",
            "Dashboard accessible to stakeholders with a published user guide",
            "Trend charts showing 7-day and 30-day rolling views",
          ],
        },
      ],
    },
    {
      id: "bp-failures", title: "Q2–Q3: Common Failures & Visual Reporting", subtitle: "Identify failure patterns and enable visual job state reporting", color: "#0284C7", icon: "🔎",
      initiatives: [
        {
          id: "bp-common-failures", title: "Identify Common Build Failures", quarters: ["Q2"], dueDate: "Jul 31, 2025",
          description: "Identify common build failures, their stage, and root cause across all major build projects. Build a catalog of top failure patterns.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "bp-cf-learn", type: "learning", title: "Learning: Log Analysis & Root Cause Categorization", due: "May 16, 2025", subtasks: [
              { id: "bp-cf-l1", text: "Read about Jenkins Build Failure Analyzer plugin — how to create and match failure patterns", due: "May 2" },
              { id: "bp-cf-l2", text: "Study DataDog Log Management — how to search, filter, and aggregate pipeline log lines", due: "May 9" },
              { id: "bp-cf-l3", text: "Read about root cause analysis techniques: 5-Why, fishbone diagram for systemic issues", due: "May 16" },
            ]},
            { id: "bp-cf-t1", type: "task", title: "Catalog common failures by stage and cause", due: "Jun 27, 2025", subtasks: [
              { id: "bp-cf-t1a", text: "Pull 60-day failure history from DataDog and Jenkins for all major build projects", due: "May 30" },
              { id: "bp-cf-t1b", text: "Group failures by pipeline stage (compile, test, package, deploy, scan)", due: "Jun 6" },
              { id: "bp-cf-t1c", text: "Identify the top 10 failure messages and categorize each by root cause type", due: "Jun 13" },
              { id: "bp-cf-t1d", text: "Document each failure: stage, error message, frequency, and known cause", due: "Jun 27" },
            ]},
            { id: "bp-cf-t2", type: "task", title: "Register top failures in Build Failure Analyzer", due: "Jul 31, 2025", subtasks: [
              { id: "bp-cf-t2a", text: "Create named failure causes in Build Failure Analyzer for the top 10 patterns", due: "Jul 11" },
              { id: "bp-cf-t2b", text: "Verify that new builds are now being tagged with named causes on failure", due: "Jul 18" },
              { id: "bp-cf-t2c", text: "Publish common failures catalog to team wiki", due: "Jul 31" },
            ]},
          ],
          acceptance: [
            "Top 10 build failures catalogued by stage and root cause",
            "All top failures registered as named causes in Build Failure Analyzer",
            "Failures catalog published to team wiki",
          ],
        },
        {
          id: "bp-visual-reporting", title: "Visual Job State & History Reporting", quarters: ["Q2","Q3"], dueDate: "Oct 31, 2025",
          description: "Enable visual job state and history reporting for major build projects, surfacing common failures, trend data, and actionable health signals.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "bp-vr-learn", type: "learning", title: "Learning: Jenkins Visual Plugins & DataDog Dashboard Advanced", due: "Jun 13, 2025", subtasks: [
              { id: "bp-vr-l1", text: "Study Jenkins Blue Ocean or similar UI — how it visualizes stage-level status across builds", due: "May 30" },
              { id: "bp-vr-l2", text: "Read DataDog Notebook docs — how to create narrative-style reporting that combines charts and text", due: "Jun 6" },
              { id: "bp-vr-l3", text: "Research embedding DataDog dashboard widgets into Confluence or wiki pages for stakeholder sharing", due: "Jun 13" },
            ]},
            { id: "bp-vr-t1", type: "task", title: "Implement visual reporting for major build projects", due: "Aug 29, 2025", subtasks: [
              { id: "bp-vr-t1a", text: "Add per-project breakdown panels to the health dashboard (failure rate per project)", due: "Jul 25" },
              { id: "bp-vr-t1b", text: "Add a 'Top Failures by Project' table widget showing the most common named failures", due: "Aug 8" },
              { id: "bp-vr-t1c", text: "Enable stage-level pass/fail visualization in Jenkins for the top 5 major build projects", due: "Aug 22" },
              { id: "bp-vr-t1d", text: "Test that visual reporting surfaces known failures from the catalog correctly", due: "Aug 29" },
            ]},
            { id: "bp-vr-t2", type: "task", title: "Publish and communicate visual reporting to stakeholders", due: "Oct 31, 2025", subtasks: [
              { id: "bp-vr-t2a", text: "Share dashboard link with stakeholders and walk through what each visual means", due: "Sep 19" },
              { id: "bp-vr-t2b", text: "Create a DataDog Notebook as a monthly health report template", due: "Oct 3" },
              { id: "bp-vr-t2c", text: "Publish the first monthly health report using the notebook template", due: "Oct 17" },
              { id: "bp-vr-t2d", text: "Document the process for producing monthly health reports going forward", due: "Oct 31" },
            ]},
          ],
          acceptance: [
            "Visual reporting enabled for all major build projects",
            "Stage-level failure visualization active for top 5 projects",
            "Monthly health report template created and first report published",
            "Stakeholders informed and able to access dashboard",
          ],
        },
      ],
    },
    {
      id: "bp-remediation", title: "Q3–Q4: Failure Discovery Refinement & Bottleneck Remediation", subtitle: "Solve persistent issues and reduce top bottlenecks", color: "#075985", icon: "🛠️",
      initiatives: [
        {
          id: "bp-failure-discovery", title: "Refine Failure Discovery Process", quarters: ["Q3","Q4"], dueDate: "Dec 31, 2025",
          description: "Refine the failure discovery process to continuously surface and triage top build failures, increasing the ability to identify and solve persistent and novel issues.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "bp-fd-learn", type: "learning", title: "Learning: Continuous Improvement & Failure Triage Workflows", due: "Sep 12, 2025", subtasks: [
              { id: "bp-fd-l1", text: "Study how high-performing teams run failure triage rituals — read SRE-style incident review processes", due: "Aug 22" },
              { id: "bp-fd-l2", text: "Read about DataDog anomaly detection monitors — how to auto-alert on unusual failure spikes", due: "Sep 5" },
              { id: "bp-fd-l3", text: "Research how to track 'novel' vs 'recurring' failures — read about deduplication in alerting tools", due: "Sep 12" },
            ]},
            { id: "bp-fd-t1", type: "task", title: "Establish recurring failure triage process", due: "Oct 31, 2025", subtasks: [
              { id: "bp-fd-t1a", text: "Define a weekly failure triage ritual: review top failures, update catalog, assign owners", due: "Sep 26" },
              { id: "bp-fd-t1b", text: "Set up DataDog anomaly detection for failure rate — alert when spike exceeds baseline by 20%", due: "Oct 10" },
              { id: "bp-fd-t1c", text: "Create a Jira template for logging novel failures found during triage", due: "Oct 17" },
              { id: "bp-fd-t1d", text: "Run the triage ritual for 4 consecutive weeks and refine the process based on feedback", due: "Oct 31" },
            ]},
            { id: "bp-fd-t2", type: "task", title: "Document and institutionalize the failure discovery process", due: "Dec 31, 2025", subtasks: [
              { id: "bp-fd-t2a", text: "Write the failure discovery runbook: how to triage, log, assign, and close failure investigations", due: "Nov 14" },
              { id: "bp-fd-t2b", text: "Publish the runbook to team wiki", due: "Nov 21" },
              { id: "bp-fd-t2c", text: "Update Build Failure Analyzer with any new patterns found during the Q3–Q4 triage cycles", due: "Dec 12" },
              { id: "bp-fd-t2d", text: "Write a retrospective: how many novel vs recurring failures were caught in Q3–Q4 and what was resolved", due: "Dec 31" },
            ]},
          ],
          acceptance: [
            "Weekly failure triage ritual established and running for at least 4 weeks",
            "Anomaly detection monitor active in DataDog",
            "Failure discovery runbook published to team wiki",
            "Retrospective written documenting novel vs recurring failures resolved",
          ],
        },
        {
          id: "bp-bottlenecks", title: "Bottleneck Remediation", quarters: ["Q4"], dueDate: "Dec 31, 2025",
          description: "Identify, prioritize, and remediate the top 3 build bottlenecks. Document each remediation with before/after build time measurements.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "bp-bn-learn", type: "learning", title: "Learning: Pipeline Optimization Techniques", due: "Oct 17, 2025", subtasks: [
              { id: "bp-bn-l1", text: "Read about Jenkins parallel stage execution — when and how to parallelize pipeline steps", due: "Oct 3" },
              { id: "bp-bn-l2", text: "Study build caching strategies: Gradle build cache, Docker layer caching, dependency caching", due: "Oct 10" },
              { id: "bp-bn-l3", text: "Read about test splitting and parallel test execution to reduce test stage duration", due: "Oct 17" },
            ]},
            { id: "bp-bn-t1", type: "task", title: "Identify and prioritize top 3 bottlenecks", due: "Nov 14, 2025", subtasks: [
              { id: "bp-bn-t1a", text: "Use baseline report and health dashboard to rank pipeline elements by worst p90 duration", due: "Oct 24" },
              { id: "bp-bn-t1b", text: "Investigate each top candidate: is the slowness inherent, or is there a known fix?", due: "Oct 31" },
              { id: "bp-bn-t1c", text: "Select top 3 bottlenecks where remediation is feasible within Q4 scope", due: "Nov 7" },
              { id: "bp-bn-t1d", text: "Write a design doc for each remediation approach before starting work", due: "Nov 14" },
            ]},
            { id: "bp-bn-t2", type: "task", title: "Remediate top 3 bottlenecks and document results", due: "Dec 31, 2025", subtasks: [
              { id: "bp-bn-t2a", text: "Implement remediation #1 and measure before/after build time in DataDog", due: "Nov 28" },
              { id: "bp-bn-t2b", text: "Implement remediation #2 and measure before/after build time", due: "Dec 12" },
              { id: "bp-bn-t2c", text: "Implement remediation #3 and measure before/after build time", due: "Dec 19" },
              { id: "bp-bn-t2d", text: "Publish remediation report: what changed, measured impact, and lessons learned", due: "Dec 31" },
            ]},
          ],
          acceptance: [
            "Top 3 bottlenecks identified from dashboard data with documented justification",
            "All 3 remediations implemented and verified",
            "Before/after build time measurements documented in DataDog",
            "Remediation report published to team wiki",
          ],
        },
      ],
    },
  ],
};

const knowledgeProject: Project = {
  id: "knowledge",
  title: "Expand Knowledge on Technical Stack & Codebase",
  subtitle: "Architectural map, codebase index, and documentation coverage for the full CI/build ecosystem",
  color: "#8B5CF6",
  wikiUrl: "https://wizardsofthecoast.atlassian.net/wiki/spaces/~bodewec/pages/412715769",
  pillars: [
    {
      id: "kn-core", title: "Q1: Core System Flow & Index Foundation", subtitle: "Map the big picture before diving into details", color: "#8B5CF6", icon: "🗺️",
      initiatives: [
        {
          id: "kn-ci-flow", title: "High-Level CI Flow Diagram & System Index", quarters: ["Q1"], dueDate: "Apr 30, 2025",
          description: "Create an index of all existing projects with a broad outline and main links. Complete a high-level CI flow diagram covering major build and release paths. Identify all primary system components.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "kn-cf-learn", type: "learning", title: "Learning: Architecture Diagramming & CI System Concepts", due: "Feb 14, 2025", subtasks: [
              { id: "kn-cf-l1", text: "Read about C4 model for software architecture diagrams — understand Context, Container, Component levels", due: "Feb 7" },
              { id: "kn-cf-l2", text: "Study Mermaid.js or draw.io for creating CI flow diagrams in Confluence/wiki", due: "Feb 7" },
              { id: "kn-cf-l3", text: "Read an overview of how CI/CD systems are typically architected: SCM → CI → artifact store → deploy", due: "Feb 14" },
              { id: "kn-cf-l4", text: "Review the team wiki for any existing architecture docs or diagrams as a starting point", due: "Feb 14" },
            ]},
            { id: "kn-cf-t1", type: "task", title: "Create the project index", due: "Mar 14, 2025", subtasks: [
              { id: "kn-cf-t1a", text: "List every known Jenkins pipeline repo and shared library with its repo URL", due: "Feb 28" },
              { id: "kn-cf-t1b", text: "For each project, write a one-sentence description of its purpose", due: "Mar 7" },
              { id: "kn-cf-t1c", text: "Publish the initial project index to team wiki as a living document", due: "Mar 14" },
            ]},
            { id: "kn-cf-t2", type: "task", title: "Draw the high-level CI flow diagram", due: "Apr 30, 2025", subtasks: [
              { id: "kn-cf-t2a", text: "Identify all primary system components: Jenkins, SCM (GitHub/GitLab), artifact storage (Nexus/Artifactory), monitoring (DataDog), deployment targets", due: "Mar 28" },
              { id: "kn-cf-t2b", text: "Map authentication paths between components (service accounts, tokens, SSH keys)", due: "Apr 4" },
              { id: "kn-cf-t2c", text: "Draw the major build flow: code push → CI trigger → build stages → artifact publish → deploy", due: "Apr 11" },
              { id: "kn-cf-t2d", text: "Draw the major release flow separately, noting differences from the build flow", due: "Apr 18" },
              { id: "kn-cf-t2e", text: "Publish the completed CI flow diagram to team wiki and get review from a senior team member", due: "Apr 30" },
            ]},
          ],
          acceptance: [
            "Project index published with one-sentence descriptions for every known pipeline repo",
            "All primary system components identified (Jenkins, SCM, artifact storage, monitoring, deploy targets)",
            "High-level CI flow diagram completed covering major build and release paths",
            "Authentication paths between components mapped",
          ],
        },
      ],
    },
    {
      id: "kn-stack", title: "Q2: Technical Stack Documentation & Top 20% Projects", subtitle: "Document getting started steps and prioritize the most important projects", color: "#7C3AED", icon: "📚",
      initiatives: [
        {
          id: "kn-stack-docs", title: "Technical Stack Documentation", quarters: ["Q2"], dueDate: "Jul 31, 2025",
          description: "Document all technical stack areas based on system components. Each area should have getting started steps, technical requirements, and how-to-test details.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "kn-sd-learn", type: "learning", title: "Learning: Technical Writing & Getting Started Guide Best Practices", due: "May 16, 2025", subtasks: [
              { id: "kn-sd-l1", text: "Read Google's Technical Writing fundamentals course (free at developers.google.com/tech-writing)", due: "May 2" },
              { id: "kn-sd-l2", text: "Study what a good 'Getting Started' guide looks like — find 2–3 examples from open source projects", due: "May 9" },
              { id: "kn-sd-l3", text: "Read about Docs-as-Code: treating documentation like source code (versioned, reviewed, tested)", due: "May 16" },
            ]},
            { id: "kn-sd-t1", type: "task", title: "Document each primary system component", due: "Jul 31, 2025", subtasks: [
              { id: "kn-sd-t1a", text: "Write a getting started page for Jenkins: how to access, authenticate, run a job, and view logs", due: "May 30" },
              { id: "kn-sd-t1b", text: "Write a getting started page for the SCM system (GitHub/GitLab): branching, PR workflow, webhooks", due: "Jun 13" },
              { id: "kn-sd-t1c", text: "Write a getting started page for artifact storage (Nexus/Artifactory): how to publish and consume artifacts", due: "Jun 27" },
              { id: "kn-sd-t1d", text: "Write a getting started page for DataDog: how to access dashboards, set monitors, and read alerts", due: "Jul 11" },
              { id: "kn-sd-t1e", text: "Write a 'How to Test' section for each component describing how to verify changes locally or in non-prod", due: "Jul 31" },
            ]},
          ],
          acceptance: [
            "Getting started guide published for each primary system component",
            "Technical requirements listed for each component",
            "How-to-test section included for each component",
            "All docs versioned in wiki or Docs-as-Code repo",
          ],
        },
        {
          id: "kn-top20", title: "Top 20% Projects: Overview & Documentation Links", quarters: ["Q2"], dueDate: "Jul 31, 2025",
          description: "Identify the top 20% of pipeline projects by importance/usage. Write an overview for each, link existing documentation, and note where documentation is missing.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "kn-t20-t1", type: "task", title: "Identify and rank the top 20% of projects", due: "May 30, 2025", subtasks: [
              { id: "kn-t20-t1a", text: "Use Jenkins run frequency data and team feedback to rank all pipeline projects by importance", due: "May 16" },
              { id: "kn-t20-t1b", text: "Select the top 20% (roughly 1 in 5 projects) as priority documentation targets", due: "May 23" },
              { id: "kn-t20-t1c", text: "Publish the ranked project list to the team wiki", due: "May 30" },
            ]},
            { id: "kn-t20-t2", type: "task", title: "Write overviews and link docs for top 20%", due: "Jul 31, 2025", subtasks: [
              { id: "kn-t20-t2a", text: "For each top-20% project, write a 3–5 sentence overview: purpose, inputs, outputs, consumers", due: "Jun 20" },
              { id: "kn-t20-t2b", text: "Link all existing documentation (Confluence pages, README files, runbooks) from each project's index entry", due: "Jul 11" },
              { id: "kn-t20-t2c", text: "Flag documentation gaps with a 'Missing Docs' label in the index for each project", due: "Jul 31" },
            ]},
          ],
          acceptance: [
            "Top 20% of projects identified and ranked",
            "Overview written for each top-20% project",
            "Existing documentation linked from project index",
            "Missing documentation flagged with 'Missing Docs' labels",
          ],
        },
      ],
    },
    {
      id: "kn-majority", title: "Q3: Majority Coverage — 50%+ Projects & Stack Requirements", subtitle: "Broaden documentation to cover the majority of the codebase", color: "#6D28D9", icon: "🔬",
      initiatives: [
        {
          id: "kn-50pct", title: "50%+ Projects Listed with Overviews", quarters: ["Q3"], dueDate: "Oct 31, 2025",
          description: "Expand the project index to cover the majority of pipeline projects (50%+), each with existing and missing documentation noted.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "kn-50-t1", type: "task", title: "Document the next tier of projects (20%–50%)", due: "Sep 26, 2025", subtasks: [
              { id: "kn-50-t1a", text: "Work through the ranked project list from Q2, documenting projects from rank 21% to 50%", due: "Aug 29" },
              { id: "kn-50-t1b", text: "Write a 3–5 sentence overview for each project in this tier", due: "Sep 12" },
              { id: "kn-50-t1c", text: "Link existing docs and flag missing documentation for each project", due: "Sep 26" },
            ]},
            { id: "kn-50-t2", type: "task", title: "Review and quality-check 50%+ coverage", due: "Oct 31, 2025", subtasks: [
              { id: "kn-50-t2a", text: "Verify that all projects at 50%+ coverage have at minimum an overview and a status (documented/partial/missing)", due: "Oct 10" },
              { id: "kn-50-t2b", text: "Update the project index to reflect current coverage percentage", due: "Oct 17" },
              { id: "kn-50-t2c", text: "Identify the most critical missing-doc gaps in the 50% covered set and flag for Q4 story work", due: "Oct 31" },
            ]},
          ],
          acceptance: [
            "50%+ of pipeline projects listed in the index with overviews",
            "Existing and missing documentation status noted for each",
            "Project index coverage percentage updated and published",
            "Most critical missing-doc gaps flagged for Q4",
          ],
        },
        {
          id: "kn-stack-requirements", title: "Technical Stack Requirements per Project", quarters: ["Q3"], dueDate: "Oct 31, 2025",
          description: "Identify and document the technical stack requirements for each existing project: language version, dependencies, plugins, credentials, and environment assumptions.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "kn-sr-learn", type: "learning", title: "Learning: Dependency Management & Environment Documentation", due: "Aug 22, 2025", subtasks: [
              { id: "kn-sr-l1", text: "Read about dependency pinning best practices — why floating versions cause build instability", due: "Aug 8" },
              { id: "kn-sr-l2", text: "Study how to read and interpret a Gradle dependency tree (`gradle dependencies`)", due: "Aug 15" },
              { id: "kn-sr-l3", text: "Read about environment variable and credential documentation standards", due: "Aug 22" },
            ]},
            { id: "kn-sr-t1", type: "task", title: "Document stack requirements for all indexed projects", due: "Oct 31, 2025", subtasks: [
              { id: "kn-sr-t1a", text: "For each project in the index, list: required JDK/language version, Gradle version, key plugins", due: "Sep 19" },
              { id: "kn-sr-t1b", text: "List required credentials and environment variables (names only, not values) for each project", due: "Oct 3" },
              { id: "kn-sr-t1c", text: "Note any known environment assumptions (specific OS, network access, agent label requirements)", due: "Oct 17" },
              { id: "kn-sr-t1d", text: "Publish updated stack requirements to each project's index entry", due: "Oct 31" },
            ]},
          ],
          acceptance: [
            "Technical stack requirements documented for all projects in the index",
            "Required credentials/env vars listed by name for each project",
            "Environment assumptions noted for each project",
            "Stack requirements section published in wiki",
          ],
        },
      ],
    },
    {
      id: "kn-complete", title: "Q4: Complete Coverage & Missing Documentation Story Work", subtitle: "Finish the index and create story work for all documentation gaps", color: "#5B21B6", icon: "✅",
      initiatives: [
        {
          id: "kn-remaining", title: "Remaining Projects — Full Index Coverage", quarters: ["Q4"], dueDate: "Dec 31, 2025",
          description: "Document all remaining pipeline projects so that 100% of the codebase has at least an overview entry in the index.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "kn-rem-t1", type: "task", title: "Document remaining 50% of projects", due: "Nov 28, 2025", subtasks: [
              { id: "kn-rem-t1a", text: "Work through all projects not yet covered and write at least a brief overview for each", due: "Oct 31" },
              { id: "kn-rem-t1b", text: "Link any existing READMEs, Confluence pages, or runbooks found during this pass", due: "Nov 14" },
              { id: "kn-rem-t1c", text: "Mark documentation status for every project: Full / Partial / Overview Only / Missing", due: "Nov 28" },
            ]},
            { id: "kn-rem-t2", type: "task", title: "Publish final project index and coverage report", due: "Dec 31, 2025", subtasks: [
              { id: "kn-rem-t2a", text: "Publish the complete project index to team wiki with all entries filled in", due: "Dec 12" },
              { id: "kn-rem-t2b", text: "Write a coverage summary: how many projects are at each documentation status level", due: "Dec 19" },
              { id: "kn-rem-t2c", text: "Publish the coverage summary as part of the end-of-year engineering retrospective doc", due: "Dec 31" },
            ]},
          ],
          acceptance: [
            "100% of pipeline projects have at least an overview entry in the index",
            "Documentation status (Full/Partial/Overview Only/Missing) set for every project",
            "Complete project index published to team wiki",
            "Coverage summary published in end-of-year retrospective",
          ],
        },
        {
          id: "kn-gap-stories", title: "Missing Documentation Story Work", quarters: ["Q4"], dueDate: "Dec 31, 2025",
          description: "Write Jira story work for all identified documentation gaps and missing coverage areas so they are planned for and addressable in the next cycle.",
          owner: "Pipeline Engineer",
          tasks: [
            { id: "kn-gs-learn", type: "learning", title: "Learning: Writing Documentation Stories & Estimating Doc Debt", due: "Oct 17, 2025", subtasks: [
              { id: "kn-gs-l1", text: "Read about how to write actionable documentation stories: what makes a doc story 'done'?", due: "Oct 3" },
              { id: "kn-gs-l2", text: "Study how teams estimate documentation effort — time-boxing by complexity tier (small/medium/large)", due: "Oct 10" },
              { id: "kn-gs-l3", text: "Read about doc debt: how to triage and prioritize missing documentation by risk and impact", due: "Oct 17" },
            ]},
            { id: "kn-gs-t1", type: "task", title: "Write Jira stories for all documentation gaps", due: "Dec 31, 2025", subtasks: [
              { id: "kn-gs-t1a", text: "Collect all 'Missing Docs' flags from the project index into a single Jira epic", due: "Nov 14" },
              { id: "kn-gs-t1b", text: "Write one Jira story per documentation gap with: what's missing, why it matters, and acceptance criteria", due: "Nov 28" },
              { id: "kn-gs-t1c", text: "Estimate each story using complexity tiers (S/M/L)", due: "Dec 12" },
              { id: "kn-gs-t1d", text: "Prioritize the top 10 stories by risk/impact and move them to 'Ready' on the board", due: "Dec 31" },
            ]},
          ],
          acceptance: [
            "Jira epic created for all documentation gaps",
            "Every missing-doc gap has a written story with acceptance criteria",
            "All stories estimated with complexity tiers",
            "Top 10 highest-priority stories in 'Ready' state on the board",
          ],
        },
      ],
    },
  ],
};

export const ALL_PROJECTS: Project[] = [testingProject, jenkinsProject, buildPerfProject, knowledgeProject];
