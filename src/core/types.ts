// SECTION: module contract. Every feature AND sub-feature uses this same shape (recursive).
import type { ComponentType } from 'react'
import type { CommandDef } from './commands'
export interface ModuleDef {
  id: string            // unique, kebab-case, also the URL segment
  label: string
  icon?: string         // key for components/Icon (placeholder for now)
  page?: ComponentType  // omit to show the placeholder page
  subs?: ModuleDef[]    // sub-features, any depth
  commands?: CommandDef[] // named actions this module offers
}
