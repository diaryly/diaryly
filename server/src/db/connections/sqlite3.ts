import type { Context } from 'hono'
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { env } from 'hono/adapter'
import * as schema from '../schema/sqlite3'

export default function getBetterSqlite3(c: Context) {
  const db = new Database(env(c).DB_CONNECTION)
  return drizzle(db, { schema })
}
