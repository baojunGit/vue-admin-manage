<script setup lang="ts">
const arr = [
	{
		id: 1,
		title: '2022第一季度报告'
	},
	{
		id: 2,
		title: '2022第二季度报告'
	},
	{
		id: 3,
		title: '2022上半年报告'
	}
];
</script>

<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>3D翻转效果</span>
			</div>
		</template>
		<div class="hover3">
			<div class="item" v-for="({ title }, index) in arr" :key="index">
				<div class="flip-box">
					<div class="front">{{ title }}</div>
					<div class="back">点击查看</div>
				</div>
			</div>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
// 在最外层的容器元素上设置整个动画区域的 perspective 属性以实现3D效果
// 他们的背面可视性 backface-visibility 属性设置为隐藏，这样每个卡片的背面在翻转时都是看不见的
.hover3 {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	.item {
		box-sizing: border-box;
		width: 200px;
		height: 60px;
		cursor: pointer;

		// 设置3D舞台效果
		perspective: 500px;

		// 翻转盒子
		.flip-box {
			width: 100%;
			height: 100%;

			// 规定了后代元素是以3d模式进行变换
			transform-style: preserve-3d;
			transition: transform 1s;
			div {
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
				backface-visibility: hidden;
			}
			.front {
				background: #ffffff;
				border: 1px solid #e2e9f0;
			}
			.back {
				background: #d7effb;
				transition: transform 1s;
				transform: rotateX(180deg);
			}
			&:hover {
				transform: rotateX(180deg);
			}
		}
	}
}
</style>
