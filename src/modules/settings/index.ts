import type { ModuleDef } from '../../core/types'
import { GeneralSettings } from './GeneralSettings'
import { setSetting } from './commands'
import { general } from './general'
import { security } from './security'
export const settings: ModuleDef = { id: 'settings', label: 'Settings', icon: 'settings', page: GeneralSettings, commands: [setSetting], subs: [general, security] }
