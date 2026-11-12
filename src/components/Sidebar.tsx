import { useState } from 'react'
import { tree } from '../core/registry'
import type { ModuleDef } from '../core/types'
import { Icon } from './Icon'
// SECTION: navigation. Desktop: icon rail, expands on hover. Mobile: bottom bar (first 4) + More drawer with full tree.
function Item({ m, base, cur, go, depth }: { m: ModuleDef; base: string; cur: string; go: () => void; depth: number }) {
  const p = base + m.id, on = cur === p || cur.startsWith(p + '/')
  return (<>
    <a href={'#/' + p} onClick={go} className={'nav-item' + (on ? ' on' : '')} style={{ paddingLeft: 12 + depth * 14 }}>
      <Icon name={m.icon} size={depth ? 16 : 20} /><span className="nav-label">{m.label}</span></a>
    {on && m.subs?.map(s => <Item key={s.id} m={s} base={p + '/'} cur={cur} go={go} depth={depth + 1} />)}</>)
}
export function Sidebar({ cur }: { cur: string }) {
  const [open, setOpen] = useState(false), close = () => setOpen(false)
  return (<>
    <nav className={'sidebar' + (open ? ' open' : '')} aria-label="Main">
      <div className="side-top"><Icon name="menu" /><span className="nav-label side-title">OmniSpace</span></div>
      {tree.map(m => <Item key={m.id} m={m} base="" cur={cur} go={close} depth={0} />)}</nav>
    <nav className="tabbar" aria-label="Quick">
      {tree.slice(0, 4).map(m => <a key={m.id} href={'#/' + m.id} className={cur.startsWith(m.id) ? 'on' : ''}><Icon name={m.icon} /><span>{m.label}</span></a>)}
      <button onClick={() => setOpen(!open)}><Icon name="more" /><span>More</span></button></nav>
    {open && <div className="scrim" onClick={close} />}</>)
}
