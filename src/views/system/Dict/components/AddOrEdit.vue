<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { successMessage } from '@/utils/message';

interface DictItem {
	id?: string;
	dictName?: string;
	desc?: string;
	status?: string;
	datatime?: string;
}

// /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/  只能包含中文、英文字母、数字和下划线
const checkDictName = (_, value, callback) => {
	const patten = /^[a-zA-Z0-9_]+$/;
	const limit = /^(?!_)(?![0-9])/;
	if (!patten.test(value))
		return callback(new Error('只能包含英文字母、数字和下划线'));
	if (!limit.test(value))
		return callback(new Error('不能以数字或者下划线开头'));
	callback();
};

const visible = ref(false);
const title = ref('');
const formRef = ref(null);
const form = ref<DictItem>({});
const rules = ref({
	dictName: [{ required: true, trigger: 'blur', validator: checkDictName }]
});

// 重置表单数据
const resetForm = () => {
	form.value = {
		id: '',
		dictName: '',
		desc: '',
		status: '1'
	};
};

const init = (row?: DictItem) => {
	if (row?.id) {
		title.value = '编辑';
		nextTick(() => {
			form.value = { ...row };
		});
	} else {
		title.value = '添加';
		resetForm();
	}
	visible.value = true;
};

const handleClose = () => {
	formRef.value?.resetFields();
	visible.value = false;
};

// 定义事件类型接口
interface Emits {
  (e: 'refresh'): void;
}
const emit = defineEmits<Emits>()

const handleSave = () => {
	formRef.value?.validate(async (valid: boolean) => {
		if (!valid) return;
		successMessage('模拟保存/新增成功');
		emit('refresh');
		handleClose();
	});
};

defineExpose({
	init
});
</script>

<template>
	<el-dialog
		v-model="visible"
		:title="title"
		width="500px"
		@close="handleClose"
	>
		<el-form ref="formRef" :model="form" :rules="rules">
			<el-row :gutter="10">
				<el-col :span="24">
					<el-form-item label="字典名称" prop="dictName">
						<el-input v-model.trim="form.dictName" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="字典描述" prop="desc">
						<el-input v-model.trim="form.desc" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="状态" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio label="1"> 正常 </el-radio>
							<el-radio label="0"> 停用 </el-radio>
						</el-radio-group>
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

<style lang="scss">
.el-popper.is-customized {
	width: 200px;

	/* Set padding to ensure the height is 32px */
	padding: 6px 12px;
	color: #ffffff;
	background: linear-gradient(90deg, rgb(31 148 255), rgb(119 225 157));
}
.el-popper.is-customized .el-popper__arrow::before {
	right: 0;
	background: linear-gradient(45deg, #6ab6ce, #6db9cb);
}
</style>
