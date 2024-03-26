<template>
    <div class="talk">
        <button @click="getTalk">获取</button>
        <button @click="remove">移除所有</button>
        <ul >
            <li v-for="talk in talkStore.talkList" :key="talk.id">{{ talk.title }}</li>
        </ul>

    </div>

</template>
<script lang='ts'>
export default
{
    name:"LoveTalk"
}
</script>
<script lang='ts' setup>

    import { reactive,ref } from 'vue';
    import axios from 'axios';
    import {nanoid} from 'nanoid';
    import { useLoveTalk} from "@/store/LoveTalk";
    let talkStore=useLoveTalk()

    console.log("@@@@@@@@",talkStore)

    //$subscribe：pinia的订阅方法，类似watch
    //mutate：改变的内容，state，即store的state
    talkStore.$subscribe((mutate,state)=>{
        console.log("talkStore的数据发生了变化")
        //subscribe用法1：将store的talkList的内容存至浏览器本地
        //这样存储可保证关闭浏览器后，再次打开可保留数据
        localStorage.setItem('talkList',JSON.stringify(state.talkList))
    })
    
    async function getTalk(){
       console.log("qweqwe")
        talkStore.addTalk()
            
    }

    function remove(){
        talkStore.removeAll()
    }

</script>
<style scoped>
  .talk {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
  }
</style>