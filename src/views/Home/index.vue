<script setup lang="ts">
import { VersionInfo, MyProject, QuickNav, TodoList } from './components';
import { useSettingStore } from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
const settingStore = useSettingStore();
const { mobile } = storeToRefs(settingStore);

const handleTip = () => {
	const hour = new Date().getHours();
	return hour < 8
		? `早安，管理员，新的一天新的开始`
		: hour <= 11
		? `上午好，管理员，一日之计在于晨`
		: hour <= 13
		? `午安，管理员，记得休息一下哦`
		: hour < 18
		? `下午好，管理员，下个早班吧`
		: `晚上好，管理员，愿你三冬暖，愿你春不寒`;
};
</script>

<template>
	<div id="index-container">
		<!-- 自适应布局对应的类：
	  lg(pc大桌面显示器，≥1200px) md(中等屏幕显示器，≥992px) sm(小屏幕 平板 ≥768px) xs(超小屏幕 手机 <768px)-->
		<!-- gutter值为该单元格左右的padding之和, 即左右各10px -->
		<el-row :gutter="20">
			<!-- 首栏 -->
			<el-col :span="24">
				<el-card>
					<div class="box-card">
						<div class="box-card-left">
							<img class="user-avatar" src="@/assets/images/face.gif" />
							<div class="index-header-tip">
								<p class="index-header-tip-title">
									{{ handleTip() }}
								</p>
							</div>
						</div>
						<FlipClock v-if="!mobile"></FlipClock>
					</div>
				</el-card>
			</el-col>
			<el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
				<QuickNav></QuickNav>
			</el-col>
			<el-col :xl="18" :lg="18" :md="18" :sm="24" :xs="24">
				<TodoList></TodoList>
			</el-col>
			<el-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
				<VersionInfo></VersionInfo>
			</el-col>
			<el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
				<MyProject></MyProject>
			</el-col>
		</el-row>
	</div>
</template>

<style lang="scss" scoped>
#index-container {
	.box-card {
		display: flex;
		justify-content: space-between;
		.box-card-left {
			display: flex;
			align-items: center;
			.user-avatar {
				width: 60px;
				height: 60px;
				margin-right: 20px;
				border-radius: 50%;
			}
			.index-header-tip-title {
				font-size: 20px;
				font-weight: bold;
				color: var(--el-text-color-primary);
			}
		}
	}
}
</style>
