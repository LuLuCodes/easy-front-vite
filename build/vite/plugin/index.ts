import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages'
import markdown from 'vite-plugin-md'
import restart from 'vite-plugin-restart'
import layouts from 'vite-plugin-vue-layouts'
import legacy from '@vitejs/plugin-legacy'
import purgeIcons from 'vite-plugin-purge-icons'
import windicss from 'vite-plugin-windicss'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'
import autoImport from 'unplugin-auto-import/vite'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import prism from 'markdown-it-prism'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { configStyleImportPlugin } from './styleImport'
import { configImageminPlugin } from './imagemin'
import { configSvgIconsPlugin } from './svgSprite'
import { configMockPlugin } from './mock'

const markdownWrapperClasses =
  'prose md:prose-lg lg:prose-lg dark:prose-invert text-left p-10 prose-slate prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    pages({
      extensions: ['vue', 'md'],
    }),
    layouts({
      defaultLayout: 'Default',
    }),
    markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(prism)
      },
    }),
    windicss({
      safelist: markdownWrapperClasses,
    }),
    icons({
      autoInstall: true,
    }),
    restart({
      restart: ['.env*', 'postcss.config.js', 'windi.config.js'],
    }),
    // support name
    vueSetupExtend(),
    autoImport({
      dts: './build/types/auto-imports.d.ts',
      imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
      resolvers: [],
      // resolvers: [ElementPlusResolver()],
    }),
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // element-ui plus
  // vitePlugins.push(
  //   ElementPlus({
  //     useSource: true,
  //   }),
  // )

  // unplugin-vue-components
  vitePlugins.push(
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        iconsResolver({
          prefix: 'Icon',
        }),
        // ElementPlusResolver(),
      ],
    }),
  )

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

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
