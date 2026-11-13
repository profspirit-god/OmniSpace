# ROADMAP.md (APPROVED PLAN)
Rank: 3. Unapproved ideas live in docs/PROPOSALS.md. Update status at the end of every session.

## INDEX
- SECTION: Status legend - what the markers mean
- SECTION: Phase gates - what every phase needs before it is closed
- SECTION: Phase 0 - Shell
- SECTION: Phase 1 - Foundation
- SECTION: Phase 2 - Notes, journal, shopping
- SECTION: Phase 3 - Calendar
- SECTION: Phase 4 - Trackers
- SECTION: Phase 5 - Platforms
- SECTION: Phase 6 - Assistant
- SECTION: Parking lot - approved but unscheduled

## SECTION: Status legend
DONE = shipped and verified. ACTIVE = being worked on now. NEXT = scheduled next. LATER = scheduled, not started.

## SECTION: Phase gates
A phase closes only when: its Done-when list is true, `npm.cmd run build` passes, `npm.cmd audit` was run and recorded in STATE.md, STATE.md, CHANGELOG.md and this file are updated, and development is merged to main and the live site was opened and checked.

## SECTION: Phase 0 - Shell [DONE]
Scope: Vite + React + TypeScript app, recursive module registry, navigation (rail, tab bar, drawer), dashboard animation, placeholders for every module, GitHub Pages deploy, foundation docs.
Done when: live site loads; build passes; docs 1-8 shipped.

## SECTION: Phase 1 - Foundation [NEXT]
Scope: storage interface (local first), command registry, unified Settings module, notices (non-fatal errors), export/import/backup, backup encryption, password gate and destructive-action gate, simple/visual view switch, per-module SVG icons.
Done when: data survives reload; full backup exports and restores in a round-trip test; a replace-import is blocked without the password; every error shows what happened and what to do; icons are unique per module.
Depends on: owner approval of Dexie as a dependency (DECISIONS.md).

## SECTION: Phase 2 - Notes, journal, shopping [LATER]
Scope: Second Brain with linked notes and backlinks, journal linked to it, shopping templates with reusable lists, per-store prices and a grocery checklist.
Done when: notes link both ways; a template can be reused with different store prices; all data included in backups.

## SECTION: Phase 3 - Calendar [LATER]
Scope: calendar with custom symbols and a colored work view.
Done when: events and work blocks show symbols and colors; links from trackers can create calendar entries.

## SECTION: Phase 4 - Trackers [LATER]
Scope: progress tracker with streaks, workout tracker with streaks, body stats, body map with muscle highlight (license-checked free SVG).
Done when: streaks count correctly across days; the body map shades muscles by training load; both link to the calendar.

## SECTION: Phase 5 - Platforms [LATER]
Scope: PWA install, APK (Capacitor), EXE (Tauri or Electron), optional Supabase sync, self-hosted font.
Done when: installable on a phone from the browser; an APK and EXE build run the same app; sync (if enabled) restores data on a second device.

## SECTION: Phase 6 - Assistant [LATER]
Scope: command bar, fallback chain of free AI models, assistant that operates the app only through registered commands.
Done when: the assistant completes a multi-step task through commands; destructive commands still require the password.

## SECTION: Parking lot
- Upgrade Vite to a current major to clear the dev-tooling audit finding (own branch, own build check).
- Self-host Work Sans to stop loading it from Google Fonts.
- Content Security Policy meta tag after Phase 1.
