import { useUserStoreWithOut } from '@/store/modules/user'

export function checkStatus(status: number, msg: string): void {
  const userStore = useUserStoreWithOut()
  let errMessage = ''

  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      userStore.setToken(undefined)
      errMessage = msg || '用户没有权限，请重新登录'
      userStore.logout()
      break
    case 403:
      errMessage = '用户被禁止访问'
      break
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误,未找到该资源'
      break
    case 405:
      errMessage = '网络请求错误,请求方法未允许'
      break
    case 408:
      errMessage = '网络请求超时'
      break
    case 500:
      errMessage = '服务器错误,请联系管理员'
      break
    case 501:
      errMessage = '服务器不支持当前请求'
      break
    case 502:
      errMessage = '网络错误'
      break
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护'
      break
    case 504:
      errMessage = '网络超时'
      break
    case 505:
      errMessage = 'http版本不支持该请求'
      break
    default:
  }

  if (errMessage) {
    throw new Error(errMessage)
  }
}
