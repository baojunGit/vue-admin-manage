<template>
  <div>
    <section>
      <AppRouterView class="app-page-content"></AppRouterView>
    </section>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup lang="ts">
import AppRouterView from './components/AppRouterView.vue'
import { AppFooter } from '../index'
</script>
