<template>
  <div>
    <section>
      <app-router-view class="app-page-content"></app-router-view>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script setup lang="ts">
import AppRouterView from './components/AppRouterView.vue'
import { AppFooter } from '../index'
</script>
