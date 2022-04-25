<template>
  <div class="board2">
    <div class="option1">
      <span class="name">主办专题数</span>
      <span class="value"></span>
    </div>
    <div class="option2">
      <div class="desc">
        参与特性说明：开发组被加入到特性的实施组中，且特性已审批通过，则视为参与特性
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, toRefs } from 'vue'

interface List {
  name: string
  value: number
  suffix: string
}

const props = defineProps({
  list: {
    type: Array as PropType<List[]>,
    default: () => []
  },
  url: {
    type: String,
    default: () => {}
  }
})

const { list, url } = toRefs(props)
</script>

<style lang="scss" scoped>
.board2 {
  .option1 {
    height: 50px;
    border-width: 2px;
    border-color: #c0c0c0;
    text-align: center;
    /* 边框虚线 */
    border-style: dashed;
    /* 边框细线 */
    // border-style: solid;
    /* 边框点画线 */
    // border-style: dotted;
  }
}
</style>
