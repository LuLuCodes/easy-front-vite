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

<template>
  <p> {{ description }} </p>
</template>

<script lang="ts" setup>
const description = ref('This is the About page.')
</script>

<style lang="less"></style>
