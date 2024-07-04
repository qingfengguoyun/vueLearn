<template>

<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
  <div class="grid-item">Item 4</div>
  <div class="grid-item">Item 5</div>
  <div class="grid-item">Item 6</div>
  <!-- 你可以添加更多的 grid-item 来测试效果 -->
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
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px; /* 设置网格项之间的间距 */
  }

  .grid-item {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 20px;
    box-sizing: border-box;
  }

  .grid-item:nth-child(even) {
    height: 300px; /* 偶数项设置为较高 */
  }

  .grid-item:nth-child(odd) {
    height: 150px; /* 奇数项设置为较低 */
  }
</style>