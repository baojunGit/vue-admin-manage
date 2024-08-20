<script setup lang="ts">
import ReloadPrompt from './components/ReloadPrompt/index.vue'
// import AppLoading from './components/AppLoading.vue';
// <AppLoading name="VueSpinnerAudio" />
</script>
<template>
  <div id="app">
    <router-view></router-view>
    <ReloadPrompt />
  </div>
</template>
