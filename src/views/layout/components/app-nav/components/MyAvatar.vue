<template>
  <div class="my-avatar">
    <el-dropdown @command="handleCommand">
      <span class="avatar-dropdown">
        <el-avatar class="user-avatar" src="@/assets/image/face.gif" />
        <div class="user-name">
          <span class="hidden-xs-only"> {{ username }} </span>
          <i></i>
        </div>
      </span>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const handleCommand = () => {}
// const avatar = computed(() => store.getters['user/avatar'])
const username = computed(() => store.getters['user/username'])
</script>

<style scoped></style>
