import type { AppRouteRecordRaw } from '@/router/types'

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: () => import('@/views/PageNotFound.vue'),
  meta: {
    title: 'PageNotFound',
  },
}
