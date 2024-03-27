<template>
  <div class="child">
	<h2>子组件</h2>
	<p> 接收的car：{{ car }}</p>
	<p> 子的玩具：{{ toy }}</p>
	<button @click="sendToy(toy)">把玩具交给父</button>
  </div>
</template>

<script setup lang="ts" name="Child">
	import { ref,defineProps } from 'vue';
	defineProps(["car","sendToy"])
	let toy="埃吉尔1：7手办"
</script>

<style scoped>
	.child{
		background-color: skyblue;
		padding: 10px;
		box-shadow: 0 0 10px black;
		border-radius: 10px;
	}
</style>
