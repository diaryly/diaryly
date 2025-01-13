import type { Context } from 'hono'
import { asc, desc, sql } from 'drizzle-orm'
import { unique } from 'radash'
import { getDB } from '../../db/connections'

export interface GetDiaryDatesParams {
  start?: string
  end?: string
  unit: 'day' | 'month' | 'year'
}
export async function getDiaryDates(c: Context, params: GetDiaryDatesParams) {
  const db = await getDB(c)
  const t = db.select({
    date: sql`date`,
  }).from(sql`diary`)
  if (params.start) {
    t.where(sql`date >= ${params.start}`)
  }
  if (params.end) {
    t.where(sql`date <= ${params.end}`)
  }
  const dates = await t.orderBy(asc(sql`date`))

  switch (params.unit) {
    case 'day':
      return dates.map((d: any) => d.date)
    case 'month':
      return unique(dates.map((d: any) => d.date.slice(0, 7)))
    case 'year':
      return unique(dates.map((d: any) => d.date.slice(0, 4)))
  }
}

export async function getAdjacentDiaryDates(
  c: Context,
  currentDate: string,
): Promise<{ prev: string, next: string }> {
  const db = await getDB(c)
  const prev = await db.select({
    date: sql<string>`date`,
  }).from(sql`diary`).where(sql`date < ${currentDate}`).orderBy(desc(sql`date`)).limit(1)
  const next = await db.select({
    date: sql<string>`date`,
  }).from(sql`diary`).where(sql`date > ${currentDate}`).orderBy(asc(sql`date`)).limit(1)
  return {
    prev: prev[0]?.date || '',
    next: next[0]?.date || '',
  }
}
