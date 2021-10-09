<template>
  <ul>
    <li v-for="column in list" :key="column.id">
      <img :src="column.avatar" :alt="column.title" />
      <h5>{{ column.title }}</h5>
      <p>{{ column.description }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
/* PropType 是vue2中用于类型推论的方法，可以接受一个泛型，PropType<ColumnProps[]>
的意思是声明一个ColumnProps数据结构的数组类型，便于类型推断和自动补全 */
export interface ColumnProps {
  id: number
  title: string
  avatar: string
  description: string
}
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped></style>
