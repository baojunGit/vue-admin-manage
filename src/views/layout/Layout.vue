<template>
  <div id="layout">
    <!-- 侧边栏 -->
    <app-sidebar class="app-sidebar"></app-sidebar>
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
import { defineComponent } from '@vue/runtime-core'
import { AppSidebar, Navbar } from './components/index'
export default defineComponent({
  name: 'layout',
  components: {
    AppSidebar,
    Navbar
  }
})
</script>

<style lang="scss">
// 引入外部.scss文件, 这里不能加scoped, 不然无法对子组件内的样式生效
@import './Layout.module.scss';
</style>
