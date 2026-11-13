# docs/README.md (DOC MAP)
Rank: informational. Truth lives in AI_INSTRUCTIONS.md.

## INDEX
- SECTION: Read order - the default order for any session
- SECTION: Task map - which file and section to read for each kind of task
- SECTION: File list - every doc and what it holds
- SECTION: Conventions - how docs and code sections work

## SECTION: Read order
1. AI_INSTRUCTIONS.md (INDEX, then sections 0, 3 and 4 at minimum)
2. docs/STATE.md
3. Only the section the task needs, using the Task map below.

## SECTION: Task map
| Task | Read |
|---|---|
| Add a feature or sub-feature | ARCHITECTURE.md (Modules), ROADMAP.md (current phase) |
| Change look, colors, icons, nav | DESIGN_SYSTEM.md |
| Anything storing, exporting, backing up or securing data | DATA_AND_SECURITY.md |
| Commit, branch, merge, deploy | GIT_WORKFLOW.md |
| Fix a bug | BUGLOG.md (Open), then ARCHITECTURE.md |
| Review a new idea | PROPOSALS.md (Intake process), DECISIONS.md |
| Find out what exists now | STATE.md |
| Find out why something was decided | DECISIONS.md |

## SECTION: File list
- AI_INSTRUCTIONS.md - rules (truth)
- ROADMAP.md - approved phases and status
- README.md (root) - human setup
- docs/STATE.md - current snapshot
- docs/DECISIONS.md - decisions and reasons
- docs/ARCHITECTURE.md - how the app is built
- docs/DESIGN_SYSTEM.md - look and feel
- docs/DATA_AND_SECURITY.md - data and security rules
- docs/GIT_WORKFLOW.md - git and deploy
- docs/CHANGELOG.md, docs/BUGLOG.md - history
- docs/PROPOSALS.md - ideas only

## SECTION: Conventions
- Every doc starts with an INDEX and uses `## SECTION: <name>` headings.
- Code uses `// SECTION: <name>` comments so the owner can say "look at SECTION: navigation in Sidebar.tsx".
- Dates are written as YYYY-MM-DD.
