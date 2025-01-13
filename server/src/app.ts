import { Hono } from 'hono'
import { env } from 'hono/adapter'
import { cors } from 'hono/cors'
import { getAccessToken } from './api/auth'
import { createOrUpdateDiary, deleteDiary, getAdjacentDiaryDates, getDiary, getDiaryDates, isDiaryExist, listDiaries } from './api/diary'
import auth from './mw/auth'

const app = new Hono()

app.get('/diary', async (c) => {
  const { ps, pn, truncate } = c.req.query()
  const diaries = await listDiaries(c, { pagesize: Number(ps), pagenum: Number(pn), truncate: Number(truncate) })
  return c.json(diaries)
})

app.get('/diary/:date', async (c) => {
  const date = c.req.param('date')
  const diary = await getDiary(c, date)
  return c.json(diary)
})

app.get('/dates', async (c) => {
  const { start, end, unit } = c.req.query()

  const realUnit = (['day', 'month', 'year'].includes(unit || '') ? unit : 'year') as 'day' | 'month' | 'year'

  const dates = await getDiaryDates(c, { start, end, unit: realUnit })
  return c.json({
    dates,
  })
})

app.get('/dates/:date', async (c) => {
  const date = c.req.param('date')
  const { prev, next } = await getAdjacentDiaryDates(c, date)
  return c.json({ prev, next })
})

app.get('/diary/exist/:date', async (c) => {
  try {
    const date = c.req.param('date')
    const res = await isDiaryExist(c, date)
    return c.json({ exist: res })
  }
  catch {
    return c.json({ msg: 'error' }, 500)
  }
})

app.post('/diary', async (c) => {
  try {
    const { date, content } = await c.req.json()
    if (!date || !content) {
      return c.json({ msg: 'date and content are required' }, 500)
    }
    await createOrUpdateDiary(c, { date, content })
    return c.json({ msg: 'ok' })
  }
  catch { return c.json({ msg: 'date and content are required' }, 500) }
})

app.delete('/diary/:date', async (c) => {
  try {
    const date = c.req.param('date')
    await deleteDiary(c, date)
    return c.json({ msg: 'ok' })
  }
  catch { return c.json({ msg: 'error' }, 500) }
})

const api = new Hono()
api.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400,
}))
api.post('/api/login', async (c) => {
  const { PASSWORD } = env(c)
  if (!PASSWORD) {
    return c.json({ msg: 'you must set a password' }, 401)
  }
  const { password } = await c.req.json()
  if (PASSWORD !== password) {
    return c.json({ msg: 'error password' }, 401)
  }

  return c.json({ access_token: getAccessToken(password) })
})

api.use('/api/*', auth)

api.route('/api', app)
api.get('/', (c) => {
  return c.text('Hello just diary!')
})

export default api
