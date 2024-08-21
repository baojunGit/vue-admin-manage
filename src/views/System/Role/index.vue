<script setup lang="ts">
import { ref } from 'vue';
import { Delete, Plus, Search, Edit, Check } from '@element-plus/icons-vue';
import { getRoleList } from '@/api/role';
import AddOrEdit from './components/AddOrEdit.vue';
import { successMessage, errorMessage } from '@/utils/message';
import { ElMessageBox } from 'element-plus';
import RoleSetDrawer from './components/RoleSetDrawer.vue';

const queryParams = ref({
	pageNum: 1,
	pageSize: 5,
	roleName: ''
});
const list = ref([]);
const total = ref<number | null>(null);
const loading = ref(false);
const selectIds = ref<number[]>([]);

const fetchData = async () => {
	loading.value = true;
	const {
		data: { dataList, total: totalData }
	} = await getRoleList(queryParams.value);
	list.value = dataList;
	total.value = totalData;
	loading.value = false;
};
fetchData();

const queryData = () => {
	queryParams.value.pageNum = 1;
	fetchData();
};

const pageQuery = (param: any) => {
	if (param.type === 'size') queryParams.value.pageNum = 1;
	fetchData();
};

interface DialogObj {
	init: () => void;
}
const addEditRef = ref<InstanceType<typeof AddOrEdit> & DialogObj>();
const handleRole = (row?: any) => {
	if (row?.id) {
		addEditRef.value?.init(row);
	} else {
		addEditRef.value?.init();
	}
};

const selectChangeEvent = (param: any) => {
	selectIds.value = [];
	const selectRows = param.records;
	for (const { id } of selectRows) {
		selectIds.value.push(id);
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
		} else {
			errorMessage('未选中任何行');
		}
	}
};

const handleStatusChange = (row: any) => {
	const text = row.status === 0 ? '停用' : '启用';
	ElMessageBox.confirm(`您确定要${text}${row.roleName}角色吗?`, '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			successMessage(`模拟${text}成功`);
		})
		.catch(() => {
			row.status = row.status === 0 ? 1 : 0;
		});
};

interface DrawerObj {
	init: () => void;
}
const roleDrawer = ref<InstanceType<typeof RoleSetDrawer> & DrawerObj>();
const handleMenu = (row: any) => {
	roleDrawer.value?.init(row);
};
</script>

<template>
	<div id="role-container">
		<QueryForm>
			<QueryFormLeftPanel :span="12">
				<el-button
					plain
					:icon="Plus"
					type="primary"
					@click="handleRole($event)"
				>
					添加
				</el-button>
				<el-button
					plain
					:icon="Delete"
					type="danger"
					@click="handleDelete($event)"
				>
					批量删除
				</el-button>
			</QueryFormLeftPanel>
			<QueryFormRightPanel :span="12">
				<el-form :inline="true" :model="queryParams" @submit.prevent>
					<el-form-item>
						<el-input
							@keyup.enter="queryData()"
							v-model.trim="queryParams.roleName"
							clearable
							placeholder="请输入角色名"
						/>
					</el-form-item>
					<el-form-item>
						<el-button :icon="Search" type="primary" @click="queryData()">
							查询
						</el-button>
					</el-form-item>
				</el-form>
			</QueryFormRightPanel>
		</QueryForm>
		<vxe-table
			border
			align="center"
			:data="list"
			:loading="loading"
			:row-config="{ isHover: true }"
			row-id="id"
			:checkbox-config="{ checkField: 'checked' }"
			@checkbox-change="selectChangeEvent"
			@checkbox-all="selectChangeEvent"
		>
			<vxe-column type="checkbox" width="60"></vxe-column>
			<vxe-column field="id" title="No" width="60"></vxe-column>
			<vxe-column
				field="roleName"
				title="角色名称"
				width="100"
				show-overflow
			></vxe-column>
			<vxe-column field="type" title="角色类型" width="140">
				<template #default="{ row }">
					<el-tag v-if="row.type" type="success"> 数据关联类角色 </el-tag>
					<el-tag v-else> 非数据关联类角色 </el-tag>
				</template>
			</vxe-column>
			<vxe-column
				field="desc"
				title="角色描述"
				width="300"
				show-overflow
			></vxe-column>
			<vxe-column field="status" title="状态" width="80">
				<template #default="{ row }">
					<el-switch
						v-model="row.status"
						:active-value="1"
						:inactive-value="0"
						@change="handleStatusChange(row)"
					></el-switch>
				</template>
			</vxe-column>
			<vxe-column field="datetime" title="修改时间" width="180"></vxe-column>
			<vxe-column title="操作" min-width="160" fixed="right">
				<template #default="{ row }">
					<el-button
						@click="handleRole(row)"
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
					<el-button
						@click="handleMenu(row)"
						plain
						size="small"
						type="warning"
						:icon="Check"
					></el-button>
				</template>
			</vxe-column>
		</vxe-table>
		<vxe-pager
			style="height: 80px"
			perfect
			align="center"
			size="small"
			@page-change="pageQuery"
			v-model:current-page="queryParams.pageNum"
			v-model:page-size="queryParams.pageSize"
			:total="total"
			:page-sizes="[
				5,
				20,
				50,
				100,
				{ label: '大量数据', value: 1000 },
				{ label: '全量数据', value: -1 }
			]"
			:layouts="[
				'PrevJump',
				'PrevPage',
				'Number',
				'NextPage',
				'NextJump',
				'Sizes',
				'FullJump',
				'Total'
			]"
		>
		</vxe-pager>
		<AddOrEdit ref="addEditRef" @refresh="fetchData"></AddOrEdit>
		<RoleSetDrawer ref="roleDrawer"></RoleSetDrawer>
	</div>
</template>
