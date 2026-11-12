import type { ModuleDef } from '../../core/types'
import { lists } from './lists'
import { templates } from './templates'
import { prices } from './prices'
export const shopping: ModuleDef = { id: 'shopping', label: 'Shopping', icon: 'shopping', subs: [lists, templates, prices] }
