export function encryptPassword(password: string, salt: string) {
  const salts = salt.split('').reverse()
  const ps = password.split('').reverse()
  if (salts.length < ps.length) {
    salts.push(...ps)
  }

  let res = ps.map((p, i) => {
    return p + salts[i]
  }).join('')

  if (res.length < 24) {
    res = encryptPassword(res, salt)
  }

  return btoa(res)
}
