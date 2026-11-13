import type { CommandDef } from '../../core/commands'
import { DEFAULTS, getSettings, updateSetting, type Settings } from '../../core/settings'
// SECTION: settings.set. Args: { key, value }.
export const setSetting: CommandDef = {
  id: 'settings.set', label: 'Change a setting',
  run: async (args) => {
    const key = String(args?.key ?? '')
    if (!(key in DEFAULTS)) return { ok: false, message: `Unknown setting "${key}". Valid settings: ${Object.keys(DEFAULTS).join(', ')}.` }
    const ok = await updateSetting(key as keyof Settings, args?.value as never)
    return ok ? { ok: true, message: `Setting "${key}" is now ${String(getSettings()[key as keyof Settings])}.` }
      : { ok: false, message: `That value is not allowed for "${key}". Nothing was changed. Check the Settings page for valid choices.` }
  },
}
