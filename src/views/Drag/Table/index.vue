<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'
import { VxeTableInstance } from 'vxe-table'
import Sortable from 'sortablejs'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import { Plus, Check, Search, Edit, Delete, CaretBottom, QuestionFilled, Menu } from '@element-plus/icons-vue'
import { successMessage } from '@/utils/message'
import { getTableList } from '@/api/table'
import { useTableStore } from '@/store/modules/table'
import { AddOrEdit, AddOrEditTab, DescDialog } from './components'

const tableStore = useTableStore()
const { activeValue } = storeToRefs(tableStore)
const { setTableDragTab } = tableStore

const tabList = ref([
  {
    id: '1',
    name: '研发中心'
  },
  {
    id: '2',
    name: '敏捷迭代'
  },
  {
    id: '3',
    name: '云数据中心'
  },
  {
    id: '4',
    name: '架构团队'
  },
  {
    id: '5',
    name: '资管团队'
  }
])

const queryParams = ref({
  name: ''
})

const tableData = ref([])
const loading = ref(false)
const showHelpTip = ref(false)

const handleClick = tab => {
  activeValue.value = tab.name
  setTableDragTab(tab.name)
}

const xTable = ref({} as VxeTableInstance)

const fetchData = async () => {
  loading.value = true
  const {
    data: { dataList }
  } = await getTableList(queryParams.value)
  tableData.value = dataList
  for (const item of tableData.value) {
    if (item.show) {
      xTable.value.setCheckboxRow(item, true)
    }
  }
  loading.value = false
}

fetchData()

let sortable: any

const rowDrop = () => {
  const $table = xTable.value
  sortable = Sortable.create($table.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
    handle: '.drag-btn',
    onEnd: sortableEvent => {
      const newIndex = sortableEvent.newIndex as number
      const oldIndex = sortableEvent.oldIndex as number
      const currRow = tableData.value.splice(oldIndex, 1)[0]
      tableData.value.splice(newIndex, 0, currRow)
    }
  })
}

// 加载完成之后再绑定拖动事件
onMounted(async () => {
  rowDrop()
})

onUnmounted(() => {
  if (sortable) {
    sortable.destroy()
  }
})

const selectChangeEvent = ({ rowIndex }) => {
  tableData.value[rowIndex].show = !tableData.value[rowIndex].show
}

const forArray = (arr: any, attr: string, val: boolean) => {
  for (const item of arr) {
    item[attr] = val
  }
}

const selectAllChangeEvent = ({ checked }) => {
  if (checked) {
    xTable.value.setAllCheckboxRow(true)
    forArray(tableData.value, 'show', true)
    return
  }
  xTable.value.clearCheckboxRow()
  forArray(tableData.value, 'show', false)
}

const handleSave = () => {
  ElMessageBox.confirm('您确定要提交当前数据?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      for (let i = 0; i < tableData.value.length; i++) {
        tableData.value[i].sort = String(i + 1)
      }
      successMessage('模拟保存成功')
    })
    .catch(() => {
      // 不操作
    })
}

interface SonData {
  init: () => void
}

// 新增or编辑指标组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>()

// 新增或编辑用户方法
const handleTarget = row => {
  if (row?.id) {
    addEditRef.value.init(row)
  } else {
    addEditRef.value.init()
  }
}

// 新增页签组件实例
const addEditTabRef = ref<InstanceType<typeof AddOrEditTab> & SonData>()

const handleTab = row => {
  if (row?.label) {
    const param = tabList.value.find(tab => tab.name === row.label)
    addEditTabRef.value.init(param)
    return
  }
  addEditTabRef.value.init()
}

// 删除页签
const deleteTab = item => {
  console.log(item)
  // const param = tabList.value.find(tab => tab.name === item.label);
  ElMessageBox.confirm('您确定要删除当前项吗？', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      successMessage('模拟删除成功')
    })
    .catch(() => {})
}

// 查看详情组件实例
const descDialogRef = ref<InstanceType<typeof DescDialog> & SonData>()

const handleDesc = row => {
  descDialogRef.value.init(row)
}
</script>

