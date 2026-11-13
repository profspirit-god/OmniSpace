// SECTION: settings. One record (settings.app / main) in storage, mirrored in memory for instant reads.
import { useSyncExternalStore } from 'react'
import { storage } from './storage'
import { notify } from './notices'
export interface Settings { defaultView: 'simple' | 'visual'; motion: 'system' | 'reduced'; backupReminderDays: number }
export const DEFAULTS: Settings = { defaultView: 'visual', motion: 'system', backupReminderDays: 7 }
// SECTION: validation (the only place that decides what a valid value is)
export function validate(key: string, v: unknown): boolean {
  if (key === 'defaultView') return v === 'simple' || v === 'visual'
  if (key === 'motion') return v === 'system' || v === 'reduced'
  if (key === 'backupReminderDays') return Number.isInteger(v) && (v as number) >= 1 && (v as number) <= 90
  return false
}
let state: Settings = { ...DEFAULTS }
const subs = new Set<() => void>()
const emit = () => { document.documentElement.dataset.motion = state.motion; subs.forEach(f => f()) }
export const getSettings = () => state
export const useSettings = () => useSyncExternalStore(f => (subs.add(f), () => { subs.delete(f) }), getSettings)
// SECTION: load and update
export async function loadSettings() {
  try {
    const r = await storage.get('settings.app', 'main')
    if (r) { const next: Record<string, unknown> = { ...state }; for (const k of Object.keys(DEFAULTS)) if (validate(k, r.data[k])) next[k] = r.data[k]; state = next as unknown as Settings }
  } catch {
    notify('warning', 'Your saved settings could not be read, so defaults are in use.', 'Allow site data for this page, then reload.')
  }
  emit()
}
export async function updateSetting<K extends keyof Settings>(key: K, value: Settings[K]): Promise<boolean> {
  if (!validate(key, value)) return false
  state = { ...state, [key]: value }; emit()
  try { await storage.put('settings.app', { ...state }, 'main') } catch {
    notify('error', 'The setting changed for now but could not be saved.', 'Allow site data for this page, then change it again.')
  }
  return true
}
