<template>
  <div id="menu-container">
    <my-query-form>
      <my-query-form-left-panel :span="12">
        <el-button :icon="Plus" type="primary" @click="handleMenu($event)">
          添加
        </el-button>
        <el-button type="primary" @click="xTree.setAllTreeExpand(true)">
          <i class="iconfont icon-shangxiazhankai"><span ml6>展开全部</span></i>
        </el-button>
        <el-button type="primary" @click="xTree.clearTreeExpand()">
          <i class="iconfont icon-suo"><span ml6>折叠全部</span></i>
        </el-button>
        <el-button
          v-show="selectIds.length > 1"
          :icon="Delete"
          type="danger"
          @click="handleDelete($event)"
        >
          批量删除
        </el-button>
      </my-query-form-left-panel>
    </my-query-form>
    <vxe-table
      border
      show-overflow
      ref="xTree"
      :data="list"
      :row-config="{ isHover: true }"
      :column-config="{ resizable: true }"
      :tree-config="tableTreeConfig"
      :checkbox-config="{ highlight: true }"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
    >
      <vxe-column
        align="center"
        type="checkbox"
        width="60"
        fixed="left"
      ></vxe-column>
      <vxe-column
        field="title"
        title="菜单名称"
        tree-node
        width="260"
        fixed="left"
      >
        <template #default="{ row }">
          <span>
            <span>{{ t(row.title) }}</span>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="path" title="访问路由" width="200"></vxe-column>
      <vxe-column field="component" title="组件路径" width="200"></vxe-column>
      <vxe-column align="center" field="icon" title="图标" width="150">
        <template #default="{ row }">
          <span>{{ row.icon }}</span>
        </template>
      </vxe-column>
      <vxe-column
        align="center"
        field="hideInMenu"
        title="隐藏侧边栏"
        width="120"
      >
        <template #default="{ row }">
          <span>{{ row.hideInMenu ? '隐藏' : '显示' }}</span>
        </template>
      </vxe-column>
      <vxe-column align="center" field="hideInBread" title="面板屑" width="120">
        <template #default="{ row }">
          <span>{{ row.hideInBread ? '隐藏' : '显示' }}</span>
        </template>
      </vxe-column>
      <vxe-column
        align="center"
        field="noCloseTab"
        title="不可关闭页签"
        width="120"
      >
        <template #default="{ row }">
          <span>{{ row.noCloseTab ? '是' : '否' }}</span>
        </template></vxe-column
      >
      <vxe-column align="center" field="isNew" title="新增" width="100">
        <template #default="{ row }">
          <span>{{ row.isNew ? '是' : '否' }}</span>
        </template>
      </vxe-column>
      <vxe-column
        align="center"
        field="sort"
        title="排序"
        width="100"
      ></vxe-column>
      <vxe-column align="center" title="操作" min-width="160" fixed="right">
        <template #default="{ row }">
          <el-button
            @click="handleMenu(row)"
            plain
            size="small"
            type="primary"
            :icon="Edit"
          >
          </el-button>
          <el-button
            @click="handleDelete(row)"
            plain
            size="small"
            type="danger"
            :icon="Delete"
          ></el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <add-or-edit ref="addEditRef" :list="list"></add-or-edit>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons'
import { reactive, toRefs, ref } from 'vue'
import { VxeTablePropTypes, VxeTableInstance } from 'vxe-table'
import { getRouterList } from '@/api/router'
import { useI18n } from 'vue-i18n'
import { successMessage } from '@/utils/message'
import { ElMessageBox } from 'element-plus'
import AddOrEdit from './components/AddOrEdit.vue'

const state = reactive({
  tableTreeConfig: {
    // transform: true,
    // rowField: 'id',
    parentField: 'parentId',
    // 通过设置 tree-config={iconOpen, iconClose} 局部替换默认的图标
    iconOpen: 'iconfont icon-suo',
    iconClose: 'iconfont icon-shangxiazhankai'
  } as VxeTablePropTypes.TreeConfig,
  list: [],
  selectIds: [] // 选中的id集合
})

const { t } = useI18n()

const fetchData = async () => {
  let {
    data: { routers }
  } = await getRouterList()
  state.list = routers
}

fetchData()

const xTree = ref({} as VxeTableInstance)

interface SonData {
  init: () => void
}

// 新增或编辑组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>()

// 新增或编辑用户方法
const handleMenu = row => {
  // console.log(row?.id)
  // console.log(addEditRef.value)
  // console.log(addEditRef.value.init(row))
  if (row?.id) {
    addEditRef.value.init(row)
  } else {
    addEditRef.value.init()
  }
}

const handleDelete = row => {
  // console.log(row)
  if (row?.id) {
    ElMessageBox.confirm('您确定要删除当前项吗?', '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        successMessage('模拟删除成功')
      })
      .catch(() => {
        // 不操作
      })
  } else {
    if (state.selectIds.length > 0) {
      ElMessageBox.confirm('您确定要进行批量删除吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          successMessage('模拟删除成功')
        })
        .catch(() => {
          // 不操作
        })
    }
  }
}

const selectChangeEvent = param => {
  // 重置选中的id
  state.selectIds = []
  const selectRows = param.records
  selectRows.forEach((item): void => {
    state.selectIds.push(item.id)
  })
  console.log(state.selectIds)
}

const { tableTreeConfig, list, selectIds } = toRefs(state)
</script>

<style lang="scss" scoped>
:deep(.vxe-table--render-default .vxe-tree--btn-wrapper) {
  display: flex;
  align-items: center;
  i {
    font-size: 16px;
  }
}
</style>
