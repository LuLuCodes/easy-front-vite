<template>
  <p> This is the Home page. </p>
  <button @click="post"> test post </button>
  <button @click="get"> test get </button>
  <button @click="changeMode"> color mode: {{ mode }} </button>
</template>

<script lang="ts">
import { useColorMode } from '@vueuse/core'
import { defineComponent } from 'vue'
import { Http } from '/@/utils/axios'

export default defineComponent({
  name: 'HomePage',
  components: {},
  setup() {
    const post = async () => {
      try {
        const res = await Http.post({
          data: {
            name: 'test',
          },
          url: '/customer/login-by-wechat',
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    const get = async () => {
      try {
        const res = await Http.get({
          params: {
            name: 'test',
          },
          url: '/customer/login-by-wechat',
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    const mode = useColorMode({ selector: 'body' })
    mode.value = 'dark'

    const changeMode = () => {
      if (mode.value === 'dark') {
        mode.value = 'light'
      } else {
        mode.value = 'dark'
      }
    }
    return { post, get, mode, changeMode }
  },
})
</script>

<style lang="less">
.dark {
  background: #222;
  color: white;
}
</style>
