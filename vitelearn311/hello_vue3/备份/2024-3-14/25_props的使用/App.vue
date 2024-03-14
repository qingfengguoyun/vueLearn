<template>
  <div class="app"> 

    <Person :list="personList"/>
    <Person />


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
  import {reactive} from 'vue'
  import {type Persons,type MyPersons, MyPerson} from '@/components/types/index'

  let personList:MyPersons=reactive<MyPersons>([
    new MyPerson("1"),
    new MyPerson("2","lisi",18),
    new MyPerson("3"),
  ])

 
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