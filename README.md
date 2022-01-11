# easy-front-vite

基于 Vue 3 + Typescript + Vite 的前端模板工程

> 此模板未集成任何前端 UI 库，非常纯粹的模板工程

## 安装依赖

```shell
pnpm bootstrap
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
