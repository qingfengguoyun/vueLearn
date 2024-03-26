<template>
    <div class="talk">
        <button @click="getTalk">获取</button>
        <ul >
            <li v-for="talk in loveTalk.talkList" :key="talk.id">{{ talk.title }}</li>
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
    import { userLoveTalk } from "@/store/LoveTalk";
    let loveTalk=userLoveTalk()
    
    async function getTalk(){
       
        loveTalk.addTalk()
            
    }
    // let talkList=reactive([
    //     {
    //         id:"1",
    //         title:"title"          
    //     },
    //     {
    //         id:"2",
    //         title:"title2"          
    //     },
    // ])

</script>
<style scoped>
  .talk {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
  }
</style>