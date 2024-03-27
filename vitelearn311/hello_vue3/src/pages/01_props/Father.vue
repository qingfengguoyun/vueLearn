<template>
  <div class="father">
    <h3>父组件</h3>
	<p> 汽车：{{ car }}</p>
	<p v-if="toy!=''"> 从子接收的玩具：{{ toy }}</p>
	<!-- props方式传参，可传各种内容，包括对象，函数等 -->
	<!-- 注意命名，为了见名知义，父组件中的方法叫getToy，但传给子组件的props里该方法名称改叫"sendToy" -->
	<!-- **父传子传对象，子传父时适用函数（父给子一个函数，子调用该函数时将需要传递的对象放在函数的‘参数’里 -->
	<Child :car="car" :sendToy="getToy"></Child>
  </div>
</template>

<script setup lang="ts" name="Father">
	import Child from "../01_props/Child.vue";
	import {ref} from "vue"
	let car=ref("宝马")
	let toy=ref("")
	function getToy(value:string){
		console.log(getToy)
		toy.value=value
	}



</script>


<style scoped>
	.father{
		background-color:rgb(165, 164, 164);
		padding: 20px;
		border-radius: 10px;
	}
</style>