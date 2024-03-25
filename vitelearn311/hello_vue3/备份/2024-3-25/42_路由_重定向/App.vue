<template>
  <div class="app"> 
    <h2 class="title">Vue路由测试</h2>
    <div class="navigate">

      <!-- <a href="/home">首页 </a>
      <a href="/news">新闻 </a>
      <a href="/about">关于 </a> -->

      <!-- RouterLink组件标签享受a标签的样式 -->
      <!-- replace属性表示使用该路由跳转后无法通过浏览器的‘后退’返回上一界面，默认不添加时为push模式 -->
      <RouterLink  to="/home" active-class="xiaozhupeiqi">首页</RouterLink>
      <RouterLink to="/news" active-class="xiaozhupeiqi">新闻</RouterLink>
      <!-- to的对象写法 -->
      <RouterLink  replace :to="{path:'/about'}" active-class="xiaozhupeiqi">关于</RouterLink>


    </div>

    <div class="main-content">

      <RouterView></RouterView>
    </div>


  </div>
</template>
<script lang="ts">
  export default
  {
    name:'App'
  }
</script>

<script lang="ts" setup>
  import { RouterView ,RouterLink} from 'vue-router';



 
</script>
<!-- scoped： 局部样式 -->
<style scoped>
    /* App */
    .title {
    text-align: center;
    word-spacing: 5px;
    margin: 30px 0;
    height: 70px;
    line-height: 70px;
    background-image: linear-gradient(45deg, gray, white);
    border-radius: 10px;
    box-shadow: 0 0 2px;
    font-size: 30px;
  }
  .navigate {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
  }
  .navigate a {
    display: block;
    text-align: center;
    width: 90px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 5px;
  }
  .navigate a.xiaozhupeiqi {
    background-color: #64967E;
    color: #ffc268;
    font-weight: 900;
    text-shadow: 0 0 1px black;
    font-family: 微软雅黑;
  }
  .main-content {
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    width: 90%;
    height: 400px;
    border: 1px solid;
  }
</style>