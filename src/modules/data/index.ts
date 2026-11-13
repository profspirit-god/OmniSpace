import type { ModuleDef } from '../../core/types'
import { DataHome } from './DataHome'
import { storageTest } from './commands'
import { exportData } from './export'
import { importData } from './import'
import { backup } from './backup'
export const data: ModuleDef = { id: 'data', label: 'Data', icon: 'data', page: DataHome, commands: [storageTest], subs: [exportData, importData, backup] }
