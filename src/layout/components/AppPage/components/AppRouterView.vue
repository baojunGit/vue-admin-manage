<template>
	<router-view v-slot="{ Component }">
		<!-- 使用内置的 <transition> 组件来钩住组件进入和离开 DOM -->
		<!-- transition 页面切换的时候有一个缓冲效果 -->
		<!-- 只有在加上appear才可以在页面第一次加载的时候就执行过渡动画 -->
		<transition appear name="fade-transform" mode="out-in">
			<!-- 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染。 -->
			<component :is="Component" :key="routerKey" />
		</transition>
	</router-view>
</template>

<script setup lang="ts">
import {
	ref,
	watchEffect
	// getCurrentInstance,
	// nextTick,
	// onBeforeMount,
	// onUnmounted
} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// const { proxy }: any = getCurrentInstance();
const routerKey = ref();
watchEffect(() => {
	routerKey.value = route.path;
});
// onBeforeMount(() => {
// 	/**
// 	 * @description routerKey 利用 key 值的变化触发组件更新
// 	 * vue 的虚拟 DOM 算法在比对 Vnode时会用到 key 作为唯一标识，key 值变了该元素就会被重新渲染。
// 	 */
// 	proxy.$sub('reload-router-view', () => {
// 		const cacheActivePath = routerKey.value;
// 		routerKey.value = null;
// 		nextTick(() => {
// 			routerKey.value = cacheActivePath;
// 		});
// 	});
// });
// onUnmounted(() => {
// 	proxy.$unsub('reload-router-view');
// });
</script>
