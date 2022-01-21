import type { Router /*RouteRecordRaw*/ } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { useUserStoreWithOut } from '@/store/modules/user'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

const LOGIN_PATH = PageEnum.BASE_LOGIN

const whitePathList: PageEnum[] = [LOGIN_PATH]

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const token = userStore.getToken

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
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

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    if (to.path === redirect) {
      NProgress.done()
      next({ ...to, replace: true })
    } else {
      next()
    }
  })

  router.afterEach(() => {
    // 进度条
    NProgress.done()
  })
}
