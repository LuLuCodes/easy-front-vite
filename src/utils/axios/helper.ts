import { isObject, isString } from '@utils/is'
import { encryptByAes, encryptByMd5 } from '@utils/cipher'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?timestamp=${now}`
  }
  return { timestamp: now }
}

export function joinSign(data: string, url: string): object {
  const sign = encryptByMd5(data)
  return { sign: encryptByAes(sign, url) }
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return
  }

  for (const key in params) {
    const format = params[key]?.format ?? null
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}
