import type { Context } from 'hono'
import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from 'hono/adapter'
import { Client } from 'pg'
import * as schema from '../schema/pg'

export default async function getPG(c: Context) {
  const client = new Client({ connectionString: env(c).DB_CONNECTION })
  await client.connect()
  const db = drizzle(client, { schema })

  return db
}
