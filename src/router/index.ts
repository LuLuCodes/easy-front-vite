import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

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
