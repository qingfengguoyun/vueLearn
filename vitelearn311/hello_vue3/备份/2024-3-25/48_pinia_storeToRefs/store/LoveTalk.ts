import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import axios from "axios";
interface talk{
    id:string,
    title:string
}

export const userLoveTalk = defineStore('loveTalk',{

    actions:{
    
        async addTalk(){
            let res= await axios.get('https://api.uomg.com/api/rand.qinghua?format=json');
            let obj={
                id:nanoid(),
                title:res.data.content
            }
            this.talkList.unshift(obj)
        }
    },


    state() {
        return{
            //as Array<talk> 用于约束数组类型
            talkList:[] as Array<talk>
        }
        
    },
})