<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, Plus, Search, Edit, Download } from '@element-plus/icons-vue';
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';
import { successMessage, errorMessage } from '@/utils/message';
import AddOrEdit from './components/AddOrEdit.vue';

interface RoleItem {
	id: number;
	roleName: string;
}

const queryParams = ref({
	pageNum: 1,
	pageSize: 5,
	userName: '',
	org: '',
	roleName: ''
});
const list = ref([]);
const total = ref<number | null>(null);
const loading = ref(false);
const selectIds = ref<number[]>([]); // 选中的id集合
const roleList = ref<RoleItem[]>([]); // 权限列表

interface SonData {
	init: () => void;
}

// 新增或编辑组件实例
const addEditRef = ref<InstanceType<typeof AddOrEdit> & SonData>();

// 新增或编辑用户方法
const handleUser = (row?: any) => {
	if (row?.id) {
		addEditRef.value?.init(row);
	} else {
		addEditRef.value?.init();
	}
};

const fetchData = async () => {
	loading.value = true;
	const {
		data: { dataList, total: totalData }
	} = await getUserList(queryParams.value);
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

const selectChangeEvent = (param: any) => {
	// 重置选中的id
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

const fetchRoles = async () => {
	const {
		data: { dataList }
	} = await getRoleList();
	roleList.value = dataList;
};
fetchRoles();

// 第一个参数为true时代表下拉框打开，false为关闭下拉框时触发，第二个参数是行数据
const handleRole = (status: boolean) => {
	if (status) return false;
	ElMessageBox.confirm('您正在修改用户角色，是否继续?', '温馨提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			successMessage('模拟修改成功');
		})
		.catch(() => {
			// 不操作
		});
};
</script>

<template>
	<div id="user-container">
		<QueryForm>
			<QueryFormTopPanel>
				<!-- 行内表单模式 -->
				<el-form :inline="true">
					<el-form-item label="用户名">
						<el-input
							v-model="queryParams.userName"
							mr10
							clearable
							placeholder="请输入用户名或RTC"
							@keyup.enter="queryData"
						></el-input>
					</el-form-item>
					<el-form-item label="组织架构">
						<el-input
							mr10
							clearable
							v-model="queryParams.org"
							placeholder="请输入组织架构"
							@keyup.enter="queryData"
						></el-input>
					</el-form-item>
					<el-form-item label="网站角色">
						<el-select
							v-model="queryParams.roleName"
							placeholder="请选择角色"
							clearable
							@change="queryData"
						>
							<el-option label="中心用户" value="1" />
							<el-option label="团队用户" value="2" />
							<el-option label="室级用户" value="3" />
							<el-option label="组级用户" value="4" />
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button :icon="Search" type="primary"> 搜索 </el-button>
						<el-button>重置</el-button>
					</el-form-item>
				</el-form>
			</QueryFormTopPanel>
			<QueryFormBtnPanel>
				<el-button
					plain
					:icon="Plus"
					type="primary"
					@click="handleUser($event)"
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
				<el-button plain :icon="Download" type="warning"> 导出 </el-button>
			</QueryFormBtnPanel>
		</QueryForm>
		<!-- :checkbox-config="{ checkField: 'checked', trigger: 'row' }" 点击整行出发选中效果 -->
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
			<vxe-column field="userName" title="用户名" width="100"></vxe-column>
			<vxe-column field="account" title="账号" width="120"></vxe-column>
			<vxe-column
				field="info"
				title="信息"
				width="200"
				show-overflow
			></vxe-column>
			<vxe-column field="datetime" title="修改时间" width="180"></vxe-column>
			<vxe-column field="role" title="角色" min-width="180">
				<template #default="{ row }">
					<el-select
						multiple
						collapse-tags
						v-model="row.roleIds"
						@visible-change="handleRole($event)"
						style="width: 140px"
					>
						<el-option
							v-for="item in roleList"
							:key="item.id"
							:label="item.roleName"
							:value="item.id"
						></el-option>
					</el-select>
				</template>
			</vxe-column>
			<vxe-column title="操作" min-width="110" fixed="right">
				<template #default="{ row }">
					<el-button
						@click="handleUser(row)"
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
		<!-- style="height: 80px" 为了兼容移动端分页变成两行的样式 -->
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
		<AddOrEdit
			ref="addEditRef"
			@refresh="fetchData"
			:role-list="roleList"
		></AddOrEdit>
	</div>
</template>

<style lang="scss" scoped>
:deep() {
	.el-select {
		.el-select__tags {
			.el-tag--info {
				margin: 0 6px;
			}
			.el-tag--default.is-closable {
				padding: 0 9px;
			}
		}
		.el-tag__close {
			display: none;
		}
	}
}
</style>
