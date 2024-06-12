
<template>
  <div class="app">
    <!-- <h2>AppPage</h2>
    <div>
      <RouterLink :to="{path:'/signUp'}">注册</RouterLink>
    </div> -->
    <!-- <loginPage/> -->
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
  import { useRouter,RouterView,RouterLink } from 'vue-router';
  let router=useRouter();
  console.log("import.meta.env====",import.meta.env)
  
</script>

<style scoped>

</style>
