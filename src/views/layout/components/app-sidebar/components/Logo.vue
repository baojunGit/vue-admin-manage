<template>
  <div class="sidebar-logo">
    <transition name="sidebar-logo-fade">
      <router-link class="sidebar-logo-link" to="/">
        <i class="iconfont icon-Vue"></i>
        <h3 class="sidebar-title">{{ t('message.sysName') }}</h3></router-link
      >
    </transition>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
