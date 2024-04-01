<template>
  <div class="father">
    <h3>父组件</h3>
    <h4>{{ username }}</h4>
    <h4>{{ password }}</h4>
    <!-- v-model用在html标签上 -->
    <!-- <input type="text" v-model="username"> -->
    <!-- <input type="text" :value="username" @input="username = (<HTMLInputElement>$event.target).value"> -->
    
    <!-- 第8行为第七行的完整写法，即v-model的底层实现 -->
    <!-- @input：input事件 -->
    <!-- （<HTMLInputElement>$event.target）.value : $event表示事件本身，$event.target表示事件所属的组件，
      <HTMLInputElement>为类型断言，<HTMLInputElement>$event.target等价于$event.target as HTMLInputElement
        @input="username = (<HTMLInputElement>$event.target).value">整体作用为将该输入组件的value赋值给username对象，实现双向绑定中界面向后台传值的流程 -->

    <!-- v-model用在组件标签上 -->
    <!-- <AtguiguInput v-model="username"/> -->
    <!-- <AtguiguInput 
      :modelValue="username" 
      @update:modelValue="username = $event"
    /> -->

    <!-- 18行为17行的完整写法 -->
    <!-- $event何时.target,何时直接使用：当事件为dom原生事件（比如@imput）时，$event指代事件对象本身
    事件为自定义事件（@update:modelValue）时，$event表示触发事件时所传递的数据 -->

    <!-- 修改modelValue -->
    <AtguiguInput v-model:ming="username" v-model:mima="password"/>
  </div>
</template>

<script setup lang="ts" name="Father">
	import { ref } from "vue";
  import AtguiguInput from './AtguiguInput.vue'
  // 数据
  let username = ref('zhansgan')
  let password = ref('123456')
</script>

<style scoped>
.father {
  padding: 20px;
  background-color: rgb(165, 164, 164);
  border-radius: 10px;
}
</style>
