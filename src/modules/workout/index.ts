import type { ModuleDef } from '../../core/types'
import { routines } from './routines'
import { bodymap } from './body-map'
import { bodystats } from './body-stats'
export const workout: ModuleDef = { id: 'workout', label: 'Workout', icon: 'workout', subs: [routines, bodymap, bodystats] }
