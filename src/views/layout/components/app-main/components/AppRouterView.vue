<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted
} from 'vue'

export default defineComponent({
  name: 'AppRouterView',
  setup() {
    const { proxy }: any = getCurrentInstance()

    onBeforeMount(() => {
      proxy.$sub('reload-router-view', () => {
        console.log('刷新了')
      })
    })
    onUnmounted(() => {
      proxy.$unsub('reload-router-view')
    })
    return {}
  }
})
</script>

<style scoped></style>
