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
      <el-option :value="treeDataValue" :label="treeDataValue" class="data">
        <el-tree
          id="tree-option"
          ref="selectTree"
          default-expand-all
          :expand-on-click-node="false"
          :data="data"
          :props="config"
          @node-click="handleNodeClick"
        />
      </el-option>
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { defineProps, reactive, defineEmits, toRefs, watch } from 'vue'

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
  treeDataValue: ''
})

const emit = defineEmits(['select'])

const getTreeDataValue = (arr, param) => {
  console.log(modelValue.value)
  // 监听的变量有值才继续执行，不然会消耗性能
  if (!modelValue.value) return
  // console.log(param)
  // 要声明string，不然会报类型错误
  const label = config.value.label
  const value = config.value.value
  const children = config.value.children

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
  // for-of(ES6)
  for (let item of arr) {
    if (item[value] === param) {
      state.treeDataValue = item[label]
      break
    }
    if (item[children] && item[children].length) {
      getTreeDataValue(item[children], param)
    }
  }
}

watch(
  () => modelValue.value,
  () => {
    getTreeDataValue(data.value, modelValue.value)
  }
)

// 点击树形节点的事件
const handleNodeClick = node => {
  // 要声明string，不然会报类型错误
  // const param = config.value.label as string
  state.treeDataValue = node.title
  state.mySelect.blur()
  emit('select', node)
}

const { mySelect, treeDataValue } = toRefs(state)
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
.selectInput {
  padding: 0 5px;
  box-sizing: border-box;
}
</style>
