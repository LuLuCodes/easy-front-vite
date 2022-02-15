<script setup lang="ts">
interface Props {
  prefix?: string
  name?: string
  color?: string
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  name: '',
  color: '#000',
  size: 24,
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const getStyle = computed(() => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s,
  }
})
</script>

<template>
  <svg aria-hidden="true" :style="getStyle">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
