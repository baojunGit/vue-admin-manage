<template>
  <div id="app">
    <column-list :list="list"></column-list>
    <router-view />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import ColumnList, { ColumnProps } from './component/ColumnList.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下',
    avatar: 'https://www.baidu.com/'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下',
    avatar: 'https://www.baidu.com/'
  }
]
export default defineComponent({
  name: 'App',
  component: {
    ColumnList
  },
  setup() {
    onMounted(() => {
      // 在html标签上增加data-theme = 'default'
      window.document.documentElement.setAttribute('data-theme', 'default')
    })

    return {
      list: testData
    }
  }
})
</script>
<style lang="scss">
#app {
  height: 100%;
}
</style>
