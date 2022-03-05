<template>
  <div class="my-tree-select-container" :style="{ width: width }">
    <el-select
      ref="mySelect"
      v-model="optionValue"
      :multiple="false"
      :disabled="disabled"
      style="width: 100%"
    >
      <el-option :value="optionValue" :label="optionValue" class="data">
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
import { defineProps, defineEmits, toRefs, ref, watch } from 'vue'

const props = defineProps({
  // 这个就是父组件 v-model传过来的值
  modelValue: { type: String, default: () => '0' },
  width: { type: String, default: '100%' },
  disabled: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: () => [
      // {
      //   title: '选项1',
      //   parentId: '1',
      //   children: [{ title: '选项1-1', parentId: '1-1' }]
      // },
      // { title: '选项2', parentId: '2' }
    ]
  },
  config: {
    default: () => {
      return { label: 'title', value: 'parentId' }
    }
  }
})

const { modelValue, width, disabled, data, config } = toRefs(props)

console.log(modelValue.value)

const mySelect = ref()

const optionValue = ref('')

const emit = defineEmits(['nodeClick', 'update:modelValue'])

const getLable = (arr, value) => {
  let res = ''
  function find(arr, value) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value === value) {
        res = arr[i].label
      }
      if (arr[i].children && arr[i].children.length) {
        find(arr[i].children, value)
      }
    }
  }
  find(arr, value)
  return res
}

watch(
  () => {
    return modelValue.value
  },
  () => {
    optionValue.value = getLable(data.value, modelValue.value)
  }
)

// 点击树形节点的事件
const handleNodeClick = node => {
  // 要声明string，不然会报类型错误
  const param = config.value.label as string
  optionValue.value = node[param]
  mySelect.value.blur()
  emit('nodeClick', node)
  emit('update:modelValue', node.value)
}
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
