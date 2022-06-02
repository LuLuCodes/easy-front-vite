import type { UserConfig, ConfigEnv } from 'vite'
import pkg from './package.json'
import dayjs from 'dayjs'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'

const { name, version } = pkg
const __APP_INFO__ = {
  pkg: { name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  const isBuild = command === 'build'

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@api': resolve(__dirname, './src/api'),
        '@assets': resolve(__dirname, './src/assets'),
        '@components': resolve(__dirname, './src/components'),
        '@enums': resolve(__dirname, './src/enums'),
        '@hooks': resolve(__dirname, './src/hooks'),
        '@layouts': resolve(__dirname, './src/layouts'),
        '@pages': resolve(__dirname, './src/pages'),
        '@router': resolve(__dirname, './src/router'),
        '@settings': resolve(__dirname, './src/settings'),
        '@store': resolve(__dirname, './src/store'),
        '@utils': resolve(__dirname, './src/utils'),
        '#': resolve(__dirname, './types'),
      },
    },
    server: {
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      open: true,
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome86',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },

    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  }
}
