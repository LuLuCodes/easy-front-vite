<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="add"> add </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  count: { type: Number, default: 0 },
})

const emit = defineEmits(['update'])
const add = () => {
  emit('update', props.count + 1)
}
</script>

<style lang="less"></style>
