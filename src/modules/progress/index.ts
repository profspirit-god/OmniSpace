import type { ModuleDef } from '../../core/types'
import { tasks } from './tasks'
import { streaks } from './streaks'
export const progress: ModuleDef = { id: 'progress', label: 'Progress', icon: 'progress', subs: [tasks, streaks] }
