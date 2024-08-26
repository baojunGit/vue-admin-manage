<script setup lang="ts">
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { getDictItem } from '@/api/dict';

interface DictItem {
	id: string;
	dictId: string;
	itemValue: string;
	desc: string;
	sort: number;
	status: boolean;
	updateTime: string;
}

const drawer = ref(false);
const list = ref<DictItem[]>([]);

const init = async (row?: any) => {
	drawer.value = true;
	const {
		data: { list: itemList }
	} = await getDictItem(row?.dictId);
	console.log(itemList);
	list.value = itemList;
};

const handleClose = () => {
	drawer.value = false;
};

defineExpose({
	init
});
</script>

<template>
	<el-drawer
		title="字典参数"
		v-model="drawer"
		direction="rtl"
		:before-close="handleClose"
		:close-on-click-modal="false"
		size="900px"
	>
		<QueryForm>
			<QueryFormLeftPanel :span="12">
				<el-button plain :icon="Plus" type="primary"> 添加 </el-button>
			</QueryFormLeftPanel>
		</QueryForm>
		<vxe-table border align="center" :data="list">
			<vxe-column field="dictName" title="字典名称"></vxe-column>
			<vxe-column field="itemText" title="字典属性"></vxe-column>
			<vxe-column field="itemValue" title="字典值"></vxe-column>
			<vxe-column field="sort" title="顺序"></vxe-column>
			<vxe-column field="status" title="状态"></vxe-column>
		</vxe-table>
	</el-drawer>
</template>
