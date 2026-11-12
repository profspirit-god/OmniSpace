import type { ModuleDef } from '../../core/types'
import { exportData } from './export'
import { importData } from './import'
import { backup } from './backup'
export const data: ModuleDef = { id: 'data', label: 'Data', icon: 'data', subs: [exportData, importData, backup] }