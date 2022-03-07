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
  // 这个就是父组件 v-model传过来的值
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

const state = reactive({
  mySelect: null,
  treeDataValue: ''
})

const emit = defineEmits(['select'])

const getTreeDataValue = (arr, param) => {
  // 要声明string，不然会报类型错误
  const label = config.value.label
  const value = config.value.value
  const children = config.value.children
  try {
    // forEach没有返回值，即使你给出return也不管用
    arr.forEach(e => {
      if (e[value] === param) {
        state.treeDataValue = e[label]
        // throw new Error('ending') //报错，就跳出循环, forEach跳出循环的方式
      }
      if (e[children] && e[children].length) {
        getTreeDataValue(e[children], param)
      }
    })
  } catch (error) {
    console.error(error)
    return ''
  }
}

watch(
  () => {
    return modelValue.value
  },
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
  // emit('update:modelValue', node.value)
  // console.log(treeDataValue.value)
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
