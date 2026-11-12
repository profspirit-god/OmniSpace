import type { ModuleDef } from '../../core/types'
import { symbols } from './symbols'
import { workview } from './work-view'
export const calendar: ModuleDef = { id: 'calendar', label: 'Calendar', icon: 'calendar', subs: [symbols, workview] }
