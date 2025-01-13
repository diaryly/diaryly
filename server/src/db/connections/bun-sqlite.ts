import type { Context } from 'hono'
// @ts-ignore
import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { env } from 'hono/adapter'
import * as schema from '../schema/sqlite3'

export default function getBunSqlite(c: Context) {
  const sqlite = new Database(env(c).DB_CONNECTION)
  const db = drizzle(sqlite, { schema })

  return db
}
