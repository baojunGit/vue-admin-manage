<template>
  <el-dialog
    v-model="visible"
    :title="title"
    width="600px"
    @close="handleClose"
  >
    <el-form ref="formRef" label-width="80px" :model="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="上级菜单">
            <!-- 用 v-model.number 绑定后输入框只能输入整数了，但是不用.number 的修饰的话绑定的字段又变成文本类型了 -->
            <!-- $event  是你$emit传的参数，固定值 -->
            <!-- $attrs 用于多层级组件间传参，传递排除了作为props的那部分参数 -->
            <!-- :data="menuOptions" my-tree-select全局组件传参 -->
            <!-- $attrs也可以用 import { useAttrs } from vue  const attrs = useAttrs()来获取 -->
            <my-tree-select
              v-bind="$attrs"
              v-model="form.parentId"
              :config="{ label: 'title', value: 'id', children: 'children' }"
              @select="changeSelect($event)"
            ></my-tree-select>
            <!-- normalizer 自定义键名 -->
            <!-- show-count 显示分支数 -->
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio :label="0">目录</el-radio>
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称" prop="title">
            <el-input v-model.trim="form.title" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="访问路由" prop="path">
            <el-input v-model.trim="form.path" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="组件路径" prop="component">
            <el-input v-model.trim="form.component" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="菜单图标" prop="icon">
            <el-input v-model.trim="form.icon" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单栏" prop="hideInMenu">
            <el-radio-group v-model="form.hideInMenu">
              <el-radio :label="false">显示</el-radio>
              <el-radio :label="true">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="面包屑" prop="hideInBread">
            <el-radio-group v-model="form.hideInBread">
              <el-radio :label="false">显示</el-radio>
              <el-radio :label="true">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="tab页签" prop="noCloseTab">
            <el-radio-group v-model="form.noCloseTab">
              <el-radio :label="false">可关闭</el-radio>
              <el-radio :label="true">不可关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否新增" prop="isNew">
            <el-radio-group v-model="form.isNew">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </template>
  </el-dialog>
</template>
<!-- inheritAttrs: false解决报错 Extraneous non-props attributes (data) were passed to component 
but could not be automatically inherited because component renders fragment or text root nodes.  -->
<!-- inheritAttrs: false的含义是不希望本组件的根元素继承父组件的attribute，同时父组件传过来的属性（没有被子组件的props接收的属性），也不会显示在子组件的dom元素上，但是在组件里可以通过其$attrs
可以获取到没有使用的注册属性, ``inheritAttrs: false`是不会影响 style 和 class 的绑定
简而言之：inheritAttrs只是用来控制attrs是否在DOM中渲染 -->
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { reactive, toRefs, defineExpose, defineEmits } from 'vue'
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
  menuType?: number
  children?: Array<MenuItem> | null
}

// const props = defineProps({
//   menuOptions: {
//     type: Array as PropType<MenuItem[]>,
//     require: true,
//     default: () => []
//   }
// })

// const { menuOptions } = toRefs(props)

const state = reactive({
  visible: false,
  title: '',
  formRef: null,
  form: {} as MenuItem
})

const init = row => {
  if (row?.id) {
    state.title = '编辑'
    // 深拷贝
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
  // console.log(state.form.parentId)
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

const changeSelect = param => {
  state.form.parentId = param?.id
}

const { visible, title, form } = toRefs(state)

defineExpose({
  init
})
</script>
<style lang="scss" scoped></style>
