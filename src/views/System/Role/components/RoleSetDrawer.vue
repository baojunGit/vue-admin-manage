<script setup lang="ts">
import { ref } from 'vue'
import { getMenuList } from '@/api/menu'
import { successMessage } from '@/utils/message'

const drawer = ref(false)
const list = ref([])
const defaultProps = ref({
  children: 'children',
  label: 'title'
})
const openLevel = ref('收合所有')
const menuIds = ref([2])
const flag = ref(false) // 全选，反选的标识，默认为false

const fetchData = async () => {
  const { data } = await getMenuList()
  list.value = data
}

fetchData()

const init = (row: any) => {
  drawer.value = true
  console.log(row)
}

const handleClose = () => {
  drawer.value = false
}

const handleSave = () => {
  successMessage('模拟保存/新增成功')
  handleClose()
}

const menuTree = ref(null)

const handleTreeAll = () => {
  flag.value = !flag.value
  if (flag.value) {
    menuTree.value.setCheckedNodes(list.value)
  } else {
    menuTree.value.setCheckedNodes([])
  }
}

const handleTreeOpen = (param: string) => {
  // arr是树形数据的扁平化数组
  const arr = menuTree.value.store._getAllNodes()
  if (param === '0') {
    for (const item of arr) {
      item.expanded = false
    }
  } else {
    for (const item of arr) {
      item.expanded = true
    }
  }
}

defineExpose({
  init
})
</script>

<template>
  <el-drawer
    title="菜单分配"
    v-model="drawer"
    direction="rtl"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-tree
      ref="menuTree"
      :data="list"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[]"
      :default-checked-keys="menuIds"
    >
      <template #default="{ node }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
        </span>
      </template>
    </el-tree>
    <template #footer>
      <div class="footer-wrap">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" plain @click="handleTreeAll">全选/反选</el-button>
        <el-select style="width: 110px; margin: 0 10px" size="small" v-model="openLevel" @change="handleTreeOpen">
          <el-option label="收合所有" value="0"></el-option>
          <el-option label="展开所有" value="1"></el-option>
        </el-select>
        <el-button size="small" type="primary" @click="handleSave">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.footer-wrap {
	display: flex;
	justify-content: center;
}
</style>
