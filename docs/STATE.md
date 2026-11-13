# docs/STATE.md (CURRENT STATE)
Rank: describes reality, not intent. Update at the end of every session.

## INDEX
- SECTION: Snapshot - date, version, branch, live URL
- SECTION: What exists - built and verified
- SECTION: What is placeholder - listed but not built
- SECTION: Known issues - open problems and warnings
- SECTION: Verified vs unverified - what was actually run
- SECTION: Next step - the single next action

## SECTION: Snapshot
- Date: 2026-11-13
- Version: 0.1.2 (Phase 0 shell, foundation docs, Phase 1 part 1)
- Live: GitHub Pages from main (https://profspirit-god.github.io/OmniSpace/)
- Branches: main (live), development

## SECTION: What exists
- Vite + React + TypeScript app, hash routing, builds with `npm run build`
- Recursive module registry (src/core/registry.ts, types.ts)
- Navigation: desktop icon rail that expands on hover or keyboard focus; mobile bottom bar with a More drawer
- Dashboard: canvas starfield, orbit rings, OmniSpace title; ambient visuals toned down for Controlled Violet
- ErrorBoundary and a not-found page
- GitHub Actions deploy to Pages on push to main
- Foundation docs: AI_INSTRUCTIONS, ROADMAP, README, and docs/ (map, state, architecture, design system, data and security, git workflow, decisions, proposals, changelog, buglog)
- Phase 1 part 1: Dexie storage layer (src/core/storage.ts) and command registry (src/core/commands.ts); the Data page shows storage status, a storage self-test and a Keep my data button (D-016)
- Controlled Violet design tokens and UI styling implemented in src/styles/theme.css; D-015 supersedes D-011 visual treatment

## SECTION: What is placeholder
All modules except Dashboard show a placeholder page: Second Brain (notes, links, graph), Shopping (lists, templates, prices), Calendar (symbols, work view), Progress (tasks, streaks), Workout (routines, body map, body stats), Journal (entries), Assistant (commands, fallback models), Data (export, import, backup), Settings (general, security). Icons are one shared placeholder SVG. Storage and commands exist, but only the Data page's self-test uses them. No settings, notices, export/import/backup or password gate yet.

## SECTION: Known issues
- B-003: npm audit reports 2 vulnerabilities (esbuild/vite) in dev tooling only; not in the live build. Fix is a Vite 8 upgrade (breaking); deferred to its own branch (D-013).
- npm warns the esbuild install script is not approved; the build works anyway.
- GitHub Actions warns about Node 20 and Ubuntu runner changes; harmless for now.
- PowerShell blocks npm.ps1 on the owner's PC; use `npm.cmd` (B-002).
- Work Sans loads from Google Fonts (privacy note in DATA_AND_SECURITY.md).

## SECTION: Verified vs unverified
- Verified by the owner: `npm.cmd install` and `npm.cmd run build` pass locally; the live site loads and looks good.
- Verified by Claude (2026-11-13, clean install in a Linux sandbox): `npm install` and `npm run build` (tsc + vite) pass on the Controlled Violet revision. Not yet confirmed on the owner's PC.
- Verified by Claude: the build also passes with Dexie, storage and commands added (sandbox, 2026-11-13).
- Unverified: storage working in a real browser (press Test storage on the Data page), how the revision looks on screen (desktop and phone), reduced-motion behavior, keyboard navigation.

## SECTION: Next step
Owner runs the Data page storage test. Then Phase 1 part 2: settings and notices.
