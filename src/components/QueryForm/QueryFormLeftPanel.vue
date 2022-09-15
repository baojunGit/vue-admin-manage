<script setup lang="ts">
import { toRefs } from 'vue';
const props = defineProps({
	span: {
		type: Number,
		default: () => 14
	}
});
const { span } = toRefs(props);
</script>

<template>
	<!-- xl（超大） 超大桌面显示器 - 屏幕宽度等于或大于 1200px)
  lg（大） 大桌面显示器 - 屏幕宽度等于或大于 992px)
  md（中等的） 桌面显示器 - 屏幕宽度等于或大于 768px)
  sm（小） 平板 - 屏幕宽度等于或大于 576px
  xs（超小）手机移动设备 - 屏幕宽度小于 576px -->
	<el-col :xl="span" :lg="span" :md="24" :sm="24" :xs="24">
		<div class="left-panel">
			<slot />
		</div>
	</el-col>
</template>
