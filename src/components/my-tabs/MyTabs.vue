<template>
  <div class="my-tabs">
    <!-- tab栏内容 -->
    <ul class="tabs-container">
      <li
        v-for="(item, index) in tabTitleList"
        :key="item"
        :class="{ active: index === currentIndex }"
        @click="onTabClick(item, index)"
      >
        {{ item.label }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  toRefs,
  ref,
  provide,
  computed,
  useSlots,
  defineEmits
} from 'vue'
const props = defineProps({
  // vue3用props里的属性modelValue表示默认的v-model绑定值属性，可以自行更改如：v-model:title="title"
  modelValue: {
    type: String,
    default: () => ''
  }
})
const { modelValue } = toRefs(props)

const currentIndex = ref(0)

// const state = reactive({
//   activeValue: modelValue.value
// })

// 遍历 slot 中的组件
const slots = useSlots()

// slots 是一个 proxy 对象，其中 slots.default() 获取到的是一个插槽数组
const list = slots?.default() as any

const tabTitleList = []

// 识别标签页面板实例信息
const getTabPaneOptions = () => {
  for (const item of list) {
    if (item?.type?.name && item?.type?.name === 'MyTabPane') {
      tabTitleList.push(item?.props)
    } else {
      for (const i of item.children) {
        if (i?.type?.name && i?.type?.name === 'MyTabPane') {
          tabTitleList.push(i?.props)
        }
      }
    }
  }
  console.log(tabTitleList)
}

getTabPaneOptions()

// 为什么要重新声明一个activeValue常量，因为props里的数据一般为只读，重新赋值可能会报错
const activeValue = ref(modelValue.value)

// 父级或祖级使用provide提供，子级孙级使用inject接收
// 这里为什么要用computed才会生效？？？
provide(
  'activeValue',
  computed(() => activeValue)
)

const emit = defineEmits(['tab-click'])

const onTabClick = (tab, index) => {
  activeValue.value = tab.name
  currentIndex.value = index
  emit('tab-click', tab)
}
</script>
<style lang="scss" scoped>
.my-tabs {
  margin-bottom: $base-margin;
  .tabs-container {
    display: flex;
    border: none;
    border-bottom: 2px solid $base-color-blue;
    li {
      font-size: 16px;
      border: 2px solid $base-color-gray;
      border-bottom: none;
      border-radius: 5px 5px 0 0;
      cursor: pointer;
      padding: 8px;
      margin-right: 8px;
      position: relative;
      bottom: -2px;
      transition: all 0.5s ease 0s;
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
