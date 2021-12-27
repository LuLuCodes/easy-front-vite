import type { Router, RouteLocationNormalized } from 'vue-router'
import { AxiosCanceler } from '/@/utils/axios/axiosCancel'
import { createPermissionGuard } from './permissionGuard'

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createHttpGuard(router)
  createScrollGuard(router)
  createPermissionGuard(router)
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * @param router
 */
function createHttpGuard(router: Router) {
  const axiosCanceler: Nullable<AxiosCanceler> = new AxiosCanceler()
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}

// Routing switch back to the top
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}
