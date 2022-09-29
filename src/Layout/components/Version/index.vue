<script setup lang="ts">
import { useVersionStore } from '@/store/modules/version';
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';

const versionStore = useVersionStore();
const settingStore = useSettingStore();

const { openVersion } = storeToRefs(versionStore);
const { mobile } = storeToRefs(settingStore);
</script>

<template>
	<div class="version-announcement">
		<el-dialog
			title="版本记录"
			:width="mobile ? '90%' : '50%'"
			:append-to-body="false"
			v-model="openVersion"
		>
			<el-timeline>
				<el-timeline-item timestamp="2022/9/15" placement="top">
					<el-card>
						<h2>vue3后台管理系统V2.2.1</h2>
						<h4>【优化】</h4>
						<p>1.新增版本记录</p>
						<p>2.新增悬停效果组件</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/9/1" placement="top">
					<el-card>
						<h2>vue3后台管理系统V2.2.0</h2>
						<h4>【优化】</h4>
						<p>1.新增版本记录</p>
						<p>2.新增悬停效果组件</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/8/20" placement="top">
					<el-card>
						<h2>vue3后台管理系统V2.1.2</h2>
						<h4>【优化】</h4>
						<p>1.新增版本记录</p>
						<p>2.新增悬停效果组件</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/8/20" placement="top">
					<el-card>
						<h2>vue3后台管理系统V2.1.1</h2>
						<h4>【新功能发布】</h4>
						<p>1.新增版本记录</p>
						<p>2.新增悬停效果组件</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/8/5" placement="top">
					<el-card>
						<h2>vue3后台管理系统V2.1.0</h2>
						<h4>【新功能发布】</h4>
						<p>1.新增大屏页面</p>
						<p>2.新增悬停效果组件</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/7/10" placement="top">
					<el-card>
						<h2>vue3后台管理系统V2.1.0</h2>
						<h4>【新功能发布】</h4>
						<p>1.新增大屏页面</p>
						<p>2.新增悬停效果组件</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/6/18" placement="top">
					<el-card>
						<h2>vue3后台管理系统V2.0.0</h2>
						<h4>【项目重构】</h4>
						<p>1.用vite3重构项目</p>
						<p>2.重构项目文件命名及项目结构</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/5/8" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.5.3</h2>
						<h4>【功能增强】</h4>
						<p></p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/4/8" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.5.2</h2>
						<h4>【功能增强】</h4>
						<p>引入nest后端服务接口，增加环境判定接口调用方式</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/4/8" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.5.1</h2>
						<h4>【bug修复】</h4>
						<p>修复背景图切换菜单栏没有背景的异常</p>
						<p>修复tabs封装组件点击事件传承问题</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/3/26" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.5.0</h2>
						<h4>【性功能发布】</h4>
						<p>引入css var变量，新增主题切换功能</p>
						<p>新增侧边栏背景图切换功能</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/2/21" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.4.0</h2>
						<h4>【新功能发布】</h4>
						<p>引入vuedraggable第三方库，新增卡片拖拽功能</p>
						<p>封装自定义tabs切换组件</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/1/26" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.3.2</h2>
						<h4>【功能增强】</h4>
						<p>新增数据字典功能</p>
						<h4>【bug修复】</h4>
						<p>修复表格拖拽提交数据后没有显示默认勾选项目的问题</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/1/26" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.3.0</h2>
						<h4>【功能增强】</h4>
						<p>优化动态路由获取相关逻辑代码</p>
						<h4>【bug修复】</h4>
						<p>修复i18n国际化问题</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2022/1/10" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.2.2</h2>
						<h4>【新功能发布】</h4>
						<p>1.新增管理系统反馈功能</p>
						<p>2.上线反馈功能中我的反馈页面</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/12/30" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.2.1</h2>
						<h4>【功能增强】</h4>
						<p>兼容移动端，进行移动端适配</p>
						<h4>【功能优化】</h4>
						<p>图片存放在自己创建的文件服务器目录里</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/12/15" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.1.3</h2>
						<h4>【新功能发布】</h4>
						<p>1.新增文章管理，引入wangEditor富文本</p>
						<p>2.新增拖拽功能模块，完成表格拖拽展示页面</p>
						<h4>【功能优化】</h4>
						<p>1.优化消息提示功能体验</p>
						<p>2.优化消息提示内容超出，悬浮显示效果</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/12/5" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.1.2</h2>
						<h4>【新功能发布】</h4>
						<p>1.新增用户管理页面</p>
						<p>2.新增角色管理页面</p>
						<h4>【功能优化】</h4>
						<p>1.使用pinia替代vuex进行状态管理</p>
						<p>2.优化拖拽悬浮球的伸缩动画</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/11/30" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.1.1</h2>
						<h4>【新功能发布】</h4>
						<p>
							完成首页模块功能<br />
							（1）新增头部时间翻转动态效果<br />
							（2）新增快捷导航<br />
							（3）新增待办事项<br />
							（4）新增项目部署信息<br />
							（5）新增我的项目导航<br />
						</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/11/18" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.1.0</h2>
						<h4>【新功能发布】</h4>
						<p>
							新增【nav栏目】<br />
							（1）新增通知模块；<br />
							（2）新增全屏切换按钮；<br />
							（3）新增国际化语言切换；<br />
							（4）实现页面组件局部刷新功能；<br />
						</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/10/23" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.0.2</h2>
						<h4>【新功能发布】</h4>
						<p>新增动态标签页功能</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/10/10" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.0.1</h2>
						<h4>【功能增强】</h4>
						<p>实现动态路由功能</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<el-timeline>
				<el-timeline-item timestamp="2021/9/20" placement="top">
					<el-card>
						<h2>vue3后台管理系统V1.0.0</h2>
						<h4>【初始化项目】</h4>
						<p>vue3后台管理系统，完成基本架构上线</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
		</el-dialog>
	</div>
</template>

<style lang="scss" scoped>
// 不能写在.version-announcement里，因为不是它里面的后代元素
h2 {
	font-size: 18px;
	font-weight: 700;
	line-height: 32px;
	color: $base-color-blue;
}
h4 {
	margin-left: $base-margin;
	line-height: 32px;
}
p {
	margin-left: $base-margin * 2;
	line-height: 30px;
	span {
		font-size: 22px;
		font-weight: 700;
	}
}
</style>
