<script setup lang="ts">
import { PropType } from 'vue';

interface List {
	name: string;
	value: number;
	suffix: string;
}

defineProps({
	list: {
		type: Array as PropType<List[]>
	},
	url: {
		type: String
	}
});
</script>

<template>
	<div class="board2">
		<div class="option1">
			<div class="name">主办专题数</div>
			<div class="value">0<span class="suffix">个</span></div>
		</div>
		<div class="option2">
			<div class="desc">
				参与特性说明：开发组被加入到特性的实施组中，且特性已审批通过，则视为参与特性
			</div>
			<div class="option2-item1">
				<div class="name">参与特性数<span class="suffix">20</span>个</div>
				<div class="value"></div>
			</div>
			<div class="option2-item2">
				<div class="name">其中<span>待立项</span></div>
				<div class="value">6<span class="suffix">个</span></div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.board2 {
	.option1 {
		/* 边框细线 */
		// border-style: solid;

		/* 边框点画线 */
		// border-style: dotted;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		height: 50px;
		padding: 10px;
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: 700;
		border-color: #c0c0c0;

		/* 边框虚线 */
		border-style: dashed;
		border-width: 2px;
		.name {
			display: flex;
			align-items: center;
		}
		.value {
			margin-left: 60px;
			font-size: 28px;
			color: $base-color-blue;
			span {
				font-size: 16px;
				color: $base-color-black;
			}
		}
	}
	.option2 {
		box-sizing: border-box;
		height: 140px;
		padding: 10px;
		border-color: #c0c0c0;
		border-style: dashed;
		border-width: 2px;
	}
}
</style>
