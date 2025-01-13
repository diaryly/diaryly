import type { Context } from 'hono'
import { count, eq, sql } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'
import { getDB } from '../../db/connections'
import { Table } from '../../db/schema'

export interface ListDiariesParams {
  pagesize?: number
  pagenum?: number
  truncate?: number
}

export async function listDiaries(c: Context, params: ListDiariesParams) {
  const pagesize = Math.min(params.pagesize || 10, 50)
  const pagenum = params.pagenum || 1

  const db = await getDB(c)
  const diaries = await db.query.diary.findMany({
    limit: pagesize,
    offset: (pagenum - 1) * pagesize,
    orderBy: (d, { desc }) => desc(d.date),
  })
  const total = await db.select({ count: count() }).from(sql`diary`)

  let realDiaries = diaries

  if (params.truncate) {
    realDiaries = diaries.map(d => ({
      ...d,
      content: d.content.slice(0, params.truncate),
    }))
  }

  return {
    data: realDiaries,
    total: total[0]?.count || 0,
  }
}

export async function getDiary(c: Context, date: string) {
  const db = await getDB(c)
  const diary = await db.query.diary.findFirst({
    where(fields, operators) {
      return operators.eq(fields.date, date)
    },
  })
  if (!diary) {
    throw new HTTPException(404, { message: 'Diary not found' })
  }
  return diary
}

export async function createOrUpdateDiary(c: Context, data: { date: string, content: string }) {
  const db = await getDB(c)
  const diary = await db.query.diary.findFirst({
    where(fields, operators) {
      return operators.eq(fields.date, data.date)
    },
  })
  if (diary) {
    await db.update(Table(c, 'diary')).set({
      ...data,
      updated_at: sql`CURRENT_TIMESTAMP`,
    }).where(sql`date = ${data.date}`)
    return
  }
  await db.insert(Table(c, 'diary')).values({
    ...data,
    created_at: sql`CURRENT_TIMESTAMP`,
    updated_at: sql`CURRENT_TIMESTAMP`,
  })
}

export async function deleteDiary(c: Context, date: string) {
  const db = await getDB(c)
  const tb = Table(c, 'diary')
  await db.delete(tb).where(eq(tb.date, date))
}

export async function isDiaryExist(c: Context, date: string) {
  const db = await getDB(c)
  const tb = Table(c, 'diary')
  const diary = await db.select({
    date: tb.date,
  }).from(tb).where(sql`date = ${date}`).limit(1)
  return !!diary.length
}

export * from './dates'
