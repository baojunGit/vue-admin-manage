<template>
  <el-drawer
    title="字典参数"
    v-model="drawer"
    direction="rtl"
    :before-close="handleClose"
    :close-on-click-modal="false"
    size="900px"
  >
    <my-query-form>
      <my-query-form-left-panel :span="12">
        <el-button plain :icon="Plus" type="primary"> 添加 </el-button>
      </my-query-form-left-panel>
    </my-query-form>
    <vxe-table border align="center" :data="list">
      <vxe-column field="dictName" title="字典名称"></vxe-column>
      <vxe-column field="itemText" title="字典属性"></vxe-column>
      <vxe-column field="itemValue" title="字典值"></vxe-column>
      <vxe-column field="sort" title="顺序"></vxe-column>
      <vxe-column field="status" title="状态"></vxe-column>
    </vxe-table>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, toRefs, defineExpose } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { getDictItem } from '@/api/dict'

interface DictItem {
  id: string
  dictId: string
  itemValue: string
  desc: string
  sort: number
  status: boolean
  updateTime: string
}

const state = reactive({
  drawer: false,
  list: [] as Array<DictItem>
})

const init = async row => {
  state.drawer = true
  const {
    data: { list }
  } = await getDictItem(row?.dictId)
  console.log(list)
  state.list = list
}

const handleClose = () => {
  state.drawer = false
}

defineExpose({
  init
})

const { drawer, list } = toRefs(state)
</script>
