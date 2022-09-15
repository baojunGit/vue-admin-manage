<template>
	<el-row class="query-form" :gutter="0">
		<slot />
	</el-row>
</template>

<!-- 这里之所以不在script内引入，是因为调用了math.div除法，只能在scss里面引入 -->
<style lang="scss">
@import './index.scss';
</style>
