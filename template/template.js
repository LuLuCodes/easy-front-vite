const _ = require('lodash')

module.exports = {
  pageTemplate: ({ name, layout_name, title, hidenMenu = false, requiresAuth = false }) => {
    return `
    <route>
    {
      name: "${_.kebabCase(name)}",
      meta: {
        layout: "${layout_name}",
        hidenMenu: ${hidenMenu},
        icon: "",
        title: "${title || name}",
        requiresAuth: ${requiresAuth}
      }
    }
    </route>

    <template>
      <p> {{ description }} </p>
    </template>

    <script lang="ts" setup>
    const description = ref('This is the ${name} page.')
    </script>

    <style lang="less"></style>
    `
  },
  componentTemplate: () => {
    return `
    <template>
      <div>
        <h1>{{ count }}</h1>
        <button @click="add" class="bg-blue-700"> add </button>
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
    `
  },
}
