<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const breadcrumbList = ref([]);
// 判断是否首页
// const isIndex = (route): boolean | string => {
//   const name = route && (route.name as string)
//   if (!name) {
//     return false
//   }
//   // trim() 删除字符串的头尾空白符
//   // toLocaleLowerCase() 把字符串内容全部转为小写
//   return name.trim().toLocaleLowerCase() === 'index'
// }
// 获取生成面包屑的路由
const getBreadcrumb = (): void => {
	// 如果meta存在，则返回meta.title，否则返回meta
	// console.log(route.matched)
	breadcrumbList.value = route.matched.filter(
		item => item.meta?.title && item.meta.hideInBread !== true
	);
	// console.log(breadcrumbList.value)
};
getBreadcrumb();
watch(
	() => route.path,
	() => getBreadcrumb()
);
const handleLink = (item): any => {
	const { redirect, path } = item;
	if (redirect) {
		router.push(redirect.toString());
		return;
	}
	router.push(path);
};
</script>
<template>
	<el-breadcrumb class="breadcrumb" separator="/">
		<transition-group appear name="breadcrumb">
			<el-breadcrumb-item
				v-for="(item, index) in breadcrumbList"
				:key="item.path"
			>
				<span
					v-if="item.redirect || index == breadcrumbList.length - 1"
					class="no-redirect"
					>{{ item.meta.title }}</span
				>
				<a v-else @click="handleLink(item)">
					{{ item.meta.title }}
				</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>
