import type { ModuleDef } from '../core/types'
export function Placeholder({ mod, trail }: { mod: ModuleDef; trail: ModuleDef[] }) {
  return (<section className="panel placeholder"><p className="crumb">{trail.map(t => t.label).join(' / ')}</p>
    <h1>{mod.label}</h1><p>This part is not built yet. It is listed in ROADMAP.md.</p>
    {mod.subs?.length ? <p>Includes: {mod.subs.map(s => s.label).join(', ')}.</p> : null}</section>)
}
