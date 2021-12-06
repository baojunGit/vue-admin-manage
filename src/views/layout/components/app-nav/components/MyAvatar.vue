<template>
  <div class="my-avatar">
    <el-dropdown @command="handleCommand">
      <span class="avatar-dropdown">
        <el-avatar class="user-avatar" :src="avatar" />
        <div class="user-name">
          <span class="hidden-xs-only"> {{ username }} </span>
          <i></i>
        </div>
      </span>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup() {
    const store = useStore()
    const handleCommand = () => {}
    return {
      avatar: computed(() => store.getters['user/avatar']),
      username: computed(() => store.getters['user/username']),
      handleCommand
    }
  }
})
</script>

<style scoped></style>
