<template>
  <h1>{{ num }}</h1>


</template>

<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import TestBtn from './components/TestBtn.vue';
  import { ref } from 'vue';

  let obj = {
    a: 1, b: 2,
  }
  let num = ref(obj)
  let total = 0

  let id = setInterval(() => {
    if (total >= 2000) {
      clearInterval(id);
      return;
    }
    num.value.a += 1;
    console.log(num.value)
    total += 200
  }, 200)



</script>

<style scoped></style>
