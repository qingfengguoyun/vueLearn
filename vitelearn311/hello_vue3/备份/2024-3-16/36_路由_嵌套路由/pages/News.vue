<template>
    <div class="news">
      <ul  >
        <li v-for="news in newsList" :key="news.id">
          <!-- 子节点需添加父节点的路由路径 -->
          <RouterLink to="/news/detail">{{ news.title }}</RouterLink>
        </li>
      </ul>
      <!-- 展示具体新闻内容的区域 -->
      <div class="news-content">
        <RouterView></RouterView>
      </div>
    </div>
    
    
  </template>
  
  <script setup lang="ts" name="News">
      import { newsIns } from '@/types/index';
      import { ref,reactive } from 'vue';
      import { RouterLink,RouterView } from 'vue-router';
      
      let newsList=reactive([
      new newsIns(0,'一种抗癌食物','苦瓜'),
      new newsIns(0,'原神启动','233'),
      new newsIns(0,'怪物猎人崛起','虾头太刀')
    ])
  </script>
  
  <style scoped>
  /* 新闻 */
/* 新闻 */
.news {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.news ul {
  margin-top: 30px;
  list-style: none;
  padding-left: 10px;
}
.news li>a {
  font-size: 18px;
  line-height: 40px;
  text-decoration: none;
  color: #64967E;
  text-shadow: 0 0 1px rgb(0, 84, 0);
}
.news-content {
  width: 70%;
  height: 90%;
  border: 1px solid;
  margin-top: 20px;
  border-radius: 10px;
}
  </style>