<script setup lang="ts">
import './index.scss';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Center, CenterLeft, CenterRight } from './components';
import { recentlyMonth } from '@/utils/date';
// 自适应配置方法
import adaptive from './util';
import AppScreenfull from '@/components/AppScreenfull.vue';
// 适配处理
const { screenRef, calcRate, windowDraw, unWindowDraw } = adaptive();
// 生命周期
onMounted(() => {
	// todo 屏幕适应
	windowDraw();
	calcRate();
	cancelLoading();
});

onBeforeUnmount(() => {
	unWindowDraw();
});
const loading = ref(true);
const cancelLoading = () => {
	setTimeout(() => {
		loading.value = false;
	}, 1000);
};

const daterange = ref([]);
daterange.value = recentlyMonth();
</script>

<template>
	<div id="data-operation">
		<div class="data-operation-wrap" ref="screenRef">
			<div class="bg">
				<div
					v-if="loading"
					v-loading.fullscreen.lock="true"
					element-loading-text="Loading..."
					element-loading-background="rgba(0, 0, 0, 0.8)"
					class="loading"
				></div>
				<!-- 主体部分内容 -->
				<div v-else class="host-body">
					<!-- 头部：第一行 -->
					<header>
						<div class="select-page">
							<div class="select-page-item active">数字化运营</div>
							<div class="select-page-item">服务监控</div>
							<div class="select-page-item">需求管理</div>
						</div>
						<div class="header-title">数字化运营</div>
						<div class="select-range">
							<el-date-picker
								v-model="daterange"
								type="daterange"
								range-separator="至"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
								unlink-panels
							>
							</el-date-picker>
							<AppScreenfull />
						</div>
					</header>
					<!-- 主体数据报表 -->
					<main>
						<div class="content-box">
							<center-left></center-left>
							<center></center>
							<center-right></center-right>
						</div>
					</main>
				</div>
			</div>
		</div>
	</div>
</template>
