<template>
  <div class="my-tab-pane" v-show="name === activeValue">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs, ref, inject } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  label: {
    type: String,
    default: () => ''
  }
})

const { name } = toRefs(props)

const privodeValue = inject('activeValue') as any

// 新声明一个ref响应式对象来保存inject接收的响应对象
const activeValue = ref(privodeValue.value)
</script>
