<template>
  <div class="sidebar-logo">
    <transition name="sidebar-logo-fade">
      <router-link class="sidebar-logo-link" to="/">
        <i class="iconfont icon-Vue"></i>
        <h3 class="sidebar-title">{{ $t('message.sysName') }}</h3></router-link
      >
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Logo'
})
</script>
