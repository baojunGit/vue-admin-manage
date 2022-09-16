<script setup lang="ts">
import AppFooter from '../AppFooter.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const routerKey = ref('');
watchEffect(() => {
	routerKey.value = route.path;
});
</script>

<template>
	<div class="app-page">
		<section>
			<router-view v-slot="{ Component }">
				<!-- vue 自带的过渡组件transition  -->
				<!-- 只有在加上appear才可以在页面第一次加载的时候就执行过渡动画 -->
				<!-- name可以设置相关动画类名的前缀 -->
				<transition appear name="page-transform" mode="out-in">
					<!-- 渲染一个“元组件”为动态组件，is的值是哪个组件的名称就显示哪个组件，Component是默认值 -->
					<!-- 利用 key 值的变化触发组件更新 ：vue 的虚拟 DOM 算法在比对 Vnode时会用到 key 作为唯一标识，key 值变了该元素就会被重新渲染。 -->
					<component :is="Component" :key="routerKey" />
				</transition>
			</router-view>
		</section>
		<AppFooter></AppFooter>
	</div>
</template>

<style>
/** vue过渡动画设置 */
.page-transform-enter-active {
	/* @see https://github.com/animate-css/animate.css */

	/* animation: 持续时间，animate动画效果名 */

	/* 淡入 */

	animation: 0.3s fadeIn;

	/* 放大 */

	/* animation: 0.3s zoomIn; */
}
.page-transform-leave-active {
	/* 淡出 */

	animation: 0.3s fadeOut;

	/* 缩小 */

	/* animation: 0.3s zoomOut; */
}
.page-transform-enter {
	opacity: 0;
}
.page-transform-leave-to {
	opacity: 0;
}
</style>
