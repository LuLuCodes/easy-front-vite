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

> 建议使用一下命令提交代码，该命令会自动执行代码规范检车和修正

```shell
git add .
pnpm run cz
git push
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
