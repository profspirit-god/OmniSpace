import { useEffect, useState } from 'react'
import { storage } from '../../core/storage'
import { runCommand } from '../../core/commands'
import { notify } from '../../core/notices'
// SECTION: Data home. Shows storage status and a self-test until export/import/backup are built.
export function DataHome() {
  const [info, setInfo] = useState('Checking storage...')
  const load = () => storage.status()
    .then(s => setInfo(`Records: ${s.records}. Browser keeps data: ${s.persisted ? 'yes' : 'not guaranteed'}.${s.usedBytes != null ? ` Used: ${Math.round(s.usedBytes / 1024)} KB.` : ''}`))
    .catch(e => setInfo(e instanceof Error ? e.message : 'Could not read storage status.'))
  useEffect(() => { load() }, [])
  return (<section className="panel placeholder"><p className="crumb">Data</p><h1>Data</h1>
    <p>{info}</p>
    <p><button onClick={async () => { const r = await runCommand('data.storageTest'); if (r.ok) notify('success', r.message); else notify('error', r.message, 'Reload the page and try again. If it repeats, add it to docs/BUGLOG.md.') }}>Test storage</button>{' '}
      <button onClick={async () => { const ok = await storage.requestPersistence(); if (ok) notify('success', 'The browser will keep your data.'); else notify('warning', 'The browser did not agree to keep your data automatically.', 'Back up often once backups exist.'); load() }}>Keep my data</button></p>
    <p>Export, import and backup are not built yet. They are listed in ROADMAP.md.</p></section>)
}
