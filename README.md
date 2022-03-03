# easy-front-vite

基于 Vue 3 + Typescript + Vite 的前端模板工程

> 此模板未集成任何前端 UI 库，非常纯粹的模板工程

## 创建工程

- 直接通过 github download 工程源码，[源码地址](https://github.com/LuLuCodes/easy-front-vite)

- 通过脚手架*ef-cli3*创建，详情操作请查看[npm](https://www.npmjs.com/package/ef-cli3)

## 安装依赖

> 包管理器目前已更新成 pnpm，如果使用 npm 或者 yarn，不保证工程能正常使用

```shell
pnpm run bootstrap
```

## 代码提交

> 建议使用一下命令提交代码，该命令会自动执行代码规范检查和修正

```shell
git add .
pnpm run cz
git push
```

## 创建页面或组件

```shell
pnpm run create
```

## 路由自动映射

以往我们在开发页面时，需要手动编写其路由组织文件来完成文件对路由结构系统的映射，当在开发大型的中后台 B 端项目的时候，配置过程就会比较繁琐，也不容易维护。

`vite-plugin-pages` 就很好的解决了这个问题，无需任何路由组织文件，文件系统即路由系统！

> vue-plugin-pages 基于文件系统的路由生成器

### 基本路由

vue-plugin-pages 自动将 pages 目录下的文件映射成相同名字的路由：

- src/pages/users.vue -> /users
- src/pages/users/profile.vue -> /users/profile
- src/pages/settings.vue -> /settings

### 默认索引路由

以 index 命名的文件会自动当做路由的索引页：

- src/pages/index.vue -> /
- src/pages/users/index.vue -> /users

### 动态路由

使用方括号来表示动态路由，文件夹和文件都可以动态：

- src/pages/users/[id].vue -> /users/:id (/users/one)
- src/[user]/settings.vue -> /:user/settings (/one/settings)

### 嵌套路由

当我们有如下的目录结构时：

```ts
src/pages/
  ├── users/
  │  ├── [id].vue
  │  └── index.vue
  └── users.vue
```

将会得到如下的路由配置：

```ts
;[
  {
    path: '/users',
    component: '/src/pages/users.vue',
    children: [
      {
        path: '',
        component: '/src/pages/users/index.vue',
        name: 'users',
      },
      {
        path: ':id',
        component: '/src/pages/users/[id].vue',
        name: 'users-id',
      },
    ],
  },
]
```

### route 元数据定义

```ts
// in src/pages/Home.vue
<route>
{
  name: "home",
  meta: {
    hidenMenu: false,
    icon: "",
    title: "首页",
    requiresAuth: true
  }
}
</route>
```

## pinia

> pinia 目前已经是 vue 官方正式的状态库，用于替换 vuex。至于 pinia 的优点，可以自行百度，这里不再过多的讲解。

### 创建一个 pinia 并传递给 vue 应用

```ts
// src/store/index.ts
import type { App } from 'vue'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
```

```ts
// src/main.ts
import { setupStore } from '@/store'

const app = createApp(App)
// Configure store
setupStore(app)
app.mount('#app')
```

### 创建一个 store

```ts
// src/store/modules/user.ts
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    // ......
  },
  getter: {
    // ......
  },
  actions: {
    // ......
  },
})
```

> id 是必须的，devtools 调试会根据 id 进行跟踪

### 在 setup 中使用 store

```ts
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup() {
    const store = useUserStore()
    return {
      store,
    }
  },
})
```

### 在 setup 外使用 store

```ts
// src/store/modules/user.ts
export function useUserStoreWithOut() {
  return useUserStore(store)
}
```

```ts
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()
```

> userStore 实例化后的，我们就可以在 store 上访问 state、getters、actions 等（pinia 中没有 mutations）。

> 该 store 是一个 reactive 对象，所以不需要 “.value”，也不能对其进行解构使用，否则失去响应性（类似 props）。如果需要解构，请使用`storeToRefs`

### 定义 state

在 pinia 中，定义 state 是在函数中返回 state 初始状态

```ts
export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    ua: new UaParser().getResult(),
  }),
})
```

### 使用 state

```ts
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup() {
    const store = useUserStore()
    return {
      userInfo: store.userInfo,
    }
  },
})
```

> 出于代码结构考虑，全局的状态管理不建议直接在各个组件处随意修改状态，应统一使用 action 中的方法修改（没有 mutation 了）

### reset && patch

- $reset 可以将 state 状态重置
- $patch 可以同时修改多个值

### getters && actions

与 vuex 类似，详细内容请查看[pinia 文档](https://pinia.vuejs.org/introduction.html)

### pinia 固化

```ts
export const useUserStore = defineStore({
  id: 'user',
  persist: {
    // pinia save to window.localStorage
    storage: window.localStorage,
    beforeRestore: (_) => {
      console.log('Before hydration...')
    },
    afterRestore: (_) => {
      console.log('After hydration...')
    },
  }
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    ua: new UaParser().getResult(),
  }),
})
```

详细内容请查看[pinia-plugin-persistedstate 文档](https://github.com/prazdevs/pinia-plugin-persistedstate)

## 布局系统

`src/layouts/Default.vue` 将作为默认布局。

创建自定义布局时，需要配置 route 元数据，比如：

```ts
// in src/pages/About.vue
<route>
{
  name: "about",
  meta: {
    layout: "Custom",
    hidenMenu: true,
    icon: "",
    title: "关于系统",
    requiresAuth: false
  }
}
</route>
```

## 核心库自动引入

无需手工`import` vue 等库，可以直接使用：

```ts
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

目前模板支持自动引入的库列包括:

- vue
- pinia
- vueuse
- vue-router

## 组件自动引入

在 src/components 下定义的组件都将会按需引入，即 import 是不需要的

## 图标引入

使用[icones](https://icones.netlify.app/)，在模板中可以直接使用

```html
<!-- in src/pages/About.vue -->
<template>
  <p> {{ description }} </p>
  <mdi:account-circle />
</template>
```

## 支持 Markdown 渲染

例如 `src/pages/README.md`，当路由到`/readme`时，即可看到对应的 markdown 渲染效果。

## Mock 支持

通过设置*VITE_USE_MOCK*来开启 Mock，mock 数据统一放置在*mock*目录下，建议根据不同的模块建立独立的 ts 文件。

## 网络请求

在`src/utils/axios`中已经完成了基本的网络库的封装，使用示例如下：

```ts
import { Http } from '@/utils/axios'

await Http.post({
  data: {
    username: 'leyi',
    password: 'leyi',
  },
  url: '/user/login',
})

await Http.get({
  params: {
    name: 'test',
  },
  url: '/user/get-userinfo',
})
```

除此之外，我们可以通过[VueRequest](https://cn.attojs.org/)对网络库进行二次封装，从而业务开发中以统一的标准对接口请求进行管理，使我们更加专注于核心业务的开发。

`VueRequest`简单示例：

```ts
import { Http } from '@/utils/axios'
import { useRequest } from 'vue-request'

const { run, data, loading } = useRequest(
  () => {
    return Http.post({
      data: {},
      url: '/user/vrequest',
    })
  },
  {
    manual: true,
  },
)

const vueRequest = () => {
  run()
}
```

> 以上所有示例均可在`src/pages/Request.vue`中查看。后期随着项目的积累，会根据开发的实际情况，对 VueRequest 进行统一的二次封装，以求更加便捷。

## 基于 mitt 处理组件间事件联动

```ts
import emitter from '@/utils/emitter'

// listen to an event
emitter.on('foo', (e) => console.log('foo', e))

// listen to all events
emitter.on('*', (type, e) => console.log(type, e))

// fire an event
emitter.emit('foo', { a: 'b' })

// clearing all events
emitter.all.clear()

// working with handler references:
function onFoo() {}
emitter.on('foo', onFoo) // listen
emitter.off('foo', onFoo) // unlisten
```

## 第三方库

### VueUse

> VueUse 是一个基于 Composition API 的实用工具函数集，它可以帮助你快速实现一些常见的功能。

VueUse 包含的工具函数非常多，我们只列举部分比较常用的，完整的内容请查看[官方文档](https://vueuse.org/)

#### 浏览器

- [useClipboard](https://vueuse.org/core/useClipboard/#usage): 粘贴板功能
- [useColorMode](https://vueuse.org/core/usecolormode/#category-browser): 切换颜色模式，比如暗夜模式
- [useEventListener](https://vueuse.org/core/useEventListener/): 监听原生的 DOM 事件
- [useEyeDropper](https://vueuse.org/core/useEyeDropper/): 拾色器
- [useFavicon](https://vueuse.org/core/useFavicon/): 更改 favicon.ico
- [useFullscreen](https://vueuse.org/core/useFullscreen/): 全屏模式，可单独对某个元素操作
- [useMediaControls](https://vueuse.org/core/useMediaControls/#basic-usage): 多媒体控制器
- [useMemory](https://vueuse.org/core/useMemory/): 浏览器内存分析
- [usePermission](https://vueuse.org/core/usePermission/): 获取用户的浏览器权限
- [usePreferredLanguages](https://vueuse.org/core/usePreferredLanguages/): 获取浏览器的首选语言
- [useScriptTag](https://vueuse.org/core/useScriptTag/#usage): 动态的向页面新增 script 标签
- [useShare](https://vueuse.org/core/useShare/): 分享页面链接
- [useTitle](https://vueuse.org/core/useTitle/): 修改页面标题
- [useUrlSearchParams](https://vueuse.org/core/useUrlSearchParams/?foo=bar&vueuse=awesome): 操作页面 url 上的参数
- [useWakeLock](https://vueuse.org/core/useWakeLock/): 防止设备变暗或锁屏
