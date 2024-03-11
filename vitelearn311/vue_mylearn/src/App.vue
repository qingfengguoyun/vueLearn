<template>
  <div class="app"> 
    <h1>hello world</h1>
    <Person/>
    <Card/>
  </div>
</template>

<script lang="ts">
import Person from './components/Person.vue';
import Card from './components/Card.vue';
  export default{
    name:'App', //组件名
    components:{
      Person,
      Card
    }//注册主键

  }
</script>
<style>
  .app{
    background-color: #ddd;
    box-shadow: 0 0 10px;
    /* border-radius: 10px; */
    padding: 20px;
    width: 100%;
    height: 100%;
  }
</style>