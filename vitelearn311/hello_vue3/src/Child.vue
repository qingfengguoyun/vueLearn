<template>
  <div class="child">

    <h2 ref="child"> Child Componenet </h2>
    <img :src="imgUrl" alt="Description of the image"> 
  </div>
</template>

<script setup lang="ts" name="Child">
  import {ref} from 'vue'
  import axios from 'axios';

  console.log("child Component setup")
  // Child组件的setup函数中添加异步方法（例如 await axios）
  // 模拟请求图片的方法
  let res=await axios.get("http://localhost:8200/api/file/getPreviewImage/1791350315523211266",{responseType:"blob"})
  console.log('res',res)
  console.log('文件名：',res.headers['content-disposition'])
  let blob=new Blob([res.data],{type:'image/png'})
  let imgUrl= window.URL.createObjectURL(blob);
  
</script>

<style scoped>
.child{
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px;
  background-color: white;
}
</style>