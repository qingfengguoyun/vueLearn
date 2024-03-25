<template>
    <div class="news">
      <ul  >
        <li v-for="news in newsList" :key="news.id">
          <button @click="showNewsDetail(news)">点击查看</button>
          <RouterLink :to="{
            name:'newsDetail',
            query:{
              id:news.id,
              title:news.title,
              content:news.content,
            },
          }" >
            {{ news.title }}
          </RouterLink>
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
      import { RouterLink,RouterView,useRouter } from 'vue-router';

      const router=useRouter()

      function showNewsDetail(news:newsIns){
        // router.push的内容和router-link的:to的对象写法相同
        // 另一个方法：router.replace，以replace方式跳转将无法使用浏览器的返回
        router.push({
          name:"newsDetail",
          query:{
            id:news.id,
            title:news.title,
            content:news.content
          }
        })
      }
      
      let newsList=reactive([
      new newsIns(0,'一种抗癌食物','苦瓜'),
      new newsIns(1,'原神启动','233'),
      new newsIns(2,'怪物猎人崛起','虾头太刀')
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
  /* list-style: none; */
  padding-left: 10px;
}
.news li::marker{
  color: #64967E;
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