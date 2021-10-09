<template>
  <div class="navbar">
    <hamburger></hamburger>
    <breadcrumb></breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'

export default defineComponent({
  name: 'Navbar',
  components: {
    Hamburger,
    Breadcrumb
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
