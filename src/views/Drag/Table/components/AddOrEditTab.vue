<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { successMessage } from '@/utils/message';

const title = ref('');
const visible = ref(false);
const formRef = ref(null);
const form = ref({
	id: '',
	name: '',
	desc: ''
});

const init = row => {
	if (row?.id) {
		title.value = '编辑面板';
		nextTick(() => {
			form.value = { ...row };
		});
	} else {
		title.value = '新建面板';
	}
	visible.value = true;
};

const handleClose = () => {
	formRef.value?.resetFields();
	visible.value = false;
};

// 声明事件
const emit = defineEmits(['refresh']);
const handleSave = () => {
	successMessage('模拟保存/新增成功');
	emit('refresh');
	handleClose();
};

defineExpose({
	init
});
</script>

<template>
	<el-dialog
		v-model="visible"
		:title="title"
		width="600px"
		@close="handleClose"
	>
		<el-form ref="formRef" label-width="auto" :model="form">
			<el-row :gutter="10">
				<el-col :span="12">
					<el-form-item label="面板ID" prop="id">
						<el-input
							v-model.trim="form.id"
							placeholder="新增会自动生成"
							disabled
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="面板名称" prop="name">
						<el-input v-model.trim="form.name" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="面板描述" prop="desc">
						<el-input v-model.trim="form.desc" type="textarea" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template #footer>
			<el-button @click="handleClose"> 取 消 </el-button>
			<el-button type="primary" @click="handleSave"> 确 定 </el-button>
		</template>
	</el-dialog>
</template>
