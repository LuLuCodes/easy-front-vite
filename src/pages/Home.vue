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

<template>
  <p> This is the Home page. </p>
  <div> <button @click="post" class="bg-blue-700"> test post </button></div>
  <div> <button @click="get" class="bg-blue-700"> test get </button></div>
  <div>
    <button @click="changeMode" class="bg-blue-700"> color mode: {{ mode }} </button></div
  >
  <router-link :to="{ name: 'about' }">go to about page</router-link>
  <MyComponent :count="count" @update="update" />
</template>

<script lang="ts" setup>
import { Http } from '@/utils/axios'
const post = async () => {
  try {
    const res = await Http.post({
      data: {
        username: 'leyi',
        password: 'leyi',
      },
      url: '/user/login',
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
      url: '/user/get-userinfo',
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
const mode = useColorMode({ selector: 'body' })
mode.value = 'light'

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
