<template>
	<div class="app">
		<h2>{{ msg }}</h2>
		<input type="text" v-model="msg">
	</div>
	<div class="app">
		<h2>{{ prf }}</h2>
		<input type="text" v-model="prf">
	</div>

	<div class="app">
		<h2>{{ privateRefMsg }}</h2>
		<input type="text" v-model="privateRefMsg">
	</div>

	<div class="app">
		priRefMsg
		<h2>{{ priRefMsg.privateRefMsg.value }}</h2>
		<input type="text" v-model="priRefMsg.privateRefMsg.value">
	</div>
</template>

<script setup lang="ts" name="App">
import { ref } from 'vue'
import useMsgRef from './useMsgRef'
import { usePrivateRef } from './usePrivateRef';


// 使用Vue提供的默认ref定义响应式数据，数据一变，页面就更新
// let msg = ref('你好')

// 使用useMsgRef来定义一个响应式数据且有延迟效果
let { msg } = useMsgRef('你好', 2000)

let priRefMsg=usePrivateRef("初始值priRefMsg",500);
let prf=usePrivateRef("初始值prf",500).privateRefMsg;
let {privateRefMsg} = usePrivateRef("初始值privateRefMsg",500);
console.log( priRefMsg.privateRefMsg)



</script>

<style scoped>
	.app {
		background-color: #ddd;
		border-radius: 10px;
		box-shadow: 0 0 10px;
		padding: 10px;
	}

	button {
		margin: 0 5px;
	}
</style>