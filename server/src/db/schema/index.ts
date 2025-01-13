import type { Context } from 'hono'
import type { Env } from '../../types'
import { env } from 'hono/adapter'
import * as mysqlDiary from './mysql'
import * as pgDiary from './pg'
import * as sqliteDiary from './sqlite3'

export function Table<T extends keyof typeof sqliteDiary>(c: Context, table: T): typeof sqliteDiary[T] {
  const dbType = env<Env>(c).DB_TYPE

  switch (dbType) {
    case 'sqlite3':
      return sqliteDiary[table]
    case 'mysql':
      // @ts-expect-error xx
      return mysqlDiary[table]
    case 'pg':
      // @ts-expect-error xx
      return pgDiary[table]
    case 'd1':
      return sqliteDiary[table]
    default:
      throw new Error(`Unsupported database type: ${dbType}`)
  }
}
