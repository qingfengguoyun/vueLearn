<template>
  <div class="app">
    
    <h2> App Component</h2>
    <Suspense>
      <!-- Suspense用于处理异步组件（setup中有await，以及真正的异步组件
        包含两个插槽，default fallback。优先渲染default插槽，当遇到异步方法时挂起，并渲染fallback，
        待异步方法完成后重新替换为default插槽
      -->
      <template v-slot:default>
        <Child></Child>
      </template>
      <template v-slot:fallback>
        <h2>加载中</h2>
      </template>
    </Suspense>
    
  </div>
</template>

<script setup lang="ts" name="App">
  import Child from "./Child.vue";
</script>

<style scoped>
.app{
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px;
  background-color: skyblue
}
</style>