import type { CommandDef } from '../../core/commands'
import { storage } from '../../core/storage'
// SECTION: data.storageTest. Saves, reads back and deletes one test record.
export const storageTest: CommandDef = {
  id: 'data.storageTest', label: 'Test storage',
  run: async () => {
    const rec = await storage.put('data.selftest', { note: 'hello' })
    const back = await storage.get('data.selftest', rec.id)
    await storage.remove('data.selftest', rec.id)
    const gone = await storage.get('data.selftest', rec.id)
    const ok = back?.data.note === 'hello' && gone === undefined
    return { ok, message: ok ? 'Storage works: saved, read back and deleted a test record.'
      : 'Storage returned unexpected data. Reload and try again. If it repeats, add it to docs/BUGLOG.md.' }
  },
}
