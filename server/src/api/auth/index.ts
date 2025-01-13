import { esday } from 'esday'
import { encryptPassword } from '../../utils'

export function getAccessToken(password: string) {
  const token = encryptPassword(password, esday().format('YYYYMMDD'))

  return token
}
