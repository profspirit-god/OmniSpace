# docs/DECISIONS.md (WHY WE CHOSE WHAT WE CHOSE)
Rank: 2, below AI_INSTRUCTIONS.md. Append-only. To change a decision, add a new entry that supersedes the old one; do not edit history.

## INDEX
- SECTION: Entry format
- SECTION: D-001 to D-016 - the decisions
- SECTION: Open questions - decisions waiting on the owner

## SECTION: Entry format
ID | Date | Status (Accepted, Proposed, Superseded) | Decision | Reason | Consequence

## SECTION: D-001 to D-016
- D-001 | 2026-11-12 | Accepted | Stack is Vite, React, TypeScript, plain CSS. Reason: free, fast, runs as a static site, well known to AIs. Consequence: changing the stack needs a new entry and owner approval.
- D-002 | 2026-11-12 | Accepted | Hash routing (#/module/sub). Reason: GitHub Pages cannot rewrite URLs. Consequence: no router library.
- D-003 | 2026-11-12 | Accepted | Recursive module registry (ModuleDef with subs). Reason: add features and sub-features without editing core files. Consequence: modules do not import each other.
- D-004 | 2026-11-12 | Accepted | Host on GitHub Pages, deployed by GitHub Actions from main. Reason: free, owner already uses GitHub. Consequence: repo must be public on a free account.
- D-005 | 2026-11-12 | Accepted | main = live, development = integration, feature branches off development. Reason: owner request; keeps live site stable.
- D-006 | 2026-11-12 | Accepted | No emoji anywhere; SVG line art for all graphics. Reason: owner request; consistent style.
- D-007 | 2026-11-12 | Accepted | Everything must be free (tools, libraries, services, assets). Reason: owner requirement.
- D-008 | 2026-11-12 | Accepted | Local-first storage; Supabase optional later with RLS and anon key only. Reason: free, works offline, owner has a spare account for Supabase.
- D-009 | 2026-11-12 | Proposed | Use Dexie as the IndexedDB wrapper. Reason: simple, free, open source. Status: waits for owner approval at Phase 1.
- D-010 | 2026-11-12 | Accepted | Docs hierarchy: AI_INSTRUCTIONS.md is truth; proposals are ideas only; docs use INDEX and SECTION headings. Reason: multiple AIs must work without re-briefing and read less.
- D-011 | 2026-11-12 | Accepted | Design: near-black background, lighter panels for focus, purple glowing line art, Work Sans, red/yellow/orange/green carry meaning (error, warning, attention, success). Reason: owner brief; color meanings approved.
- D-012 | 2026-11-12 | Accepted | Module variable names must never be reserved words. Reason: bug B-001.
- D-013 | 2026-11-12 | Accepted | Defer the Vite upgrade that fixes the dev-tooling audit finding to its own branch. Reason: the fix is a breaking major upgrade and the finding is dev-only (B-003).
- D-014 | 2026-11-12 | Accepted | The password gate guards against accidents and casual access only; docs and UI must say so. Reason: static site cannot enforce real access control.
- D-015 | 2026-11-13 | Accepted | Replace the glowing-purple treatment in D-011 with Controlled Violet: near-black surfaces, quiet neutral borders, muted violet inactive line art, and primary violet only for active, selected, or focused states; no persistent glow on ordinary UI. Reason: owner selected option A to reduce visual brightness and make the interface more restrained while preserving its violet identity. Consequence: D-015 supersedes only the visual-treatment portion of D-011; D-011 typography and semantic system colors remain accepted. Implement exact tokens and component rules in docs/DESIGN_SYSTEM.md and src/styles/theme.css.

- D-016 | 2026-11-13 | Accepted | Use Dexie (IndexedDB wrapper) for local storage, approved by the owner; supersedes the proposal in D-009. Records live in one `records` table keyed [collection+id], collection names are module.collection, and a record's own fields sit inside a `data` object. Reason: free, simple, open source. Consequence: only src/core/storage.ts may import Dexie.

## SECTION: Open questions
- None for Phase 1: the owner approved Dexie and the proposed values (5-minute unlock window, 7-day backup reminder, lockout delays) on 2026-11-13.
- Choose the EXE wrapper (Tauri or Electron) before Phase 5.
