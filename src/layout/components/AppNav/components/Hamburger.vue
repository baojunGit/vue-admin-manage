<script setup lang="ts">
import { useMenuStore } from '@/store/modules/menu';
import { storeToRefs } from 'pinia';

const menuStore = useMenuStore();

const { collapse } = storeToRefs(menuStore);

const { toggleCollapse } = menuStore;
</script>

<template>
	<div class="hamburger" @click="toggleCollapse">
		<!-- vue绑定多个Class名高阶用法： 用 数组形式 绑定多个 Class名 结合 用json 形式 绑定多个Class名 
          注意： json形式的属性名，单个单词或者驼峰命名的单词不加引号，用-连接的属性名要加引号才不会报错
    -->
		<svg
			:class="['hamburger-icon', { 'is-active': !collapse }]"
			viewBox="0 0 1024 1024"
			xmlns="http://www.w3.org/2000/svg"
			width="64"
			height="64"
		>
			<path
				d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
			/>
		</svg>
	</div>
</template>
