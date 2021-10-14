<template>
  <div id="layout" :class="classes">
    <!-- 侧边栏 -->
    <app-sidebar class="sidebar-container"></app-sidebar>
    <main class="main-container">
      <div>
        <!-- 网站头部 -->
        <app-header></app-header>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { AppSidebar, AppHeader } from './components/index'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'layout',
  components: {
    AppSidebar,
    AppHeader
  },
  setup() {
    const store = useStore()

    const set = reactive({
      classes: computed(() => {
        return {
          hideSidebar: !store.state.app.sidebar.opened,
          openSidebar: store.state.app.sidebar.opened,
          withoutAnimation: store.state.app.sidebar.withoutAnimation
        }
      })
    })

    return {
      ...toRefs(set)
    }
  }
})
</script>

<style lang="scss">
// 引入外部.scss文件, 这里不能加scoped, 不然无法对子组件内的样式生效
@import './Layout.module.scss';
</style>
