<script setup lang="ts">
import { Hover1, Hover2, Hover3 } from './components';
</script>

<template>
	<div id="hover-container" :style="{ background: '#f2f3f5', padding: 0 }">
		<Hover1 />
		<Hover2 />
		<Hover3 />
	</div>
</template>
