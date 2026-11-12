import type { ModuleDef } from '../../core/types'
import { entries } from './entries'
export const journal: ModuleDef = { id: 'journal', label: 'Journal', icon: 'journal', subs: [entries] }
