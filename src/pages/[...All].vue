<route>
{
  name: "page-not-found",
  meta: {
    hidenMenu: true,
    icon: "",
    title: "PageNotFound",
    requiresAuth: false
  }
}
</route>

<template>
  <p> {{ description }} </p>
</template>

<script lang="ts" setup>
const description = ref('Page not found')
</script>

<style lang="less"></style>
