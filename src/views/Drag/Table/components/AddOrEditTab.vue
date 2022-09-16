<script setup lang="ts">
import { reactive, toRefs, nextTick } from 'vue';
import { successMessage } from '@/utils/message';

const state = reactive({
	title: '',
	visible: false,
	formRef: null,
	form: {
		id: '',
		name: '',
		desc: ''
	}
});

const init = row => {
	if (row?.id) {
		state.title = '编辑面板';
		nextTick(() => {
			state.form = Object.assign({}, row);
		});
	} else {
		state.title = '新建面板';
	}
	state.visible = true;
};

const handleClose = () => {
	state.formRef.resetFields();
	state.visible = false;
};

// 声明事件
const emit = defineEmits(['refresh']);
const handleSave = () => {
	successMessage('模拟保存/新增成功');
	// emit子传父调用父组件事件, 有传参就逗号隔开
	emit('refresh');
	handleClose();
};

const { title, formRef, visible, form } = toRefs(state);

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
