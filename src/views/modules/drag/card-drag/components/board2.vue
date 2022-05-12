<template>
  <div class="board2">
    <div class="option1">
      <div class="name">主办专题数</div>
      <div class="value">0<span class="suffix">个</span></div>
    </div>
    <div class="option2">
      <div class="desc">
        参与特性说明：开发组被加入到特性的实施组中，且特性已审批通过，则视为参与特性
      </div>
      <div class="option2-item1">
        <div class="name">参与特性数<span class="suffix">20</span>个</div>
        <div class="value"></div>
      </div>
      <div class="option2-item2">
        <div class="name">其中<span>待立项</span></div>
        <div class="value">6<span class="suffix">个</span></div>
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
    /* 边框虚线 */
    border-style: dashed;
    /* 边框细线 */
    // border-style: solid;
    /* 边框点画线 */
    // border-style: dotted;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    .name {
      display: flex;
      align-items: center;
    }
    .value {
      font-size: 28px;
      color: $base-color-blue;
      margin-left: 60px;
      span {
        font-size: 16px;
        color: $base-color-black;
      }
    }
  }
  .option2 {
    height: 140px;
    border-width: 2px;
    border-color: #c0c0c0;
    border-style: dashed;
    box-sizing: border-box;
    padding: 10px;
  }
}
</style>
