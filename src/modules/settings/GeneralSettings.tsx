import { notify } from '../../core/notices'
import { updateSetting, useSettings } from '../../core/settings'
// SECTION: General settings page.
export function GeneralSettings() {
  const s = useSettings()
  const saved = (ok: boolean, next: string) => ok ? notify('success', 'Setting saved.') : notify('warning', 'That value is not allowed.', next)
  return (<section className="panel placeholder"><p className="crumb">Settings / General</p><h1>General</h1>
    <div className="field"><label htmlFor="v">Default view for data</label>
      <select id="v" value={s.defaultView} onChange={async e => saved(await updateSetting('defaultView', e.target.value as 'simple' | 'visual'), 'Pick Simple or Visual.')}>
        <option value="visual">Visual</option><option value="simple">Simple</option></select></div>
    <div className="field"><label htmlFor="m">Motion</label>
      <select id="m" value={s.motion} onChange={async e => saved(await updateSetting('motion', e.target.value as 'system' | 'reduced'), 'Pick Follow device or Reduced.')}>
        <option value="system">Follow device</option><option value="reduced">Reduced (no ambient animation)</option></select></div>
    <div className="field"><label htmlFor="b">Backup reminder (days)</label>
      <input id="b" type="number" min={1} max={90} value={s.backupReminderDays}
        onChange={async e => saved(await updateSetting('backupReminderDays', Number(e.target.value)), 'Enter a whole number from 1 to 90.')} /></div>
    <p>Backups are not built yet, so the reminder does nothing for now.</p></section>)
}
