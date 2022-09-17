<!-- inheritAttrs: false解决报错 Extraneous non-props attributes (data) were passed to component 
but could not be automatically inherited because component renders fragment or text root nodes.  -->
<!-- inheritAttrs: false的含义是不希望本组件的根元素继承父组件的attribute，同时父组件传过来的属性（没有被子组件的props接收的属性），也不会显示在子组件的dom元素上，但是在组件里可以通过其$attrs
可以获取到没有使用的注册属性, ``inheritAttrs: false`是不会影响 style 和 class 的绑定
简而言之：inheritAttrs只是用来控制attrs是否在DOM中渲染 -->
<script setup lang="ts">
import { reactive, toRefs, nextTick } from 'vue';
import { successMessage } from '@/utils/message';

const state = reactive({
	visible: false,
	title: '',
	formRef: null,
	form: {
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
	},
	rules: {
		title: [{ required: true, trigger: 'blur', message: '请输入菜单名称' }]
	}
});

const init = row => {
	if (row?.id) {
		state.title = '编辑';
		// 深拷贝
		nextTick(() => {
			state.form = Object.assign({}, row);
		});
	} else {
		state.title = '添加';
	}
	state.visible = true;
};

// 1.如果一个数据依赖于其他数据，那么把这个数据设计为computed的
// 2.如果你需要在某个数据变化时做一些事情，使用watch来观察这个数据变化
// const formTitle = computed(() => {
//   return t(state.form.title)
// })

const handleClose = () => {
	// 移除校验结果并重置字段值
	state.formRef.resetFields();
	state.visible = false;
};

// 声明事件
const emit = defineEmits(['refresh']);
const handleSave = () => {
	state.formRef.validate(async valid => {
		if (!valid) return;
		successMessage('模拟保存/新增成功');
		// emit子传父调用父组件事件, 有传参就逗号隔开
		emit('refresh');
		handleClose();
	});
};

const changeSelect = param => {
	state.form.parentId = param?.id;
};

const { formRef, visible, title, form, rules } = toRefs(state);

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
						<!-- 用 v-model.number 绑定后输入框只能输入整数了，但是不用.number 的修饰的话绑定的字段又变成文本类型了 -->
						<!-- $event  是你$emit传的参数，固定值 -->
						<!-- $attrs 用于多层级组件间传参，传递排除了作为props的那部分参数 -->
						<!-- :data="menuOptions" my-tree-select全局组件传参 -->
						<!-- $attrs也可以用 import { useAttrs } from vue  const attrs = useAttrs()来获取 -->
						<AppTreeSelect
							v-bind="$attrs"
							v-model="form.parentId"
							:config="{ label: 'title', value: 'id', children: 'children' }"
							@select="changeSelect($event)"
						></AppTreeSelect>
						<!-- normalizer 自定义键名 -->
						<!-- show-count 显示分支数 -->
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

<script lang="ts">
export default {
	inheritAttrs: false
};
</script>
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
