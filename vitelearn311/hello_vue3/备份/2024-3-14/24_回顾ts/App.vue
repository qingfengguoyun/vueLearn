<template>
  <div class="app"> 

    <Person/>


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
  let ref1=ref();
  function showRef(){
    console.log(ref1.value);
  }
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