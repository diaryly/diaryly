import type { Context } from 'hono'
import { drizzle } from 'drizzle-orm/mysql2'
import { env } from 'hono/adapter'
import mysql from 'mysql2/promise'
import * as schema from '../schema/mysql'

export default async function getMySQL(c: Context) {
  const conn = await mysql.createConnection(env(c).DB_CONNECTION)

  return drizzle(conn, { schema, mode: 'default' })
}
