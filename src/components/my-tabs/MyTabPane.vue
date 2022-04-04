<template>
  <div class="my-tab-pane" v-show="name === activeValue">
    <slot />
  </div>
</template>

<!-- 子组件为了能配置name, 让父组件获取到类型，不使用setup语法糖（获取不到） -->
<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
export default defineComponent({
  name: 'MyTabPane',
  props: {
    name: {
      type: String,
      default: () => ''
    },
    label: {
      type: String,
      default: () => ''
    }
  },
  setup(props, { slots }) {
    const privodeValue = inject('activeValue') as any

    // 新声明一个ref响应式对象来保存inject接收的响应对象
    const activeValue = ref(privodeValue.value)

    // 导出提供给模板使用
    return {
      activeValue
    }
  }
})
</script>
<!-- <script setup lang="ts">
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
</script> -->
