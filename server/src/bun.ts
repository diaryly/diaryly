import app from './app'
import { registerDBDriver } from './db/connections'
import getBunSqlite from './db/connections/bun-sqlite'
import getMySQL from './db/connections/mysql'
import getPG from './db/connections/pg'

registerDBDriver('pg', getPG)
registerDBDriver('sqlite3', getBunSqlite)
registerDBDriver('mysql', getMySQL)

export default {
  // eslint-disable-next-line node/prefer-global/process
  port: Number(process.env.PORT) || 8787,
  fetch: app.fetch,
}
