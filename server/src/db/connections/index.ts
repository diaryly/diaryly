import type { Context } from 'hono'
import type { Env } from '../../types'
import type getD1 from './d1'
import { env } from 'hono/adapter'

const DB_DRIVERS = new Map<string, any>()

export function registerDBDriver(name: string, driver: any) {
  DB_DRIVERS.set(name, driver)
}

export function getDB(c: Context): Promise<ReturnType<typeof getD1>> {
  const ENV = env<Env>(c)

  const driver = DB_DRIVERS.get(ENV.DB_TYPE)

  if (!driver) {
    throw new Error(`Unsupported database type: ${ENV.DB_TYPE}`)
  }

  return driver(c)
}
