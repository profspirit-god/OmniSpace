import { useEffect, useRef, type ReactNode } from 'react'
// SECTION: in-app dialog (replaces browser alert/confirm). First action gets focus: make it the safe one.
export interface DialogAction { label: string; onClick: () => void; kind?: 'primary' | 'danger' }
export function Dialog({ title, children, actions, onClose }: { title: string; children: ReactNode; actions: DialogAction[]; onClose: () => void }) {
  const first = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    first.current?.focus()
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [onClose])
  return (<div className="dialog-scrim" onClick={onClose}>
    <div className="panel dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title" onClick={e => e.stopPropagation()}>
      <h2 id="dlg-title">{title}</h2><div>{children}</div>
      <div className="row end">{actions.map((a, i) => <button key={a.label} ref={i === 0 ? first : undefined} className={a.kind} onClick={a.onClick}>{a.label}</button>)}</div>
    </div></div>)
}
