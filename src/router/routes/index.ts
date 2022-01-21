import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: 'Root',
  },
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/Login.vue'),
  meta: {
    title: '登录',
  },
}

export const HomeRoute: AppRouteRecordRaw = {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/Home.vue'),
  meta: {
    title: '登录',
  },
}

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'PageNotFound',
  component: () => import('@/views/PageNotFound.vue'),
  meta: {
    title: 'PageNotFound',
  },
}

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  HomeRoute,
  RootRoute,
  ...routeModuleList,
  PAGE_NOT_FOUND_ROUTE,
]
