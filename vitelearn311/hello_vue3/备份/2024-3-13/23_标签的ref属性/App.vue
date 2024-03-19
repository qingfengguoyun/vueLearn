<template>
  <div class="app"> 
    <h1 ref="ref1">hello world</h1>
    <!-- <p>ref属性添加在html标签上时，获取dom元素</p> -->
    <button @click="showRef">显示Ref1</button>
    <!-- <Person/> -->
    <!-- <p>ref属性添加在组件标签上时，获取组件，可访问内容通过defineExpose对外暴露</p> -->
    <Test ref="refTest"/>
    <button @click="showRefTest">显示RefTest</button>
    <!-- <button @click="show">显示tel</button> -->
  </div>
</template>
<script lang="ts">
  export default
  {
    name:'App'
  }
</script>

<script lang="ts" setup>
  import Person from './components/Person.vue';
  import Test from './components/Test.vue';
  import {ref } from 'vue';
  //见template中h1标签
  let ref1=ref();
  function showRef(){
    console.log(ref1.value);
  }
  //见template中的<Test> 组件
  let refTest=ref()
  function showRefTest(){
    console.log(refTest.value);
    console.log(refTest.value.testData2)
  }
</script>
<!-- scoped： 局部样式 -->
<style scoped>
  .app{
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
</style>