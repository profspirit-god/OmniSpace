import type { ModuleDef } from '../../core/types'
import { notes } from './notes'
import { links } from './links'
import { graph } from './graph'
export const secondbrain: ModuleDef = { id: 'second-brain', label: 'Second Brain', icon: 'second-brain', subs: [notes, links, graph] }
