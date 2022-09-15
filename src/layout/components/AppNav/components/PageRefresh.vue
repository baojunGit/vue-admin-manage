<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { toggleClass, removeClass } from '@/utils/useClass';

/**
 * @description getCurrentInstance获取当前组件实例
 * @proxy 获取挂载到全局中的方法
 */
const { proxy }: any = getCurrentInstance();
const refreshRoute = async () => {
	// console.log(document.querySelector('.rotate'))
	toggleClass(true, 'refresh-button', document.querySelector('.rotate'));
	proxy.$pub('reload-router-view');
	// 600ms刚好完成一轮动态效果，转了一圈
	setTimeout(() => {
		removeClass(document.querySelector('.rotate'), 'refresh-button');
	}, 600);
};
</script>

<template>
	<div class="page-refresh">
		<i class="iconfont icon-shuaxin2 rotate" @click="refreshRoute"></i>
	</div>
</template>

<style lang="scss" scoped>
/* 刷新按钮动画效果 */
.page-refresh {
	.refresh-button {
		transition-duration: 600ms;
		transition-property: -webkit-transform;
		transition-property: -moz-transform;
		animation: rotate 600ms linear infinite;
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
}
</style>
