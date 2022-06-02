import App from './App.vue'
import { router, setupRouter } from '@router/index'
import { setupStore } from '@store/index'
import { setupRouterGuard } from '@router/guard'
import { createHead } from '@vueuse/head'

import 'virtual:svg-icons-register'
import '@assets/styles/main.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

const head = createHead()
async function bootstrap() {
  const app = createApp(App)

  // Configure store
  setupStore(app)

  // Configure routing
  setupRouter(app)
  // router-guard
  setupRouterGuard(router)
  app.use(head)
  app.mount('#app')
}

bootstrap()
