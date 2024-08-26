<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { VxeTablePropTypes, VxeTableInstance } from 'vxe-table';
import { getMenuList } from '@/api/menu';
import { successMessage } from '@/utils/message';
import { ElMessageBox } from 'element-plus';
import AddOrEdit from './components/AddOrEdit.vue';

const tableTreeConfig = ref<VxeTablePropTypes.TreeConfig>({
	// transform: true,
	// rowField: 'id',
	parentField: 'parentId',
	// 通过设置 tree-config={iconOpen, iconClose} 局部替换默认的图标
	iconOpen: 'iconfont icon-suo',
	iconClose: 'iconfont icon-shangxiazhankai'
});

const list = ref([]);
const selectIds = ref<number[]>([]); // 选中的id集合
const menuOptions = ref([]); // 树形菜单栏选项

const fetchData = async () => {
	const { data } = await getMenuList();
	list.value = data;
};

fetchData();

const xTree = ref<VxeTableInstance | null>(null);

interface SonData {
	init: () => void;
}

// 新增或编辑组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>();

// 新增或编辑用户方法
const handleMenu = (row?: any) => {
	menuOptions.value = [];
	const root = { id: '0', parentId: null, title: '根目录' };
	menuOptions.value = [{ ...root, children: list.value }];
	if (row?.id) {
		addEditRef.value?.init(row);
	} else {
		addEditRef.value?.init();
	}
};

const handleDelete = (row?: any) => {
	if (row?.id) {
		ElMessageBox.confirm('您确定要删除当前项吗?', '温馨提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				successMessage('模拟删除成功');
			})
			.catch(() => {
				// 不操作
			});
	} else {
		if (selectIds.value.length > 0) {
			ElMessageBox.confirm('您确定要进行批量删除吗?', '温馨提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					successMessage('模拟删除成功');
				})
				.catch(() => {
					// 不操作
				});
		}
	}
};

const selectChangeEvent = (param: any) => {
	// 重置选中的id
	selectIds.value = [];
	const selectRows = param.records;
	for (const { id } of selectRows) {
		selectIds.value.push(id);
	}
};

</script>

<template>
	<div id="menu-container">
		<QueryForm>
			<QueryFormLeftPanel :span="12">
				<el-button
					plain
					:icon="Plus"
					type="primary"
					@click="handleMenu($event)"
				>
					添加
				</el-button>
				<el-button plain type="primary" @click="xTree.setAllTreeExpand(true)">
					<i class="iconfont icon-shangxiazhankai"><span ml6>展开全部</span></i>
				</el-button>
				<el-button plain type="primary" @click="xTree.clearTreeExpand()">
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
			</QueryFormLeftPanel>
		</QueryForm>
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
						<span>{{ row.title }}</span>
					</span>
				</template>
			</vxe-column>
			<vxe-column align="center" field="menuType" title="菜单类型" width="100">
				<template #default="{ row }">
					<el-tag v-if="row.menuType === 0"> 目录 </el-tag>
					<el-tag v-else-if="row.menuType === 1" type="success"> 菜单 </el-tag>
					<el-tag v-else type="info"> 按钮 </el-tag>
				</template>
			</vxe-column>
			<vxe-column field="path" title="访问地址" width="200"></vxe-column>
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
					<el-tag v-if="row.hideInMenu" type="warning"> 隐藏 </el-tag>
					<span v-else>显示</span>
				</template>
			</vxe-column>
			<vxe-column align="center" field="hideInBread" title="面包屑" width="120">
				<template #default="{ row }">
					<el-tag v-if="row.hideInBread" type="warning"> 隐藏 </el-tag>
					<span v-else>显示</span>
				</template>
			</vxe-column>
			<vxe-column
				align="center"
				field="noCloseTab"
				title="不可关闭页签"
				width="120"
			>
				<template #default="{ row }">
					<el-tag v-if="row.noCloseTab" type="warning"> 是 </el-tag>
					<span v-else>否</span>
				</template>
			</vxe-column>
			<vxe-column align="center" field="isNew" title="新增" width="100">
				<template #default="{ row }">
					<el-tag v-if="row.isNew" type="warning"> 是 </el-tag>
					<span v-else>否</span>
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
		<AddOrEdit
			ref="addEditRef"
			:data="menuOptions"
			@refresh="fetchData"
		></AddOrEdit>
	</div>
</template>

<style lang="scss" scoped>
:deep(.vxe-table--render-default .vxe-tree--btn-wrapper) {
	display: flex;
	align-items: center;
	i {
		font-size: 16px;
	}
}
</style>
