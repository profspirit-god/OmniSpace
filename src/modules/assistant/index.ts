import type { ModuleDef } from '../../core/types'
import { commands } from './commands'
import { fallbackmodels } from './fallback-models'
export const assistant: ModuleDef = { id: 'assistant', label: 'Assistant', icon: 'assistant', subs: [commands, fallbackmodels] }
