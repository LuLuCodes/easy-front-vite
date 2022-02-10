<route>
{
  name: "request",
  meta: {
    hidenMenu: false,
    icon: "",
    title: "请求演示",
    requiresAuth: true
  }
}
</route>

<template>
  <p> This is the Request page. </p>
  <div> <button @click="httpPost" class="bg-blue-700"> test http post </button></div>
  <div> <button @click="httpGet" class="bg-blue-700"> test http get </button></div>
  <div> <button @click="vueRequest" class="bg-blue-700"> test vue request </button></div>
  <p>{{ loading }}</p>
  <p>{{ data }}</p>
</template>

<script lang="ts" setup>
import { Http } from '@/utils/axios'
import { useRequest } from 'vue-request'
const httpPost = async () => {
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
const httpGet = async () => {
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
</script>

<style lang="less">
.dark {
  background: #222;
  color: white;
}
</style>
