<template>


	<div class="container-fluid wraper">
		<h1 class="title">
			Vue3 组件间通信
		</h1>
		<hr>
		<div class="row">
			<div class="col-xs-3 col-md-3 col-lg-3 col-xl-3">
				<!-- 导航区 -->
				<router-link active-class="active" class="list-group-item" to="/props">1. props</router-link>
				<router-link active-class="active" class="list-group-item" to="/event">2. 自定义事件</router-link>
				<router-link active-class="active" class="list-group-item" to="/mitt">3. mitt</router-link>
				<router-link active-class="active" class="list-group-item" to="/model">4. v-model</router-link>
				<router-link active-class="active" class="list-group-item" to="/attrs">5. $attrs</router-link>
				<router-link active-class="active" class="list-group-item" to="/ref-parent">6. <span class="small">$refs、$parent</span></router-link>
				<router-link active-class="active" class="list-group-item" to="/provide-inject">7. provide、inject</router-link>
				<router-link active-class="active" class="list-group-item" to="/pinia">8. pinia</router-link>
				<router-link active-class="active" class="list-group-item" to="/slot">9. slot</router-link>
			</div>
			<div class="col-xs-9 col-md-9 col-lg-9 col-xl-9">
				<div class="panel-body">
					<!-- 占位一个展示区 -->
					<router-view></router-view>
				</div>
			</div>
		</div>
		<!-- <div> {{value}} </div>
		<button @click="add"> 添加value</button> -->
	</div>
</template>

<script setup lang="ts" name="App">

	// import { watch,reactive,ref, type Ref} from "vue";
	// let array:Ref<String[]> =ref([])
	// let value=ref("")
	// watch(()=>array.value,()=>{
	// 	console.log("@@@@@",array.value.length)
	// },{deep:true,immediate:true})
	// function add(){
	// 	array.value.push("instance");
	// 	console.log(array.value)
	// 	value.value=array.value.join(",")
	// }
</script>

<style>
	.wraper .title {
		padding: 20px;
		text-align: center;
		min-width: 610px;
	}
	.wraper .small{
		font-size: 15px;
	}
	.wraper .list-group-item {
		min-width: 230px;
	}
</style>