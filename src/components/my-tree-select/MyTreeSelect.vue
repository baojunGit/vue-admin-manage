<template>
  <div class="my-tree-select-container" :style="{ width: width }">
    <el-select
      ref="mySelect"
      v-model="treeDataValue"
      :multiple="false"
      :disabled="disabled"
      style="width: 100%"
    >
      <!-- :label="treeData" -->
      <!-- node-key 设置默认选中的id，该属性必须设置 -->
      <!-- highlight-current 选中节点背景色高亮 -->
      <el-option :value="treeDataValue" :label="treeDataValue" class="data">
        <el-tree
          id="tree-option"
          ref="selectTree"
          default-expand-all
          :expand-on-click-node="false"
          :data="data"
          :props="config"
          node-key="id"
          highlight-current
          @node-click="handleNodeClick"
        />
      </el-option>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import {
  defineProps,
  reactive,
  defineEmits,
  toRefs,
  watch,
  nextTick
} from 'vue'

const props = defineProps({
  // vue3用props里的属性modelValue表示默认的v-model绑定值属性，可以自行更改如：v-model:title="title"
  modelValue: { type: String, default: () => '' },
  width: { type: String, default: () => '100%' },
  disabled: {
    type: Boolean,
    default: () => false
  },
  data: {
    type: Array,
    default: () => [
      // {
      //   title: '选项1',
      //   id: '1',
      //   parentId: '0',
      //   children: [{ title: '选项1-1', parentId: '1-1' }]
      // },
      // { title: '选项2', id: '2', parentId: '0' }
    ]
  },
  config: {
    default: () => {
      return { label: 'title', value: 'id', children: 'children' }
    }
  }
})

const { modelValue, width, disabled, data, config } = toRefs(props)

// console.log(data.value)

const state = reactive({
  mySelect: null,
  selectTree: null,
  currentId: [],
  treeDataValue: ''
})

const emit = defineEmits(['select'])

const getTreeDataValue = (arr, param) => {
  // 监听的变量没有值，显示的数据重置为空，不再往下执行
  if (!modelValue.value) {
    state.treeDataValue = ''
    return
  }
  // console.log(param)
  // 要声明string，不然会报类型错误
  const label = config.value.label
  const value = config.value.value
  const children = config.value.children
  // for-of(ES6)
  for (let item of arr) {
    if (item[value] === param) {
      state.treeDataValue = item[label]
      nextTick(() => {
        // 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key  属性
        // 且要在nextTick里执行
        state.selectTree.setCurrentKey(param)
      })
      break
    }
    if (item[children] && item[children].length) {
      getTreeDataValue(item[children], param)
    }
  }
  // forEach（ES5）的缺点
  // 1.forEach函数内部是异步的，在它的循环体中使用 await，await会失效；
  // 2.forEach不能用break跳出循环，也不能用return返回外层；
  // 3.没有返回值，即使你给出return也不管用。
  // try {
  //   arr.forEach(e => {
  //     if (e[value] === param) {
  //       state.treeDataValue = e[label]
  //     }
  //     if (e[children] && e[children].length) {
  //       getTreeDataValue(e[children], param)
  //     }
  //   })
  // } catch (error) {
  //   console.error(error)
  //   return
  // }
}

watch(
  () => modelValue.value,
  () => {
    getTreeDataValue(data.value, modelValue.value)
  },
  // 初始化的时候就立马执行
  { immediate: true }
)

// 点击树形节点的事件
const handleNodeClick = node => {
  // 要声明string，不然会报类型错误
  // const param = config.value.label as string
  state.treeDataValue = node.title
  state.mySelect.blur()
  emit('select', node)
}

const { mySelect, selectTree, treeDataValue } = toRefs(state)
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
  max-height: 274px;
  overflow: hidden;
  overflow-y: auto;
}
.el-tree-node__label {
  font-weight: normal;
}
// 修改选中节点的字体样式
// .el-tree-node.is-current .el-tree-node__label {
//   color: #409eff;
//   font-weight: 700;
// }
</style>
