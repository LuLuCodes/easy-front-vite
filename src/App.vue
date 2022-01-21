<template>
  <RouterView />
</template>

<script lang="ts" setup>
import { useTitle } from '@/hooks/web/useTitle'

useTitle()
</script>

<style lang="less"></style>
