// SECTION: command registry. Every user action is a named command: <module>.<action>.
// The command bar and the AI assistant may only call commands registered here.
export interface CommandResult { ok: boolean; message: string; data?: unknown }
export interface CommandDef {
  id: string              // format: module.action, for example shopping.addItem
  label: string
  destructive?: boolean   // blocked until the password gate exists (docs/DATA_AND_SECURITY.md)
  run: (args?: Record<string, unknown>) => Promise<CommandResult> | CommandResult
}
const ID = /^[a-z0-9-]+\.[a-zA-Z0-9]+$/
let registry = new Map<string, CommandDef>()
// SECTION: register (replaces the whole list; safe to call again on hot reload)
export function registerCommands(defs: CommandDef[]) {
  const next = new Map<string, CommandDef>()
  for (const d of defs) {
    if (!ID.test(d.id)) throw new Error(`Bad command id "${d.id}". Use module.action, for example shopping.addItem.`)
    if (next.has(d.id)) throw new Error(`Duplicate command id "${d.id}". Each command id must be unique.`)
    next.set(d.id, d)
  }
  registry = next
}
export const listCommands = (): CommandDef[] => [...registry.values()]
// SECTION: run (never throws; errors become readable messages)
export async function runCommand(id: string, args?: Record<string, unknown>): Promise<CommandResult> {
  const c = registry.get(id)
  if (!c) return { ok: false, message: `Unknown command "${id}". Check the command list for valid names.` }
  if (c.destructive) return { ok: false, message: `"${c.label}" deletes data and needs the password gate, which is not built yet.` }
  try { return await c.run(args) } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : `"${c.label}" failed. Reload and try again.` }
  }
}
