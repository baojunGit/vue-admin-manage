<template>
  <div class="navbar">
    <div class="left-menu">
      <hamburger></hamburger>
      <breadcrumb></breadcrumb>
    </div>
    <div class="right-menu">
      <!-- 全屏 -->
      <screenfull></screenfull>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hamburger from './components/Hamburger.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Screenfull from './components/Screenfull.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
