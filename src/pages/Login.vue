<route>
{
  name: "login",
  meta: {
    hidenMenu: false,
    icon: "",
    title: "登录",
    requiresAuth: false
  }
}
</route>

<template>
  <SvgIcon name="logo" />
  <p> {{ description }} </p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const description = ref('This is the Login page.')
</script>

<style lang="less"></style>
