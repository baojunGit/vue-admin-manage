<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { successMessage } from '@/utils/message';

interface RoleItem {
	id?:string;
	roleName?: string;
	type?: number;
	status?: number;
	desc?: string;
}

const visible = ref(false);
const title = ref('');
const formRef = ref(null);
const form = ref<RoleItem>({
	roleName: '',
	type: undefined,
	status: 1,
	desc: ''
});
const rules = ref({
	roleName: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
	type: [{ required: true, trigger: 'blur', message: '请选择角色类型' }]
});

const init = (row?: RoleItem) => {
	if (row?.id) {
		title.value = '编辑';
		nextTick(() => {
			form.value = { ...row };
		});
	} else {
		title.value = '添加';
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
		<el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model.trim="form.roleName" placeholder="请输入角色名称" />
			</el-form-item>
			<el-form-item label="角色类型" prop="type">
				<el-select v-model="form.type" placeholder="请选择角色类型" style="width: 100%">
					<el-option label="非关联数据类角色" :value="0"></el-option>
					<el-option label="关联数据类角色" :value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="角色描述" prop="desc">
				<el-input v-model.trim="form.desc" placeholder="请输入角色描述" />
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio-group v-model="form.status">
					<el-radio :label="1"> 正常 </el-radio>
					<el-radio :label="0"> 停用 </el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="handleClose"> 取 消 </el-button>
			<el-button type="primary" @click="handleSave"> 确 定 </el-button>
		</template>
	</el-dialog>
</template>
