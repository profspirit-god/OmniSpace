// SECTION: notices. Non-fatal messages. Rule enforced by the types: warnings and errors must say what to do next.
import { useSyncExternalStore } from 'react'
export type NoticeKind = 'info' | 'success' | 'warning' | 'error'
export interface Notice { id: number; kind: NoticeKind; text: string; next?: string }
let list: Notice[] = [], seq = 0
const subs = new Set<() => void>()
const emit = () => subs.forEach(f => f())
export function dismiss(id: number) { list = list.filter(n => n.id !== id); emit() }
export function notify(kind: 'info' | 'success', text: string): number
export function notify(kind: 'warning' | 'error', text: string, next: string): number
export function notify(kind: NoticeKind, text: string, next?: string): number {
  const id = ++seq
  list = [...list, { id, kind, text, next }].slice(-4)
  emit()
  if (kind !== 'error') setTimeout(() => dismiss(id), 6000)
  return id
}
export const useNotices = () => useSyncExternalStore(f => (subs.add(f), () => { subs.delete(f) }), () => list)
