import { serve } from '@hono/node-server'
import app from './app'

serve({
  fetch: app.fetch,
  // eslint-disable-next-line node/prefer-global/process
  port: Number(process.env.PORT) || 8787,
})

export default {}
