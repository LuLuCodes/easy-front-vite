import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import purgeIcons from 'vite-plugin-purge-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
// import { VantResolver } from 'unplugin-vue-components/resolvers'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { configStyleImportPlugin } from './styleImport'
import { configImageminPlugin } from './imagemin'
import { configSvgIconsPlugin } from './svgSprite'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue(),
    // support name
    vueSetupExtend(),
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // unplugin-vue-components
  vitePlugins.push(Components({}))

  // importing from ui libraries
  // vitePlugins.push(Components({ resolvers: [VantResolver()] }))

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild))

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE),
    )
  }

  return vitePlugins
}
