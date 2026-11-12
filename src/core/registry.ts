// SECTION: registry. Add a module by creating src/modules/<id>/index.ts and listing it in src/modules/index.ts.
import type { ModuleDef } from './types'
import { modules } from '../modules'
export const tree: ModuleDef[] = modules
export function findByPath(path: string[]): { mod?: ModuleDef; trail: ModuleDef[] } {
  let list = tree; const trail: ModuleDef[] = []
  for (const seg of path) {
    const m = list.find(x => x.id === seg); if (!m) return { trail }
    trail.push(m); list = m.subs ?? []
  }
  return { mod: trail[trail.length - 1], trail }
}
