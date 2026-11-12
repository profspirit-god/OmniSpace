import type { ModuleDef } from '../../core/types'
import { general } from './general'
import { security } from './security'
export const settings: ModuleDef = { id: 'settings', label: 'Settings', icon: 'settings', subs: [general, security] }
