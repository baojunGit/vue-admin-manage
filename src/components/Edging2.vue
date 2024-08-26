<script setup lang="ts">
// 没用到props就不用声明const props = xxx
defineProps({
	// 边框宽度
	width: {
		type: String,
		require: true,
		default: () => '100%'
	},
	// 边框高度
	height: {
		type: String,
		require: true,
		default: () => '100%'
	},
	// 内边距
	padding: {
		type: String,
		require: true,
		default: () => '10px'
	}
});
</script>

<template>
	<div class="my-edging2" :style="{ width: width, height: height }">
		<div class="edging-wrap" :style="{ padding: padding }">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.my-edging2 {
	position: relative;
	background: rgb(0 235 255 / 8%);

	// 边框盒子
	.edging-wrap {
		position: absolute;
		z-index: 0;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 10px;

		// 旋转的主体元素
		&::before {
			position: absolute;
			top: -50%;
			left: -50%;
			z-index: -2;
			width: 200%;
			height: 200%;
			content: '';
			background-color: #1a232a;
			background-image: conic-gradient(
				transparent,
				rgb(0 205 162 / 100%),
				transparent 30%
			);
			background-repeat: no-repeat;
			background-position: 0 0;
			animation: rotate 4s linear infinite;
		}

		// 遮罩层的层级，留个边框
		&::after {
			position: absolute;
			top: 6px;
			left: 6px;
			z-index: -1;
			width: calc(100% - 12px);
			height: calc(100% - 12px);
			content: '';
			background: #000000;
			border-radius: 5px;
		}
	}
}
</style>
