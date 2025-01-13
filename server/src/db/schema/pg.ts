import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const diary = pgTable('diary', {
  date: text('date').primaryKey().notNull(),
  content: text('content').notNull(),
  created_at: timestamp('created_at', { precision: 6, withTimezone: true, mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: timestamp('updated_at', { precision: 6, withTimezone: true, mode: 'string' }).default(sql`(CURRENT_TIMESTAMP)`),
})
