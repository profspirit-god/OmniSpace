import { dismiss, useNotices } from '../core/notices'
// SECTION: notice stack. Errors stay until dismissed; others fade after 6 seconds.
export function Notices() {
  const list = useNotices()
  return (<div className="notices">{list.map(n => (
    <div key={n.id} className={'notice ' + n.kind} role={n.kind === 'error' || n.kind === 'warning' ? 'alert' : 'status'}>
      <div><p>{n.text}</p>{n.next && <p className="next">{n.next}</p>}</div>
      <button onClick={() => dismiss(n.id)} aria-label="Dismiss message">Dismiss</button></div>))}</div>)
}
