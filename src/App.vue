<template>
  <div id="app">
    <!-- element-plus 国际化配置 -->
    <el-config-provider :locale="messages[locale]">
      <router-view />
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const locale = toRef(i18n, 'locale') // zh
const messages = toRef(i18n, 'messages') // {zh: {…}, en: {…}}
// console.log(messages.value[locale.value]) // {name:'zh-cn',...}
</script>
<style lang="scss" scoped></style>
