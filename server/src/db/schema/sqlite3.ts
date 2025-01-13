import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const diary = sqliteTable('diary', {
  date: text('date').primaryKey().notNull(),
  content: text('content').notNull(),
  created_at: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`),
})
