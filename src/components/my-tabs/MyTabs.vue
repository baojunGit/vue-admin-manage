<template>
  <div class="my-tabs">
    <!-- tab栏内容 -->
    <div class="tabs-container">
      <!-- prepend slot -->
      <div v-if="$slots.prepend">
        <slot name="prepend" />
      </div>
      <div
        v-for="(item, index) in tabs"
        :key="index"
        :class="['tabs-wrap', { active: activeValue === item.name }]"
        @click="onTabClick(item, $event)"
      >
        <span class="tab-title">{{ item.label }}</span>
        <span v-if="$slots.suffix"> <slot name="suffix" :item="item" /></span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append">
        <slot name="append" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  toRefs,
  reactive,
  provide,
  computed,
  useSlots,
  watch,
  defineEmits
} from 'vue'
const props = defineProps({
  // vue3用props里的属性modelValue表示默认的v-model绑定值属性，可以自行更改如：v-model:title="title"
  modelValue: {
    type: [String, Number],
    default: () => ''
  }
})
const { modelValue } = toRefs(props)

// 遍历 slot 中的组件
const slots = useSlots()

const state = reactive({
  // 为什么要重新声明一个activeValue常量，因为props里的数据一般为只读，重新赋值可能会报错
  activeValue: modelValue.value,
  // slots 是一个 proxy 对象，其中 slots.default() 获取到的是一个插槽数组
  list: computed(() => slots?.default()),
  // 页签标题数组
  tabs: []
})

// 识别标签页面板实例信息
const getTabPaneOptions = arr => {
  for (const item of arr) {
    if (item?.type?.name && item?.type?.name === 'MyTabPane') {
      state.tabs.push(item?.props)
    } else {
      // 如果children不是数组，就跳过这次循环
      if (!Array.isArray(item.children)) continue
      getTabPaneOptions(item.children)
    }
  }
}

// getTabPaneOptions(state.list)

// 父级或祖级使用provide提供，子级孙级使用inject接收
// 这里为什么要用computed才会生效？？？
provide('activeValue', state.activeValue)

// provide('updateTab', {
//   updateTab: () => {
//     console.log('调用了更新')
//     state.tabs = []
//     getTabPaneOptions(state.list)
//   }
// })

watch(
  () => slots.default(),
  () => {
    // console.log(slots)
    state.tabs = []
    getTabPaneOptions(state.list)
  },
  {
    deep: true,
    immediate: true
  }
)

const emit = defineEmits(['tab-click'])

const onTabClick = (tab, event: Event) => {
  state.activeValue = tab.name
  emit('tab-click', tab, event)
}

const { tabs, activeValue } = toRefs(state)
</script>
<style lang="scss" scoped>
.my-tabs {
  margin-bottom: $base-margin;
  position: relative;
  .tabs-container {
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 2px solid $base-color-blue;
    .tabs-wrap {
      font-size: 16px;
      border: 2px solid $base-color-gray;
      border-bottom: none;
      border-radius: 5px 5px 0 0;
      padding: 6px;
      margin-right: 8px;
      position: relative;
      bottom: -2px;
      transition: all 0.5s ease 0s;
      display: flex;
      align-items: center;
      .tab-title {
        cursor: pointer;
      }
      &::before {
        content: '';
        display: block;
        height: 4px;
        background-color: #fff;
        position: absolute;
        bottom: -2px;
        left: 0;
        transform: scaleX(0);
        transition: all 0.5s ease-in-out 0s;
      }
      &.active {
        background-color: #fff;
        color: $base-color-blue;
        border: 2px solid $base-color-blue;
        border-bottom: none;
        &::before {
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>
