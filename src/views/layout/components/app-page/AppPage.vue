<template>
  <section>
    <app-router-view></app-router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppRouterView from './components/AppRouterView.vue'
export default defineComponent({
  name: 'AppMain',
  components: {
    AppRouterView
  }
})
</script>
