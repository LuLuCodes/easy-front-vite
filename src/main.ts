import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '/@/router'

async function bootstrap() {
  const app = createApp(App)

  // Configure routing
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
