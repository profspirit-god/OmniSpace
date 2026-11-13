# docs/ARCHITECTURE.md (HOW OMNISPACE IS BUILT)
Rank: below AI_INSTRUCTIONS.md and DECISIONS.md. Items marked PLANNED are not in the code yet.

## INDEX
- SECTION: Folder map - where everything lives
- SECTION: Modules - the ModuleDef contract and how to add one
- SECTION: Sub-features - nesting and when to split into folders
- SECTION: Routing - how URLs map to modules
- SECTION: Navigation - desktop rail, mobile bar and drawer
- SECTION: Commands - named-action layer
- SECTION: Data layer - storage boundary
- SECTION: Error handling - what exists and the rules
- SECTION: Settings and notices - settings record, notify rules
- SECTION: View modes - PLANNED simple and visual views
- SECTION: Extension rules - how to change things safely
- SECTION: Built vs planned - quick status table

## SECTION: Folder map
- src/core - types.ts (ModuleDef), registry.ts (tree, findByPath)
- src/modules - one folder per feature; index.ts is the only registration point
- src/components - shared UI: Sidebar, Icon, Placeholder, ErrorBoundary, Dashboard
- src/styles - theme.css (all design tokens)
- docs, tools, public, .github/workflows - documents, helper scripts, static files, deploy
Features never import from other features. Shared code goes in src/core or src/components.

## SECTION: Modules
Contract (src/core/types.ts): ModuleDef { id, label, icon?, page?, subs? }.
- id: kebab-case, unique among siblings, becomes the URL segment.
- page: optional React component; if missing, the Placeholder page shows.
- Variable names must not be JavaScript reserved words (import, export, default, new...). The id may be one; the variable may not (example: id 'export', variable exportData).
Add a module:
1. Create src/modules/<id>/index.ts exporting a ModuleDef.
2. Import and add it to the array in src/modules/index.ts (array order = nav order).
3. Build a page component inside the module folder and set `page`.
No core file changes are needed to add a feature.

## SECTION: Sub-features
Sub-features use the same ModuleDef shape inside `subs`, at any depth. Start as one-line files (id, label, icon). When a sub-feature gets a page or logic, it keeps its own folder (src/modules/<parent>/<sub>/). A sub-feature can have its own subs.

## SECTION: Routing
Hash routing: #/<id>/<sub-id>/... Default is dashboard. registry.findByPath(path[]) walks the tree; unknown paths show the "Page not found" panel. Hash routing is used because GitHub Pages cannot rewrite URLs. Do not add a router library without owner approval.

## SECTION: Navigation
- Desktop: icon rail (56px) expands to 248px on hover. The active module shows its subs underneath.
- Mobile (max-width 768px): bottom bar with the first four modules plus a More button that opens a drawer with the full tree and a scrim.
- Selected item uses the page background color with a purple left edge.
The module array order decides which four appear in the bottom bar. Reorder deliberately.

## SECTION: Commands
BUILT (Phase 1, part 1) in src/core/commands.ts. Every user action is a named command so the command bar and the AI assistant use the same entry points.
- Name format: <module>.<action>, for example shopping.addItem.
- Contract: CommandDef { id, label, destructive?, run(args) } returns { ok, message, data? }. ModuleDef has an optional `commands` list; main.tsx registers every module's commands at start (registerCommands(collectCommands())). runCommand never throws; errors become readable messages. Commands marked destructive are blocked until the password gate exists. Example: data.storageTest.
- The AI assistant may only call registered commands. Destructive commands require the password gate (see DATA_AND_SECURITY.md).

## SECTION: Data layer
BUILT (Phase 1, part 1) in src/core/storage.ts (Dexie, D-016). All reads and writes go through storage.put/get/list/remove/count; only that file imports Dexie. One `records` table keyed [collection+id]; collection names look like module.collection; a record's fields go inside `data`. Local first. Details and rules: DATA_AND_SECURITY.md.

## SECTION: Error handling
Exists: ErrorBoundary wraps every page and resets on route change; not-found panel.
Rules: every error message says what happened and where to go next. Never show a raw stack trace. Log new bugs in docs/BUGLOG.md with evidence.
BUILT (Phase 1, part 2): notify() and the notice stack (see Settings and notices).

## SECTION: Settings and notices
BUILT (Phase 1, part 2).
- Notices: src/core/notices.ts and components/Notices.tsx. notify('success' | 'info', text) or notify('warning' | 'error', text, next). The types require the next-step text for warnings and errors. Errors stay until dismissed; others fade after 6 seconds. Use notices for non-fatal results; ErrorBoundary stays for crashes.
- Settings: src/core/settings.ts. One record, settings.app / main, mirrored in memory (getSettings, useSettings, saveSettings, updateSetting, resetSettings). Add a setting by editing DEFAULTS and validate() there and the General page. Current settings: defaultView, motion, backupReminderDays. The motion setting sets data-motion on the page root, which theme.css uses. Command: settings.set.
- Unsaved changes: src/core/unsaved.ts holds the one active guard { dirty, save, discard }; a form registers it while it is on screen. App.tsx blocks in-app navigation while it is dirty and shows an in-app Dialog (components/Dialog.tsx). The browser's own prompt covers closing or reloading the tab.

## SECTION: View modes
PLANNED. Every data view offers a simple view (plain lists and numbers) and a visual view (charts, colors, body map). The choice is stored per module in settings.

## SECTION: Extension rules
- One change, one purpose. Do not refactor unrelated files in a feature branch.
- Never edit src/core to add a feature; extend the contract in a separate, documented change.
- Add a DECISIONS.md entry for anything that changes the contract, folder layout or stack.
- Update this doc's INDEX and the Built vs planned table when structure changes.

## SECTION: Built vs planned
| Item | Status |
|---|---|
| Module registry, recursive subs | Built |
| Hash routing, not-found page | Built |
| Sidebar, tab bar, More drawer | Built |
| ErrorBoundary | Built |
| Dashboard animation | Built |
| Command registry, storage layer (Dexie) | Built |
| Notices, general settings | Built |
| View mode switch on data screens | Planned |
