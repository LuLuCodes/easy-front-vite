import type { Router /*RouteRecordRaw*/ } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { useUserStoreWithOut } from '@/store/modules/user'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

const LOGIN_PATH = PageEnum.BASE_LOGIN
const HOME_PATH = PageEnum.BASE_HOME

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const token = userStore.getToken

    if (token && to.path === LOGIN_PATH) {
      next(HOME_PATH)
      return
    }

    // token does not exist
    if (!token) {
      if (!to.meta.requiresAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }

    const redirectPath = (from.query.redirect as string) ?? ''
    const redirect = redirectPath ?? decodeURIComponent(redirectPath)
    if (redirect && redirect !== to.path) {
      next(redirect)
      return
    }
    next()
  })

  router.afterEach(() => {
    // 进度条
    NProgress.done()
  })
}
