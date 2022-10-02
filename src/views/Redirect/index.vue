<script setup lang="ts">
import { unref } from 'vue';
import { useRouter } from 'vue-router';

const { currentRoute, replace } = useRouter();

const { params, query } = unref(currentRoute);
const { path } = params;

console.log(path);
const _path = Array.isArray(path) ? path.join('/') : path;
console.log(_path);

replace({
	path: '/' + _path,
	query
});
</script>

<template>
	<div />
</template>
