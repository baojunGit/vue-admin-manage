<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
// 如果是ref则返回ref.value的值，不是则返回传入的对象
import { unref } from 'vue';
const router = useRouter();
const route = useRoute();
const onFresh = () => {
	const { path, query } = unref(route);
	router.replace({
		path: '/redirect' + path,
		query: query
	});
};
</script>

<template>
	<div class="page-refresh">
		<i class="iconfont icon-shuaxin2 rotate" @click="onFresh"></i>
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
