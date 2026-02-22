import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema.js'

const dbDir = dirname(dirname(dirname(fileURLToPath(import.meta.url)))) + '/data'
mkdirSync(dbDir, { recursive: true })
const sqlite = new Database(`${dbDir}/sqlite.db`)
export const db = drizzle(sqlite, { schema })
export * from './schema.js'
