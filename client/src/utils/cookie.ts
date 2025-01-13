/**
 *
 * @param key            就是key
 * @param value          就是value
 * @param time:number    以毫秒的形式设置过期时间         ===》3000
 * @param time:string    以时间字符的形式设置过期时间    ===》Sat, 13 Mar 2017 12:25:57 GMT
 * @param time:Date      以Date设置过期时间             ===》new Date(2017, 03, 12)
 *
 * @param defaultTime     如果没有时间参数，设置默认过期时间 单位毫秒
 */

const defaultTime = 86400000 // 24小时
// 设置cookie
export function setCookie(key: string, value: string, time?: number | Date) {
  let invalid = new Date()
  if (time) {
    switch (typeof time) {
      case 'number':
        invalid.setTime(invalid.getTime() + time)
        break
      default:
        invalid = time
    }
  } else {
    invalid.setTime(invalid.getTime() + defaultTime)
  }
  // 字符串拼接cookie
  window.document.cookie = `${key}=${value};path=/;expires=${invalid.toUTCString()}`
}

// 读取cookie
export function getCookie(param: string) {
  let Cparam = ''
  if (document.cookie.length > 0) {
    const arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
    for (const element of arr) {
      const arr2 = element.split('=') // 再次切割
      // 判断查找相对应的值
      if (arr2[0] === param) {
        ;[, Cparam] = arr2
      }
    }
  }
  return Cparam
}

// 删除cookie
export function clearCookie(param: string) {
  setCookie(param, '', -1)
}
