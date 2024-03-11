<template>
  <div class="app"> 
    <h1>hello world</h1>
    <Person/>
    <button @click="show">显示tel</button>
  </div>
</template>

<script lang="ts">
  import Person from './components/Person.vue';
  let show=function(){
    alert(Person.tel); 
  };
  export default{
    name:'App', //组件名
    data(){
      Person
    },
    components:{
      Person
    },
    methods:{
      show
    }
  }
</script>
<style>
  .app{
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
  }
</style>