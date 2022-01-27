import type { UserInfo } from '#/store'
import { store } from '@/store'
import { router } from '@/router'
import UaParser, { IResult as UaResult } from 'ua-parser-js'

interface UserState {
  userInfo: UserInfo | null
  token?: string
  ua: UaResult
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    ua: new UaParser().getResult(),
  }),
  getters: {
    getUserInfo(): UserInfo | null {
      return this.userInfo
    },
    getToken(): string {
      return this.token || ''
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
    },
    resetState() {
      this.userInfo = null
      this.token = undefined
    },
    /**
     * @description: login
     */
    async login(params: any): Promise<any> {
      try {
        // TODO: login api
        console.log(params)
        // save token
        this.setToken('token')
        this.setUserInfo({ userId: 123, username: 'leyi', realName: 'leyi', avatar: '' })
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * @description: logout
     */
    async logout() {
      if (this.getToken) {
        try {
          // TODO: logout
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setUserInfo(null)
      router.push('/login')
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
