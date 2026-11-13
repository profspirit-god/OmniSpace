// SECTION: storage. The ONLY file that imports Dexie or touches IndexedDB. Local first.
import Dexie, { type Table } from 'dexie'
export const SCHEMA_VERSION = 1
export interface OmniRecord {
  collection: string; id: string; createdAt: string; updatedAt: string
  schemaVersion: number; data: Record<string, unknown>
}
export class StorageError extends Error {}
class OmniDb extends Dexie {
  records!: Table<OmniRecord, [string, string]>
  constructor() { super('omnispace'); this.version(1).stores({ records: '[collection+id], collection, updatedAt' }) }
}
const db = new OmniDb()
const NAME = /^[a-z0-9-]+\.[a-z0-9-]+$/
function check(collection: string) {
  if (!NAME.test(collection)) throw new StorageError(`Bad collection name "${collection}". Use module.collection, for example shopping.lists.`)
}
async function guard<T>(what: string, fn: () => Promise<T>): Promise<T> {
  try { return await fn() } catch (e) {
    if (e instanceof StorageError) throw e
    throw new StorageError(`Could not ${what}. Browser storage may be blocked or full. Allow site data for this page (and avoid private windows), free some space, then try again.`)
  }
}
// SECTION: records API
export const storage = {
  put: (collection: string, data: Record<string, unknown>, id?: string) => guard('save data', async () => {
    check(collection)
    const rid = id ?? crypto.randomUUID(), now = new Date().toISOString()
    const old = await db.records.get([collection, rid])
    const rec: OmniRecord = { collection, id: rid, createdAt: old?.createdAt ?? now, updatedAt: now, schemaVersion: SCHEMA_VERSION, data }
    await db.records.put(rec); return rec
  }),
  get: (collection: string, id: string) => guard('read data', async () => { check(collection); return db.records.get([collection, id]) }),
  list: (collection: string) => guard('read data', async () => { check(collection); return db.records.where('collection').equals(collection).toArray() }),
  remove: (collection: string, id: string) => guard('delete data', async () => { check(collection); await db.records.delete([collection, id]) }),
  count: (collection?: string) => guard('read data', async () => collection ? (check(collection), db.records.where('collection').equals(collection).count()) : db.records.count()),
  // SECTION: persistence (asks the browser not to evict data automatically)
  requestPersistence: async (): Promise<boolean> => (await navigator.storage?.persist?.()) ?? false,
  status: async () => ({
    persisted: (await navigator.storage?.persisted?.()) ?? false,
    records: await storage.count(),
    usedBytes: (await navigator.storage?.estimate?.())?.usage,
  }),
}
