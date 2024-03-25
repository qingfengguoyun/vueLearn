<template>
  <ul class="news-list">
    <li>编号:{{ id }}</li>
    <li>标题:{{ title}}</li>
    <li>内容:{{ content}}</li>
  </ul>
</template>
<script setup name="Detail">
// useRoute是一个hook
  import { toRefs,onUpdated,defineProps } from 'vue';
  import { useRoute } from 'vue-router';
  // let route=useRoute();
  //通过defineProps获得路由传来的参数
  let x=defineProps(["id","title","content"])
  console.log("x",x)
  // console.log(id)
  
  onUpdated(()=>{
    // console.log(query.value)
    // console.log(params.value)
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