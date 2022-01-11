<template>
  <p> This is the Home page. </p>
  <div> <button @click="post"> test post </button></div>
  <div> <button @click="get"> test get </button></div>
  <div>
    <button @click="changeMode"> color mode: {{ mode }} </button></div
  >
  <MyComponent :count="count" @update="update" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useColorMode } from '@vueuse/core'
import { Http } from '/@/utils/axios'
import MyComponent from '/@/components/MyComponent.vue'
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
let count = ref(0)
const update = (value) => {
  count.value = value
}
</script>

<style lang="less">
.dark {
  background: #222;
  color: white;
}
</style>
