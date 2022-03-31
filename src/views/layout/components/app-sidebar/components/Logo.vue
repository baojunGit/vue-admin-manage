<template>
  <div class="sidebar-logo">
    <transition name="sidebar-logo-fade">
      <router-link class="sidebar-logo-link" to="/">
        <i class="iconfont icon-Vue"></i>
        <h3 class="sidebar-title">
          {{ translateTitle('后台管理') }}
        </h3>
      </router-link>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { translateTitle } from '@/locale'
</script>
