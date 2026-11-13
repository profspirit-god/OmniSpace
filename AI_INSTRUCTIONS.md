# AI_INSTRUCTIONS.md (SOURCE OF TRUTH)

If any file, message or memory conflicts with this file, this file wins.

## INDEX (jump to a section by its exact heading)
- SECTION: 0. Session protocol - what to do at start and end of every session
- SECTION: 1. File hierarchy - which file outranks which
- SECTION: 2. Project facts - what OmniSpace is, locked stack
- SECTION: 3. Hard rules - never-break rules (no emoji, free only, secrets, reserved words)
- SECTION: 4. Working standards - quality, tokens, truthfulness, builds
- SECTION: 5. Architecture summary - modules and commands in brief
- SECTION: 6. Design summary - look and feel in brief
- SECTION: 7. Errors, settings, security - behavior rules
- SECTION: 8. Git - branch model in brief
- SECTION: 9. Documentation rules - how docs are written and ranked
- SECTION: 10. When to ask the owner - what needs a question
- SECTION: 11. Owner context - how to talk to and instruct the owner

## SECTION: 0. Session protocol
Start: read this file, then docs/STATE.md, then only the SECTION of other docs the task needs. Never ask the owner for context that is in these files.
End: update docs/STATE.md, docs/CHANGELOG.md, docs/BUGLOG.md (if bugs) and ROADMAP.md status. Then give the owner the command block from docs/GIT_WORKFLOW.md.

## SECTION: 1. File hierarchy (highest rank wins)
1. AI_INSTRUCTIONS.md - rules and policy (absolute truth)
2. docs/DECISIONS.md - approved decisions and their reasons
3. ROADMAP.md - approved plan and order of work
4. docs/ARCHITECTURE.md, DESIGN_SYSTEM.md, DATA_AND_SECURITY.md, GIT_WORKFLOW.md - how things are built
5. docs/STATE.md - what exists right now
6. README.md - human setup guide
7. docs/CHANGELOG.md, docs/BUGLOG.md - history (append only)
8. docs/PROPOSALS.md - ideas only, NOT truth. Nothing is built from it until the owner approves it and it is moved to ROADMAP.md and DECISIONS.md.

## SECTION: 2. Project facts
OmniSpace: personal productivity app by Rayner. Mobile first, then desktop. Stack (locked): Vite, React, TypeScript, plain CSS, hash routing. Hosting: GitHub Pages from main. Planned: PWA, Capacitor (APK), Tauri or Electron (EXE), optional Supabase. Changing the stack needs owner approval and a DECISIONS.md entry.

## SECTION: 3. Hard rules
- No emoji anywhere (UI, code, docs, commits, replies). Use SVG line art.
- Everything must be free: tools, libraries, services, assets. If something needs payment, stop and tell the owner.
- No secrets in the repo. Only the Supabase anon key may be in .env (git-ignored). Never a service key.
- Module variable names must never be JavaScript reserved words (import, export, default, new...). The id string may be one; the variable may not.
- Never delete or overwrite user data without explicit confirmation and a backup path.
- Never use window.alert, confirm or prompt; use the in-app Dialog and notices. Forms never block typing or clearing a field: use a draft with Save and Discard (see docs/DESIGN_SYSTEM.md, Forms and dialogs).
- Add dependencies only when needed, free, maintained, and approved by the owner.

## SECTION: 4. Working standards
- Be meticulous, detailed and punctual. Avoid mistakes. Never sacrifice quality to save time or tokens.
- Save tokens: read only the needed SECTION, edit only the needed lines, do not re-print unchanged files.
- Truthfulness: never say something was built, tested or passing unless it was actually run. State what is unverified.
- Before delivering code, run `npm run build` if you can; if you cannot, tell the owner to run `npm.cmd run build` and what a pass looks like.
- Code is split into labelled `// SECTION:` blocks so the owner can point an AI to one.
- Create helper tools in tools/ when they save effort.

## SECTION: 5. Architecture summary
Modules are folders in src/modules, each exporting a ModuleDef; sub-features nest in `subs` at any depth; modules are registered only in src/modules/index.ts. Actions are named commands (for example shopping.addItem) so the command bar and the AI assistant use the same entry points. Details: docs/ARCHITECTURE.md.

## SECTION: 6. Design summary
Controlled violet on a near-black foundation. Use near-black panels, thin neutral borders, muted violet for inactive SVG line art, and primary violet only for active, selected, or focused elements. No persistent glow on ordinary icons, panels, or navigation. Keep the conceptual-minimalist line-art style, Work Sans, and functional red/yellow/orange/green system colors. The dashboard may retain restrained ambient linework, but it must not overpower the application interface. Every data view offers simple and visual modes. Exact tokens and component rules: docs/DESIGN_SYSTEM.md.

## SECTION: 7. Errors, settings, security
Errors say what happened and where to go next. One unified Settings module, plus in-tab settings only when needed. Destructive data actions need a password and confirmation. Backups are encrypted. A static site cannot give server-grade security; do not claim it does. Details: docs/DATA_AND_SECURITY.md.

## SECTION: 8. Git
main = live. development = integration. feature/<name> off development. Tiny safe changes may go straight to development. End every work section with the command block in docs/GIT_WORKFLOW.md (status, extract zip, add, commit, push, merge).

## SECTION: 9. Documentation rules
Docs are split into `## SECTION:` headings and start with an INDEX listing every section. When adding or renaming a section, update the INDEX in the same edit. Logs are append-only. Use absolute dates. When docs conflict, the higher rank in section 1 wins. Record every approved decision and its reason in docs/DECISIONS.md.

## SECTION: 10. When to ask the owner
Ask when: a skill is needed (say which one and where on GitHub), a reference is needed (say what and where to get it), something would cost money, or the request is ambiguous. Ask one clear question at a time.

## SECTION: 11. Owner context
Windows, PowerShell, VS Code, GitHub. Give commands as fully detailed numbered steps with the expected output and a fix for the likely failure. If PowerShell blocks npm, use `npm.cmd`. Always flag difficulties and workarounds honestly.
