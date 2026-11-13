import { useEffect, useState } from 'react'
import { Dialog } from '../../components/Dialog'
import { notify } from '../../core/notices'
import { DEFAULTS, resetSettings, saveSettings, useSettings, validate, type Settings } from '../../core/settings'
import { setGuard } from '../../core/unsaved'
// SECTION: General settings. Edits are a draft until Save; any typing is allowed.
interface Draft { defaultView: string; motion: string; days: string }
const toDraft = (s: Settings): Draft => ({ defaultView: s.defaultView, motion: s.motion, days: String(s.backupReminderDays) })
export function GeneralSettings() {
  const s = useSettings()
  const [draft, setDraft] = useState<Draft>(() => toDraft(s))
  const [confirmReset, setConfirmReset] = useState(false)
  const saved = toDraft(s)
  const dirty = draft.defaultView !== saved.defaultView || draft.motion !== saved.motion || draft.days.trim() !== saved.days
  const daysOk = /^\d{1,3}$/.test(draft.days.trim()) && validate('backupReminderDays', Number(draft.days.trim()))
  useEffect(() => { if (!dirty) setDraft(toDraft(s)) }, [s]) // follow outside changes while nothing is being edited
  const discard = () => setDraft(toDraft(s))
  const save = async (): Promise<boolean> => {
    if (!daysOk) return false
    const r = await saveSettings({ defaultView: draft.defaultView as Settings['defaultView'], motion: draft.motion as Settings['motion'], backupReminderDays: Number(draft.days.trim()) })
    if (r === 'saved') notify('success', 'Settings saved.')
    return r !== 'invalid'
  }
  useEffect(() => { setGuard({ dirty, save, discard }); return () => setGuard(null) }, [dirty, daysOk, draft, s])
  const set = (k: keyof Draft, v: string) => setDraft(d => ({ ...d, [k]: v }))
  return (<section className="panel placeholder"><p className="crumb">Settings / General</p><h1>General</h1>
    <div className="field"><label htmlFor="v">Default view for data</label>
      <select id="v" value={draft.defaultView} onChange={e => set('defaultView', e.target.value)}><option value="visual">Visual</option><option value="simple">Simple</option></select></div>
    <div className="field"><label htmlFor="m">Motion</label>
      <select id="m" value={draft.motion} onChange={e => set('motion', e.target.value)}><option value="system">Follow device</option><option value="reduced">Reduced (no ambient animation)</option></select></div>
    <div className="field"><label htmlFor="b">Backup reminder (days)</label>
      <input id="b" type="text" inputMode="numeric" value={draft.days} onChange={e => set('days', e.target.value)} aria-invalid={!daysOk} aria-describedby="b-hint" />
      {!daysOk && <p id="b-hint" className="err">Enter a whole number from 1 to 90. Save stays off until then.</p>}</div>
    <p>Backups are not built yet, so the reminder does nothing for now.</p>
    {dirty && <div className="unsaved" role="status">You have unsaved changes. Save or discard them before leaving this page.</div>}
    <div className="row">
      <button className="primary" disabled={!dirty || !daysOk} onClick={() => void save()}>Save changes</button>
      <button disabled={!dirty} onClick={discard}>Discard changes</button>
      <button className="danger" onClick={() => setConfirmReset(true)}>Reset to defaults</button></div>
    {confirmReset && <Dialog title="Reset all settings?" onClose={() => setConfirmReset(false)} actions={[
      { label: 'Cancel', onClick: () => setConfirmReset(false) },
      { label: 'Reset settings', kind: 'danger', onClick: async () => { setConfirmReset(false); const r = await resetSettings(); setDraft(toDraft(DEFAULTS)); if (r === 'saved') notify('success', 'Settings were reset to defaults.') } }]}>
      <p>This replaces your saved settings with the defaults: Visual view, Follow device motion and a 7-day backup reminder. It cannot be undone.</p></Dialog>}
  </section>)
}
