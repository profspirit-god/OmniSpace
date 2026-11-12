# AI_INSTRUCTIONS.md (SOURCE OF TRUTH)

Every AI working on OmniSpace reads this file first. If anything conflicts with it, this file wins.

## SECTION: 1. File hierarchy (what is true)
1. `AI_INSTRUCTIONS.md` - absolute truth: rules, policies, workflow.
2. `ROADMAP.md` - approved plan and order of work.
3. `README.md` - setup and usage for humans.
4. `docs/CHANGELOG.md`, `docs/BUGLOG.md` - history. Read and append; never rewrite history.
5. `docs/PROPOSALS.md` - ideas only. NOT truth. Nothing there is built until the owner approves it and it moves to ROADMAP.md.
Docs are split into `## SECTION:` headings. Read only the section you need.

## SECTION: 2. Project
OmniSpace: personal productivity app by Rayner. Mobile first, then desktop. Stack: Vite, React, TypeScript, plain CSS. Hosted on GitHub Pages from `main`. Later: Capacitor (APK), Tauri or Electron (EXE), optional Supabase storage.

## SECTION: 3. Hard rules
- No emoji anywhere (UI, code, docs, commit messages). Use SVG line art.
- Everything used in development or in the app must be free. If a paid tool is needed, stop and tell the owner.
- No secrets in the repo. Only the Supabase anon key may be in `.env`, which is git-ignored.
- Be meticulous, detailed, punctual. Avoid mistakes. Never trade quality for speed or tokens.
- Save tokens: read only the needed SECTION, edit only the needed lines, do not re-print unchanged files.
- If a skill is needed, tell the owner which one to get from GitHub. If a reference is needed (for example UI/UX), tell the owner what and where to get it.
- Recommend stacks or tools that benefit the app in `docs/PROPOSALS.md`.

## SECTION: 4. Architecture (modular, recursive)
- Every feature is a folder `src/modules/<id>/index.ts` exporting a `ModuleDef` (`src/core/types.ts`).
- Sub-features use the same `ModuleDef` shape in `subs`, any depth. A sub-feature becomes its own folder when it grows.
- Register a new module only in `src/modules/index.ts`. Do not edit core files to add a feature.
- Actions should be named commands (for example `shopping.addItem`) so the in-app AI and command bar can use them.
- Code is split into labelled `// SECTION:` blocks so the owner can point an AI to one section.

## SECTION: 5. Design system
- Background near true black (`--bg`); panels lighter (`--p1`, `--p2`) to mark focus; selected nav item is rooted on `--bg` with a purple edge.
- System colors red, yellow, orange, green and all tokens live in `src/styles/theme.css`. Line art is purple with glow.
- Font Work Sans. Style: conceptual minimalism, line art.
- Mobile: bottom tab bar + More drawer. Desktop: icon rail that expands on hover.
- Every data view offers a simple view and a visual view.
- Respect reduced motion; keep visible keyboard focus.

## SECTION: 6. Errors, settings, security
- Errors say what happened and where to go next.
- One unified Settings module, plus in-tab settings only when needed.
- Destructive data actions need a password and confirmation. Backups are encrypted. Be honest that a static site cannot give server-grade security.

## SECTION: 7. Git workflow
- `main` = live app (auto-deploys). `development` = integration. `feature/<name>` branches come off `development`.
- Tiny changes may go straight to `development` if they cannot break `main`.
- At the end of every work section, give the owner PowerShell commands in this order: `git status`, extract the zip if one was provided (`Expand-Archive -Force`), `git add`, `git commit -m`, `git push`, then the merge steps when a feature is done.
- Update `docs/CHANGELOG.md` for every change and `docs/BUGLOG.md` for every bug, with evidence (error text, steps, fix).

## SECTION: 8. Multi-AI handoff
The owner switches between AIs. Never ask for context that is in these files. Before finishing, make sure ROADMAP.md and the changelog match the real state so the next AI can continue.

## SECTION: 9. Tools
Create helper scripts in `tools/` when they save effort for the app or its development.
