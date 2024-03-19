<template>
    <div class="home">
      <img :src="getIco()" alt="">
    </div>
  </template>
  
  <script setup lang="ts" name="Home">

    function getIco(){
      return new URL('../../public/favicon.ico', import.meta.url).href
    }
  </script>
  
  <style scoped>
    .home {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  </style>