<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { successMessage } from '@/utils/message';

const visible = ref(false);
const title = ref('');
const formRef = ref(null);
const form = ref({
	id: '',
	parentId: '0',
	path: '',
	name: '',
	component: '',
	redirect: '',
	title: '',
	icon: '',
	frameSrc: '',
	external: false,
	hideInMenu: false,
	hideInBread: false,
	noCloseTab: false,
	sort: 1,
	isNew: true,
	menuType: 0,
	auth: '',
	query: '',
	children: null
});
const rules = ref({
	title: [{ required: true, trigger: 'blur', message: '请输入菜单名称' }]
});

const init = (row?: any) => {
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

const changeSelect = (param: any) => {
	form.value.parentId = param?.id;
};

defineExpose({
	init
});
</script>

<template>
	<el-dialog
		v-model="visible"
		:title="title"
		width="660px"
		@close="handleClose"
	>
		<el-form ref="formRef" :model="form" :rules="rules">
			<el-row :gutter="10">
				<el-col :span="24">
					<el-form-item label="上级菜单">
						<AppTreeSelect
							v-bind="$attrs"
							v-model="form.parentId"
							:config="{ label: 'title', value: 'id', children: 'children' }"
							@select="changeSelect($event)"
						></AppTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="菜单类型" prop="menuType">
						<el-radio-group v-model="form.menuType">
							<el-radio :label="0"> 目录 </el-radio>
							<el-radio :label="1"> 菜单 </el-radio>
							<el-radio :label="2"> 按钮 </el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单名称" prop="title">
						<el-input v-model.trim="form.title" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 2">
					<el-form-item label="菜单图标" prop="icon">
						<el-input v-model.trim="form.icon" />
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="form.menuType != 2">
					<el-form-item label="组件路径" prop="component">
						<el-input v-model.trim="form.component" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 2">
					<el-form-item label="访问地址" prop="path">
						<el-input v-model.trim="form.path" />
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType == 1">
					<el-form-item prop="path">
						<template #label>
							<el-tooltip
								content='访问路由的默认传递参数，如：`{"id":1,"name":"xxx"}`'
								placement="bottom"
								effect="customized"
							>
								<i class="iconfont icon-xinxi"></i>
							</el-tooltip>
							路由参数
						</template>
						<el-input v-model.trim="form.query" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="显示排序" prop="sort">
						<el-input-number
							v-model="form.sort"
							controls-position="right"
							:min="0"
						/>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 2">
					<el-form-item prop="hideInMenu">
						<template #label>
							<el-tooltip
								content="选择隐藏将不会出现在侧边菜单栏"
								placement="bottom"
								effect="customized"
							>
								<i class="iconfont icon-xinxi"></i>
							</el-tooltip>
							侧边菜单
						</template>
						<el-radio-group v-model="form.hideInMenu">
							<el-radio :label="false"> 显示 </el-radio>
							<el-radio :label="true"> 隐藏 </el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 2">
					<el-form-item prop="hideInBread">
						<template #label>
							<el-tooltip
								content="控制在面包屑导航中是否显示该菜单名"
								placement="bottom"
								effect="customized"
							>
								<i class="iconfont icon-xinxi"></i>
							</el-tooltip>
							面包屑
						</template>
						<el-radio-group v-model="form.hideInBread">
							<el-radio :label="false"> 显示 </el-radio>
							<el-radio :label="true"> 隐藏 </el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 1">
					<el-form-item prop="noCloseTab">
						<template #label>
							<el-tooltip
								content="控制是否在tab栏显示该页签"
								placement="bottom"
								effect="customized"
							>
								<i class="iconfont icon-xinxi"></i>
							</el-tooltip>
							tab页签
						</template>
						<el-radio-group v-model="form.noCloseTab">
							<el-radio :label="false"> 可关闭 </el-radio>
							<el-radio :label="true"> 不可关闭 </el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 2">
					<el-form-item prop="isNew">
						<template #label>
							<el-tooltip
								content="设置为新增会在菜单栏上显示new标识"
								placement="bottom"
								effect="customized"
							>
								<i class="iconfont icon-xinxi"></i>
							</el-tooltip>
							是否新增
						</template>
						<el-radio-group v-model="form.isNew">
							<el-radio :label="true"> 是 </el-radio>
							<el-radio :label="false"> 否 </el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 2">
					<el-form-item prop="auth">
						<template #label>
							<el-tooltip
								content="权限字符格式，参照`system:user:delete`"
								placement="bottom"
								effect="customized"
							>
								<i class="iconfont icon-xinxi"></i>
							</el-tooltip>
							权限字符
						</template>
						<el-input v-model.trim="form.auth" />
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
