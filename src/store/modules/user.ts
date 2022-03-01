import type { UserInfo } from '#/store'
import { store } from '@/store'
import { router } from '@/router'
import UaParser, { IResult as UaResult } from 'ua-parser-js'
import { Http } from '@/utils/axios'

interface LoginInfo {
  username: string
  password: string
}
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
    async login(params: LoginInfo): Promise<any> {
      try {
        const { userId, username, realname, avatar, token } = await Http.post({
          data: {
            username: params.username,
            password: params.password,
          },
          url: '/user/login',
        })
        // save token
        if (token) {
          this.setToken(token)
          this.setUserInfo({ userId, username, realname, avatar })
          await router.replace('/home')
        }
      } catch (error: any) {
        throw new Error(error.message)
      }
    },
    /**
     * @description: logout
     */
    async logout() {
      if (this.getToken) {
        try {
          // TODO: logout
        } catch (error: any) {
          throw new Error(error.message)
        }
      }
      this.setToken(undefined)
      this.setUserInfo(null)
      await router.replace('/login')
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
