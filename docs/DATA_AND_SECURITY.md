# docs/DATA_AND_SECURITY.md (DATA AND SECURITY RULES)
Rank: below AI_INSTRUCTIONS.md and DECISIONS.md. Nothing here is built yet unless marked BUILT. All of it is free tooling only.

## INDEX
- SECTION: Principles - the rules behind every choice
- SECTION: Honest limits - what a static site cannot protect
- SECTION: Storage - local first, one storage interface
- SECTION: Record format - fields every record has
- SECTION: Backup, export, import - formats and safety steps
- SECTION: Password gate - what it protects and how it works
- SECTION: Destructive actions - list and required steps
- SECTION: Secrets and keys - repo, env, AI keys
- SECTION: Supabase - optional sync rules
- SECTION: App security hygiene - code-level rules
- SECTION: Privacy - what leaves the device
- SECTION: Status - built vs planned

## SECTION: Principles
1. The owner's data stays on the owner's device by default.
2. Never lose data silently: every overwrite or delete has a backup path and a confirmation.
3. Be honest in the UI and docs about what is and is not protected.
4. Free tools only; no paid storage, no paid security services.
5. Every module stores data through the shared storage interface, never directly.

## SECTION: Honest limits
- OmniSpace is a static site. There is no server to enforce access rules.
- Anyone with access to the unlocked device and browser developer tools can read locally stored data unless it is encrypted at rest. The password gate does not change this by itself.
- The password gate stops accidents and casual access. It is not a vault.
- Browser data can be cleared by the browser, the user or the OS. Backups are the safety net.
- Never write copy that claims "military-grade", "unhackable" or similar.

## SECTION: Storage
PLANNED (Phase 1). Local first, using the browser's IndexedDB through one interface in src/core/storage. Dexie (free, open source) is the proposed wrapper; it is a new dependency and needs owner approval and a DECISIONS.md entry before use (D-009).
- Collections are namespaced per module: <module>.<collection> (for example shopping.lists).
- Request persistent storage (navigator.storage.persist) on first run to lower the chance of automatic eviction; tell the owner whether it was granted.
- Show a backup reminder when the last backup is older than 7 days (PROPOSED value).
- A schemaVersion exists from day one; migrations are written as numbered functions and never edit old data without a pre-migration backup.

## SECTION: Record format
Every record: id (UUID), createdAt, updatedAt (ISO strings), schemaVersion, plus its fields. Links between records (notes, journal) store ids, never copies. Deleting a linked record must not leave a broken link: either remove the link or mark it as missing.

## SECTION: Backup, export, import
Formats:
- Full backup: one JSON file with appVersion, schemaVersion, exportedAt, and all collections. Name: omnispace-backup-YYYY-MM-DD.json.
- Report export (progress, workouts, shopping): CSV and JSON per module, human readable.
- Optional encryption of a full backup: password-derived key (PBKDF2) plus AES-GCM via the browser's Web Crypto API. No third-party crypto library. A forgotten backup password cannot be recovered; say so before the owner sets it.
Import rules:
1. Validate the file (format, schemaVersion). Reject with a clear message that says what is wrong and what to try.
2. Show a preview: counts per module, file date.
3. Offer Merge (add and update by id) or Replace.
4. Replace is destructive: password gate, typed confirmation, and an automatic pre-import backup first.
5. Never partially import: all or nothing.

## SECTION: Password gate
PLANNED (Phase 1).
- The password is never stored. Store only a salted hash (PBKDF2, high iteration count) locally.
- Unlock lasts a short session (PROPOSED: 5 minutes of inactivity), then asks again for destructive actions.
- Failed attempts add increasing delays (1s, 2s, 4s... capped at 60s) (PROPOSED).
- Forgot password: the only recovery is to clear local data and restore from a backup. The reset screen must say this before the owner confirms, and must check that a recent backup exists.
- Changing or removing the password requires the current password.

## SECTION: Destructive actions
Always gated by the password plus a typed confirmation word, and an offer to back up first:
- delete all data
- replace-import
- delete a whole module's data
- change or remove the password
- clear backups or history
- wipe or reset cloud (Supabase) data
Single-record deletes are not gated but must be undoable (an undo notice) or confirmed.

## SECTION: Secrets and keys
- No secrets in the repo, ever. .env and .env.local are git-ignored; .env.example lists variable names only.
- Anything in a Vite client bundle is public. Only VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY may be there. The Supabase service_role key must never appear in the project, in docs, in chat or in commits.
- AI provider keys (assistant, Phase 6): never in the repo. The owner enters them in Settings; they stay on the device. Stored keys are readable by anyone with device access and by any script injected into the page, so say this in the UI and keep the free-tier key scope small. Keys are excluded from exports unless the owner explicitly opts in.
- If a secret is committed by mistake: revoke it at the provider first, then remove it from the repo. Deleting the file does not remove it from git history.

## SECTION: Supabase
PLANNED (Phase 5, optional). Uses the owner's free-tier project on the separate Gmail account.
- Row Level Security must be ON for every table before any data is stored. No table without policies.
- Only the anon key in the app. Sign-in required before any read or write.
- Local first: the device is the source of truth; sync is explicit (manual button first, automatic later).
- Free-tier limits (storage, rows, project pausing after inactivity) must be checked at that time; verify current limits before promising anything.
- Encrypt sensitive modules (journal) on the device before upload if the owner wants it (PROPOSED).

## SECTION: App security hygiene
- Never use dangerouslySetInnerHTML. Notes and journal render through a Markdown parser with sanitizing, or as plain text.
- Validate and limit all imported or typed data (types, sizes).
- No eval, no inline scripts from data, no loading third-party scripts at runtime.
- Add a Content Security Policy meta tag when Phase 1 stabilizes (GitHub Pages cannot set headers, so only meta-tag policies apply and some directives are unsupported there).
- Run `npm.cmd audit` at the start of each phase and record results in STATE.md. Do not use `audit fix --force` without a branch and a build check.
- Run `npm run dev` only while working; close it afterward (known esbuild dev-server advisory, B-003).

## SECTION: Privacy
- No analytics, no trackers, no accounts in the base app.
- Known leak: the Work Sans font is loaded from Google Fonts, which lets Google see the visitor's IP address. Option: self-host the font files (free) in a later phase.
- Exports are plain files the owner controls; nothing is uploaded unless Supabase sync is turned on.

## SECTION: Status
| Item | Status |
|---|---|
| .env ignored, .env.example | Built |
| Storage interface, schema versions | Planned (Phase 1) |
| Export/import/backup, encryption | Planned (Phase 1) |
| Password gate, destructive-action gate | Planned (Phase 1) |
| CSP meta, font self-hosting | Planned |
| Supabase sync | Planned (Phase 5, optional) |
