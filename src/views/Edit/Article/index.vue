<script setup lang="ts">
import {
	onBeforeUnmount,
	ref,
	shallowRef,
	onMounted,
	reactive,
	toRefs,
	watch,
	nextTick
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IToolbarConfig } from '@wangeditor/editor';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Search } from '@element-plus/icons-vue';
import type { ElTree, ElInput } from 'element-plus';
import { getArticleList } from '@/api/article';

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
	setTimeout(() => {
		valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
	}, 1500);
});

// 将toolbarConfig设置为空对象，默认模式下就会加载所有的功能组件
// const toolbarConfig = {};
const toolbarConfig: Partial<IToolbarConfig> = {
	toolbarKeys: [
		// 菜单 key
		'headerSelect',

		// 分割线
		'|',

		// 菜单 key
		'fontSize',
		'fontFamily',
		'lineHeight',
		'bold',
		'underline',
		'italic',
		'through',
		'clearStyle',
		'color',
		'bgColor',
		// 菜单组，包含多个菜单
		{
			key: 'group-more-justify', // 必填，要以 group 开头
			title: '对齐方式', // 必填
			iconSvg:
				'<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>', // 可选
			menuKeys: [
				'justifyLeft',
				'justifyRight',
				'justifyCenter',
				'justifyJustify'
			] // 下级菜单 key ，必填
		},
		{
			key: 'group-more-indent',
			title: '缩进配置',
			iconSvg:
				'<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
			menuKeys: ['indent', 'delIndent']
		},
		'insertLink',
		{
			key: 'group-more-image',
			title: '图片配置',
			iconSvg:
				'<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>', // 可选
			menuKeys: ['insertImage', 'uploadImage']
		},
		'insertTable',
		'insertVideo',
		{
			key: 'group-more-style',
			title: '更多样式',
			iconSvg:
				'<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>', // 可选
			menuKeys: ['code']
		},
		'fullScreen'
	]
};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
	const editor = editorRef.value;
	if (editor == null) return;
	editor.destroy();
});

const handleCreated = editor => {
	editorRef.value = editor; // 记录 editor 实例，重要！
};

const state = reactive({
	list: [],
	// default 默认模式 - 集成了 wangEditor 所有功能
	// simple 简洁模式 - 仅有部分常见功能，但更加简洁易用
	mode: 'default',
	defaultProps: {
		children: 'children',
		label: 'title'
	},
	menuIds: [2],
	openLevel: '收合所有',
	dynamicTags: ['html', 'css', 'js'],
	inputValue: '',
	inputVisible: false
});

const fetchData = async () => {
	const { data } = await getArticleList();
	state.list = data;
};
fetchData();

interface Tree {
	id: number;
	title: string;
	children?: Tree[];
}
const filterNode = (value: string, data: Tree) => {
	if (!value) return true;
	return data.title.includes(value);
};

const name = ref('');
const treeRef = ref<InstanceType<typeof ElTree>>();

// 不能监听state.name这种会报错？
watch(name, val => {
	treeRef.value!.filter(val);
});

const handleClose = tag => {
	state.dynamicTags.splice(state.dynamicTags.indexOf(tag), 1);
};

const handleInputConfirm = () => {
	if (state.inputValue) {
		state.dynamicTags.push(state.inputValue);
	}
	state.inputVisible = false;
	state.inputValue = '';
};

const inputRef = ref<InstanceType<typeof ElInput>>();
const showInput = () => {
	state.inputVisible = true;
	nextTick(() => {
		inputRef.value!.input!.focus();
	});
};

const {
	mode,
	list,
	defaultProps,
	menuIds,
	dynamicTags,
	inputValue,
	inputVisible
} = toRefs(state);
</script>

<template>
	<el-row :gutter="20">
		<el-col :xl="5" :lg="5" :md="5" :sm="24" :xs="24">
			<el-card>
				<template #header>
					<el-input v-model="name" placeholder="请输入文章名">
						<template #suffix>
							<el-icon class="el-input__icon">
								<Search />
							</el-icon>
						</template>
					</el-input>
				</template>
				<el-tree
					ref="treeRef"
					:data="list"
					:props="defaultProps"
					node-key="id"
					:default-expanded-keys="[]"
					:default-checked-keys="menuIds"
					:filter-node-method="filterNode"
				></el-tree>
			</el-card>
		</el-col>
		<el-col :xl="19" :lg="19" :md="19" :sm="24" :xs="24">
			<el-card>
				<template #header>
					<el-tag
						size="large"
						v-for="tag in dynamicTags"
						:key="tag"
						mr10
						closable
						:disable-transitions="false"
						@close="handleClose(tag)"
					>
						{{ tag }}
					</el-tag>
					<el-input
						v-if="inputVisible"
						ref="inputRef"
						v-model="inputValue"
						mr10
						style="width: 100px"
						@keyup.enter="handleInputConfirm"
						@blur="handleInputConfirm"
					>
					</el-input>
					<el-button v-else class="button-new-tag ml-1" @click="showInput">
						+ 增加标签
					</el-button>
				</template>
				<!-- wangEditor 工具栏内置了“全屏”菜单，但使用它需要有一个条件：
                toolbar-container 和 editor-container 必须有同一个父元素，最好不要用其它UI组件当父元素，会导致全屏出现错乱或空白
                且要设置最高层级覆盖页面其它元素 -->
				<div class="full-screen-container" style="z-index: 9999">
					<Toolbar
						style="border-bottom: 1px solid #cccccc"
						:editor="editorRef"
						:defaultConfig="toolbarConfig"
						:mode="mode"
					/>
					<Editor
						style="height: 500px; overflow-y: hidden"
						v-model="valueHtml"
						:defaultConfig="editorConfig"
						:mode="mode"
						@on-created="handleCreated"
					/>
				</div>
			</el-card>
		</el-col>
	</el-row>
</template>

<style lang="scss" scoped>
:deep() {
	.el-card {
		box-sizing: border-box; // 消除border引起的滚动条
		height: calc($base-page-height - $base-padding * 2);
		overflow: hidden;
		.el-card__body {
			box-sizing: border-box;

			// 要设置固定高度，overflow: auto才会出现滚动条
			height: calc($base-page-height - $base-padding * 2 - 70px);
			padding: 10px;
			overflow: auto;
			.full-screen-container {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 100%;

				// 解决全屏后底部按钮出现其它元素，设置背景色遮盖
				.card-footer {
					padding: 10px;
					background-color: #ffffff;
				}
			}
		}
	}
}
</style>
