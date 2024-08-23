

<template>
  <Person></Person>
  <Test></Test>
  <Father></Father>

  <div>DATA:{{ dataRef.name }}</div>
  
 
</template>

<script setup lang="ts">
import Person from './components/Person.vue';
import Test from './components/Test.vue';
import Father from './components/Father.vue';
import data from './assets/data/data.json'
import { ref } from 'vue';

let dataRef=ref(data)

</script>

<style scoped>

</style>
