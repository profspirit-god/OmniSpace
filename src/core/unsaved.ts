// SECTION: unsaved-changes guard. A form registers one guard while it is on screen. App.tsx reads it.
export interface Guard { dirty: boolean; save: () => Promise<boolean>; discard: () => void }
let guard: Guard | null = null
export const setGuard = (g: Guard | null) => { guard = g }
export const getGuard = () => guard
export const hasUnsaved = () => !!guard?.dirty
export const markClean = () => { if (guard) guard = { ...guard, dirty: false } }
