import type { AppRouteModule } from '/@/router/types'

const about: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: () => import('/@/views/About.vue'),
  meta: {
    hideChildrenInMenu: true,
    icon: '',
    title: '关于系统',
    orderNo: 100000,
  },
}

export default about
