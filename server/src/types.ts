export interface Env {
  [key: string]: any
  DB_TYPE: 'pg' | 'mysql' | 'd1' | 'sqlite3'
  DB_CONNECTION: string
  DB: IDBDatabase
}
