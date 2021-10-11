<template>
  <div id="layout" :class="classes">
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container"></sidebar>
    <main class="main-container">
      <div>
        <!-- 顶部导航栏 -->
        <navbar></navbar>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue'
import { Sidebar, Navbar } from './components/index'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'layout',
  components: {
    Sidebar,
    Navbar
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
