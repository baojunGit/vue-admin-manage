<script setup lang="ts">
import { ref } from 'vue';
const visible = ref(false);
const title = ref('');
const desc = ref('');
const init = row => {
	title.value = row.name;
	desc.value = row.desc;
	visible.value = true;
};
defineExpose({
	init
});
</script>

<template>
	<el-dialog v-model="visible" :title="title">
		<div v-html="desc"></div>
	</el-dialog>
</template>

<style lang="scss"></style>
