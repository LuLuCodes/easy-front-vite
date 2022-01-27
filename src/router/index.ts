import routes from '~pages'
import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'

// app router
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH as string),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
