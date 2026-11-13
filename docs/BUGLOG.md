# docs/BUGLOG.md (APPEND ONLY)
Format: ID | status | date found | symptom | evidence | cause | fix | prevention.

## INDEX
- SECTION: Open
- SECTION: Fixed

## SECTION: Open
- B-003 | OPEN (accepted, dev-only) | 2026-11-12 | npm audit reports 2 vulnerabilities (1 moderate, 1 high) in esbuild and vite. Evidence: `npm.cmd audit` output; advisory says any website could send requests to the running dev server and read the response. Cause: Vite 5 depends on an esbuild version up to 0.24.2. Fix available: upgrade to Vite 8 (breaking). Not in the live build, which is static. Mitigation: run `npm run dev` only while working. Plan: upgrade on its own branch (see ROADMAP Parking lot, D-013).

## SECTION: Fixed
- B-001 | FIXED | 2026-11-12 | GitHub Actions build failed with 10 errors. Evidence: TypeScript messages in src/modules/data/index.ts, data/import/index.ts, data/export/index.ts such as "'import' is not allowed as a variable declaration name" and "Identifier expected". Cause: module variables were named after their ids, and import and export are reserved words. Fix: variables renamed to importData and exportData; ids unchanged. Prevention: rule in AI_INSTRUCTIONS.md section 3 and D-012; run the build before delivering code.
- B-002 | FIXED (workaround) | 2026-11-12 | PowerShell refused `npm install`: "File ...npm.ps1 cannot be loaded because running scripts is disabled on this system" (PSSecurityException). Cause: Windows execution policy blocks npm.ps1. Fix: use `npm.cmd` or set the policy to RemoteSigned for the current user. Prevention: documented in GIT_WORKFLOW.md and AI_INSTRUCTIONS.md section 11.
- B-004 | FIXED | 2026-11-13 | The backup reminder box could not be cleared: typing 14 after the default 7 gave 71, and 0 could not be typed. Evidence: owner test of Settings > General. Cause: the field validated and saved on every keystroke and forced the last valid value back into the box. Fix: settings are now a draft with Save and Discard; the box accepts any typing and shows a hint until the value is valid. Prevention: Forms and dialogs rules in DESIGN_SYSTEM.md and AI_INSTRUCTIONS.md section 3 (D-018).
