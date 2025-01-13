import type { Context } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { env } from 'hono/adapter'
import * as schema from '../schema/sqlite3'

export default function getD1(c: Context) {
  return drizzle(env(c).DB, { schema })
}
