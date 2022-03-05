<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="500px"
    @close="handleClose"
  >
    <el-form ref="formRef" label-width="80px" :model="form">
      <el-form-item label="上级菜单">
        <!-- 用 v-model.number 绑定后输入框只能输入整数了，但是不用.number 的修饰的话绑定的字段又变成文本类型了 -->
        <my-tree-select
          v-model="form.parentId"
          :data="list"
          :config="{ label: 'title', value: 'parentId' }"
          @treeSelect="handleTreeSelect"
        ></my-tree-select>
        <!-- normalizer 自定义键名 -->
        <!-- show-count 显示分支数 -->
      </el-form-item>
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model.trim="form.title" />
      </el-form-item>
      <el-form-item label="访问路由" prop="path">
        <el-input v-model.trim="form.path" />
      </el-form-item>
      <el-form-item label="组件路径" prop="component">
        <el-input v-model.trim="form.component" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  reactive,
  toRefs,
  defineExpose,
  defineEmits,
  defineProps,
  PropType
} from 'vue'
import { successMessage } from '@/utils/message'
import MyTreeSelect from '@/components/my-tree-select/MyTreeSelect.vue'

interface MenuItem {
  id?: string
  parentId?: string
  path?: string
  name?: string
  component?: string
  redirect?: string
  title?: string
  icon?: string
  frameSrc?: string
  hideInMenu?: boolean
  hideInBread?: boolean
  noCloseTab?: boolean
  sort?: number
  isNew?: boolean
  children?: Array<MenuItem> | null
}

const props = defineProps({
  list: {
    type: Array as PropType<MenuItem[]>,
    require: true,
    default: () => []
  }
})

const { list } = toRefs(props)

// const item = { id: 0, title: '主类目', children: [] }
// item.children = list.value
// list.value.push(item)

// console.log(list.value)

const state = reactive({
  visible: false,
  title: '',
  formRef: null,
  form: {} as MenuItem
})

const init = row => {
  if (row?.id) {
    state.title = '编辑'
    state.form = Object.assign({}, row)
  } else {
    state.title = '添加'
  }
  state.visible = true
}

// 1.如果一个数据依赖于其他数据，那么把这个数据设计为computed的
// 2.如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化
// const formTitle = computed(() => {
//   return t(state.form.title)
// })

const handleClose = () => {
  // 弹框关闭前一定要重置form里的数据，下次重新打开新增才不会把编辑的数据带入
  state.form = {}
  state.visible = false
}

// 声明事件
const emit = defineEmits(['refresh'])
const handleSave = () => {
  successMessage('模拟保存/新增成功')
  // emit子传父调用父组件事件, 有传参就逗号隔开
  emit('refresh')
  handleClose()
}

const handleTreeSelect = data => {
  console.log(data)
}

const { visible, title, form } = toRefs(state)

defineExpose({
  init
})
</script>
<style lang="scss" scoped></style>
