<template>
  <el-card
    class="my-colorful-card"
    :shadow="shadow"
    :style="{
      background: `linear-gradient(50deg, ${colorFrom}, ${colorTo})`,
      height: height
    }"
  >
    <template #header>{{ title }}</template>
    <i v-if="icon" :class="icon" />
  </el-card>
</template>
<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
const props = defineProps({
  shadow: {
    type: String,
    default: () => ''
  },
  colorFrom: {
    type: String,
    default: () => ''
  },
  colorTo: {
    type: String,
    default: () => ''
  },
  height: {
    type: String,
    default: () => ''
  },
  title: {
    type: String,
    default: () => ''
  },
  icon: {
    type: String,
    default: () => ''
  }
})
const { shadow, colorFrom, colorTo, title, icon } = toRefs(props)
</script>
<style lang="scss" scoped>
.my-colorful-card {
  position: relative;
  min-height: 120px;
  cursor: pointer;

  * {
    color: #fff;
  }

  :deep() {
    .el-card__header {
      color: #fff;
      border-bottom: 0;
    }
    .el-card__body {
      position: relative;
      padding-top: 0;
      i {
        position: absolute;
        top: 50%;
        right: 20px;
        font-size: 60px;
        transform: rotate(15deg);
      }
    }
  }
}
</style>
