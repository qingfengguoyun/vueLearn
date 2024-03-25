<template>
    <div class="talk">
        <button @click="getTalk">获取</button>
        <ul >
            <li v-for="talk in talkList" :key="talk.id">{{ talk.title }}</li>
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
    
    async function getTalk(){
        let res= await axios.get('https://api.uomg.com/api/rand.qinghua?format=json');
        let obj={
            id:nanoid(),
            title:res.data.content
        }
        talkList.unshift(obj)
        console.log(obj)
        
    }
    let talkList=reactive([
        {
            id:"1",
            title:"title"          
        },
        {
            id:"2",
            title:"title2"          
        },
    ])

</script>
<style scoped>
  .talk {
    background-color: orange;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
  }
</style>