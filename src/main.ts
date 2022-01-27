import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

import { createHead } from '@vueuse/head'

import 'virtual:svg-icons-register'
import '@/assets/styles/main.css'

const head = createHead()
async function bootstrap() {
  const app = createApp(App)

  // Configure store
  setupStore(app)

  // Configure routing
  setupRouter(app)
  app.use(head)
  app.mount('#app')
}

bootstrap()
