<template>
  <ul class="news-list">
    <li>编号:{{ params.id }}</li>
    <li>标题:{{ params.title}}</li>
    <li>内容:{{ params.content}}</li>
  </ul>
</template>
<script setup name="Detail">
// useRoute是一个hook
  import { toRefs,onUpdated } from 'vue';
  import { useRoute } from 'vue-router';
  let route=useRoute();
  //解构赋值，以便template中减少route的书写（响应式对象需使用toRef()方法）
  console.log("route:",route)
  let {query,params}=toRefs(route);
  
  onUpdated(()=>{
    console.log(query.value)
    console.log(params.value)
  })

</script>
<style scoped>
  .news-list {
    list-style: none;
    padding-left: 20px;
  }

  .news-list>li {
    line-height: 30px;
  }
</style>