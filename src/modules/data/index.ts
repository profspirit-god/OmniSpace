import type { ModuleDef } from '../../core/types'
import { export } from './export'
import { import } from './import'
import { backup } from './backup'
export const data: ModuleDef = { id: 'data', label: 'Data', icon: 'data', subs: [export, import, backup] }
