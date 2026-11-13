# docs/CHANGELOG.md (APPEND ONLY, newest first)

## INDEX
- SECTION: Unreleased
- SECTION: 0.1.1 - 2026-11-12
- SECTION: 0.1.0 - 2026-11-12

## SECTION: Unreleased
- feat(core): Phase 1 part 2: notices (notify, notice stack) and settings (default view, motion, backup reminder days) stored through the storage layer; settings.set command; General settings page; Data page now reports results as notices (D-017).
- feat(core): Phase 1 part 1: Dexie storage layer (src/core/storage.ts) and command registry (src/core/commands.ts); ModuleDef gets an optional `commands` list; the Data page shows storage status and a self-test (D-016).
- docs/design: revised the design system to Controlled Violet (D-015); updated theme tokens, reduced ordinary UI glow, restrained dashboard accents, and added keyboard-focus expansion for the desktop sidebar, and changed the browser theme color to match the new background.

## SECTION: 0.1.1 - 2026-11-12
- fix(data): renamed variables in the Data module that used reserved words (import, export); the build now passes (B-001).
- docs: foundation documents (AI instructions, doc map, state, architecture, design system, data and security, git workflow, roadmap, decisions, proposals, buglog).

## SECTION: 0.1.0 - 2026-11-12
- feat: initial shell: modular registry, navigation, dashboard animation, placeholder modules, GitHub Pages deploy.
