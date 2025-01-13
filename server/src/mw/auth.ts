import { esday } from 'esday'
import { env } from 'hono/adapter'

import { createMiddleware } from 'hono/factory'
import { encryptPassword } from '../utils'

const auth = createMiddleware(async (c, next) => {
  const { PASSWORD } = env(c)
  if (!PASSWORD) {
    return c.json({ msg: 'You should set a password' }, 401)
  }
  const encryptP = encryptPassword(PASSWORD, esday().format('YYYYMMDD'))
  const authorization = c.req.header('Authorization')

  if (!authorization) {
    return c.json({ msg: 'Unauthorized' }, 401)
  }

  // Bearer
  const token = authorization.substring(7)

  if (encryptP !== token) {
    return c.json({ msg: 'Unauthorizede' }, 401)
  }
  await next()
})

export default auth
