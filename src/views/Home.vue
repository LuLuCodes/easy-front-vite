<template>
  <p> This is the Home page. </p>
  <button @click="post"> test post </button>
  <button @click="get"> test get </button>
</template>

<script lang="ts">
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
    return { post, get }
  },
})
</script>

<style lang="less"></style>
