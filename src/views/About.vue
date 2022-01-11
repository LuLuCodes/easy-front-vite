<template>
  <p> {{ description }} </p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const description = ref('This is the About page.')
</script>

<style lang="less"></style>
