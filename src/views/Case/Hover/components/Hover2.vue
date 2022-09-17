<script setup lang="ts">
const arr = [
	{
		id: 1,
		isNew: 0,
		title: '报工明细查询',
		desc: '报工清单数据，将电子看板报工和VP的报工进行融合',
		icon: 'iconfont icon-app'
	},
	{
		id: 2,
		isNew: 1,
		title: '不符合项查询',
		desc: 'QA审计发现的不符合项信息',
		icon: 'iconfont icon-app'
	},
	{
		id: 3,
		isNew: 1,
		title: '卡片查询',
		desc: '来自协同工作平台的卡片信息',
		icon: 'iconfont icon-app'
	}
];
</script>

<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>上下偏移（下划线跟随）</span>
			</div>
		</template>
		<div class="hover2">
			<div
				class="item"
				v-for="({ title, desc, icon }, index) in arr"
				:key="index"
			>
				<i :class="icon"></i>
				<h6>{{ title }}</h6>
				<p>{{ desc }}</p>
			</div>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
.hover2 {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	.item {
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 280px;
		height: 220px;
		padding: 20px;
		background: #f1f5f8;
		transition: $base-transition;

		// 这里用after伪元素，用before伪元素会跟阿里字体图标冲突
		::after {
			position: absolute;
			top: 0;
			left: 0;
			width: 0;
			height: 100%;
			content: '';
			border-bottom: 2px solid #409eff;
			transition: $base-transition;
		}
		i {
			font-size: 40px;
			color: #409eff;
		}
		h6 {
			margin: 18px 0;
			font-size: 16px;
		}
		p {
			color: #969699;
		}
		&:hover {
			box-shadow: 0 0 5px #cfcfcf;
			transform: translateY(-10px) scale(1.01);
			::after {
				width: 100%;
			}
		}
	}
}
</style>