<template>
  <div id="table-drag-container">
    <AppTabs v-model="activeValue" @tab-click="handleClick">
      <AppTabPane v-for="(item, index) in tabList" :key="index" :label="item.name" :name="item.id"></AppTabPane>
      <template #suffix="{ item }">
        <div @click.stop>
          <el-popover popper-class="tab-set" style="min-width: auto" placement="bottom" :width="80" trigger="click">
            <template #reference>
              <el-icon :size="16" style="padding: 4px; cursor: pointer">
                <caret-bottom />
              </el-icon>
            </template>
            <ul class="menu">
              <li class="menu-item" @click="handleTab(item)">编辑</li>
              <li class="menu-item" @click="deleteTab(item)">删除</li>
            </ul>
          </el-popover>
        </div>
      </template>
      <template #append>
        <el-button :icon="Plus" text @click="handleTab"> 新建页签 </el-button>
      </template>
    </AppTabs>
    <QueryForm>
      <QueryFormLeftPanel :span="12">
        <el-button plain :icon="Plus" type="primary" @click="handleTarget($event)"> 添加 </el-button>
        <el-button plain :icon="Check" type="success" @click="handleSave"> 保存 </el-button>
      </QueryFormLeftPanel>
      <QueryFormRightPanel :span="12">
        <el-form :inline="true" :model="queryParams" @submit.prevent>
          <el-form-item>
            <el-input @keyup.enter="fetchData" v-model.trim="queryParams.name" clearable placeholder="请输入指标名" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="fetchData"> 查询 </el-button>
          </el-form-item>
        </el-form>
      </QueryFormRightPanel>
    </QueryForm>
    <vxe-table
      border
      :loading="loading"
      max-height="400"
      align="center"
      :row-config="{ useKey: true, keyField: 'id' }"
      ref="xTable"
      class="sortable-row"
      :scroll-y="{ enabled: false }"
      :data="tableData"
      :checkbox-config="{ reserve: true }"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectAllChangeEvent"
    >
      <vxe-column width="60">
        <template #default>
          <div class="drag-btn">
            <el-icon><Menu /></el-icon>
          </div>
        </template>
        <template #header>
          <el-tooltip class="box-item" effect="dark" content="按住后可以上下拖动排序！" placement="top"
            ><el-icon><QuestionFilled /></el-icon
          ></el-tooltip>
        </template>
      </vxe-column>
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="sort" title="顺序" width="60"></vxe-column>
      <vxe-column field="name" title="指标名" width="120"></vxe-column>
      <vxe-column field="type" title="模板类型" width="120"></vxe-column>
      <vxe-column field="desc" title="指标描述" width="80">
        <template #default="{ row }">
          <el-button type="info" plain size="small" @click="handleDesc(row)"> 查看 </el-button>
        </template>
      </vxe-column>
      <vxe-column align="center" field="isNew" title="新增" width="100">
        <template #default="{ row }">
          <el-tag v-if="row.isNew" type="warning"> 是 </el-tag>
          <span v-else>否</span>
        </template>
      </vxe-column>
      <vxe-column field="url1" title="跳转1" min-width="80"></vxe-column>
      <vxe-column field="url2" title="跳转2" min-width="80"></vxe-column>
      <vxe-column field="url3" title="跳转3" min-width="80"></vxe-column>
      <vxe-column align="center" title="操作" min-width="160" fixed="right">
        <template #default="{ row }">
          <el-button plain size="small" type="primary" :icon="Edit" @click="handleTarget(row)"> </el-button>
          <el-button plain size="small" type="danger" :icon="Delete"></el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <AddOrEdit ref="addEditRef"></AddOrEdit>
    <AddOrEditTab ref="addEditTabRef"></AddOrEditTab>
    <DescDialog ref="descDialogRef"></DescDialog>
  </div>
</template>

<style lang="scss">
.sortable-row {
  .drag-btn {
    font-size: 16px;
    cursor: move;
  }
  .vxe-body--row.sortable-ghost,
  .vxe-body--row.sortable-chosen {
    background-color: #dfecfb;
  }
}
.tab-set {
  min-width: auto !important;
  padding: 5px 0 !important;
  .menu {
    .menu-item {
      padding: 5px 12px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: (0, 0, 0, 0.65);
        background-color: #f5f5f5;
      }
    }
  }
}
.el-popper.is-customized {
  width: 200px;

  padding: 6px 12px;
  color: #ffffff;
  background: linear-gradient(90deg, rgb(31 148 255), rgb(119 225 157));
}
.el-popper.is-customized .el-popper__arrow::before {
  right: 0;
  background: linear-gradient(45deg, #6ab6ce, #6db9cb);
}
</style>
