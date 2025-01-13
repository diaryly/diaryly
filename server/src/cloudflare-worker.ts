import app from './app'
import { registerDBDriver } from './db/connections'
import getD1 from './db/connections/d1'
import getPG from './db/connections/pg'

registerDBDriver('d1', getD1)
registerDBDriver('pg', getPG)

export default app
