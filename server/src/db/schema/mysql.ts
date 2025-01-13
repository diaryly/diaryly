import { sql } from 'drizzle-orm'
import { mysqlTable, text, timestamp } from 'drizzle-orm/mysql-core'

export const diary = mysqlTable('diary', {
  date: text('date').primaryKey().notNull(),
  content: text('content').notNull(),
  created_at: timestamp('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: timestamp('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
})
