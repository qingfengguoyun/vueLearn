<template>
  <div class="app"> 
    <h1>hello world</h1>
    <login/>
  </div>
</template>

<script lang="ts" >

  export default
  {
    name:'App', //组件名
  }
</script>
<script lang="ts" setup>
  import login from '@/components/login.vue'
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