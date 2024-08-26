<script setup lang="ts">
const arr = [
	{
		id: 1,
		isNew: 0,
		title: '首次实施天数',
		desc: '该接口按用户所在组织结构控制权限，返回所在组织结构的主办项目的首次实施天数信息。',
		icon: 'iconfont icon-app'
	},
	{
		id: 2,
		isNew: 1,
		title: '项目基本信息',
		desc: '来自VP的项目基础信息',
		icon: 'iconfont icon-app'
	}
];

// 在JavaScript中，通过document.getElementById(id).style.XXX可以获取到XXX的值，
// 但意外的是这样做只能获取到行内样式,获取不了外部的样式，可以用getComputedStyle
const toggleShow = e => {
	const target = e.currentTarget?.children[0]?.children[2];
	const attr = getComputedStyle(target, null)?.visibility;
	if (attr === 'hidden') {
		target.style.visibility = 'visible';
		return;
	}
	target.style.visibility = 'hidden';
};
</script>

<template>
	<el-card>
		<template #header>
			<div class="card-header">
				<span>显示隐藏</span>
			</div>
		</template>
		<div class="hover1">
			<div
				class="item"
				v-for="({ title, desc, icon }, index) in arr"
				:key="index"
				@mouseenter="e => toggleShow(e)"
				@mouseleave="e => toggleShow(e)"
			>
				<div class="item-left">
					<p class="title">{{ title }}</p>
					<p class="desc">{{ desc }}</p>
					<div class="sop">
						<span class="field-desc">字段说明</span>
						<span class="fetch-api">获取接口</span>
					</div>
				</div>
				<div class="item-right">
					<i :class="`${icon} right-icon`"></i>
				</div>
			</div>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
.hover1 {
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	.item {
		box-sizing: border-box;
		display: flex;
		width: 420px;
		height: 180px;
		padding: 20px;
		border: 1px solid #e2e9f0;
		transition: $base-transition;
		.item-left {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			.desc {
				height: 60px;
			}
			.sop {
				visibility: hidden;
				.field-desc {
					margin-right: 20px;
				}
				&.hide {
					visibility: hidden !important;
				}
			}
		}
		.item-right {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 80px;
			.right-icon {
				font-size: 50px;
				color: #409eff;
			}
		}
		&:hover {
			background: #d7effb;
			box-shadow: 0 0 20px rgb(0 0 0 / 30%);
		}
	}
}
</style>
