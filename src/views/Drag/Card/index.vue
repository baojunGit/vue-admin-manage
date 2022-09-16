<script setup lang="ts">
import { reactive } from 'vue';
import { getIndexList } from '@/api/card';

const state = reactive({
	activeValue: 2,
	tabList: [
		{
			id: 1,
			name: '研发中心'
		},
		{
			id: 2,
			name: '自定义面板'
		}
	],
	data: [],
	dragOptions: {
		animation: 600,
		group: 'description',
		disabled: false,
		ghostClass: 'ghost-item', // 占位元素的类名
		scroll: true, // 开启自动滚动
		// forceAutoscrollFallback: false, // 即使本机浏览器自动滚动可用，也强制启用自动滚动插件
		// px，鼠标必须离边缘多近才能开始滚动
		// 只有满足如下任意一项，才会调用它：1.forceFallback: true  2.它是一个移动设备  3.浏览器是 Safari、Internet Explorer 或 Edge
		scrollSensitivity: 180,
		scrollSpeed: 20, // px，鼠标滚动速度
		bubbleScroll: true, // 将自动滚动应用于所有父元素，以便更轻松地移动
		// 默认为false, 设置为true时，将不使用原生的html5的拖放，可以修改一些拖放中元素的样式, h5拖拽是方便，但是呢，拖拽的影子改不了透明度是硬伤
		forceFallback: true,
		fallbackClass: 'drag-item' // 为true时，拖放过程中克隆DOM元素的类名。
		// fallbackOnBody: true
		// fallbackTolerance: 10 // 以像素为单位指定鼠标在被视为拖动以前应移动多远
		// swapThreshold: 0.65 // 交换区域将占据的目标百分比，介于0和之间1
	}
});

const fetchData = async () => {
	const { data } = await getIndexList();
	state.data = data;
	console.log(data);
};

fetchData();
</script>

<template>
	<div id="card-drag-container">
		<QueryForm>
			<QueryFormTopPanel>
				<el-alert
					title="默认展示近一年数据，可以通过拖拽排序设置指标展示格局"
					type="info"
					show-icon
					:closable="false"
				/>
			</QueryFormTopPanel>
		</QueryForm>
		<div class="main">
			<!-- 属性 v-model="List"这个List为一个数组，一般与实际数据对应。排序、拖拽实际上都是改变这个List的值或顺序。 -->
			<!-- v-bind属性绑定配置项 -->
			<!-- 属性 item-key="key" 这个key为每个可拖拽组件的key，要求List数组中的每个数据项中有一个key作为子组件的唯一标识。 -->
			<!-- 属性 group 分组，如果要在不同容器间实现拖拽，那么它们的组名应该相等 -->
			<!-- 属性 tag 渲染后的<draggable>，例如tag =‘span’，那么<draggable>就会变为<span></span> -->
			<!-- ghost-class 拖动单元的影子副本类名 -->
			<!-- :move="dragMoved" 自定义控制那些元素可以拖拽或不允许拖拽并控制是否允许停靠-->
		</div>
	</div>
</template>

<style lang="scss" scoped>
#card-drag-container {
	.main {
		display: flex;
		flex-wrap: wrap;
		row-gap: 24px; // 行间距设置
		column-gap: 20px; // 列间距设置
		.item-card {
			box-sizing: border-box;
			width: 385px;
			height: 278px;
			cursor: move;
			user-select: none; // 防止选取元素的文本
			border: 1px solid #cfcfcf; // 要有边框拖拽元素才明显
			box-shadow: 0 0 14px #cfcfcf;
			.item-card-wrap {
				height: 100%;

				// transition: all ease-in-out 0.5s;
				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					height: 32px;
					.title-left {
						display: flex;
						align-items: center;
						margin-left: 4px;
						.text {
							padding-left: 12px;
							font-size: 16px;
							border-left: 3px solid #409eff;
						}
					}
					.title-right {
						display: flex;
						align-items: center;
						margin-right: 12px;
						.label {
							padding: 2px 4px;
							font-size: 12px;
							color: #d68189;
							border: 1px solid #d68189;
						}
						.menu-button {
							display: flex;
							flex-flow: column;
							flex-wrap: wrap;
							align-items: center;
							justify-content: center;
							padding: 2px 6px;
							margin-left: 4px;
							cursor: pointer;
							&:hover {
								background-color: #eff5f9;
							}

							// &:active {
							//   background-color: #409eff;
							// }
							span {
								width: 4px;
								height: 4px;
								margin: 2px 0;
								background-color: #c8c8c8;
								border-radius: 50%;
							}
							span:first-of-type {
								padding-top: 0;
							}
						}
					}
				}
				.content {
					position: relative;
					box-sizing: border-box;
					height: calc(100% - 32px - 2px);
					padding: 20px;
					.have-data {
						position: relative;
						width: 100%;
						height: 100%;
						.board1 {
							position: absolute;
							top: 50%;
							left: 50%;
							font-size: 40px;
							font-weight: 700;
							color: #409eff;
							cursor: pointer;
							transform: translate(-50%, -50%);
						}
					}
					.no-data {
						position: absolute;
						top: 50%;
						left: 50%;
						font-size: 34px;
						font-weight: 700;
						color: #7f7f80;
						transform: translate(-50%, -50%);
					}
				}
			}
		}
		.ghost-item {
			background-color: #dcebf4;
			opacity: 0.5;
		}
		.drag-item {
			background-color: #f5f5f5;
			border: 1px solid #cfcfcf;
		}
	}
}
</style>
<style lang="scss">
.tab-set2,
.menu-set {
	min-width: auto !important;
	padding: 5px 0 !important;
	.menu {
		.menu-item {
			padding: 5px 12px;
			cursor: pointer;
			transition: all 0.3s;
			&:hover {
				color: (0, 0, 0, 0.65);
				background-color: #f5f5f5;
			}
		}
	}
}
</style>
