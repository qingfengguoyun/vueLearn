import { defineStore } from "pinia";
interface talk{
    id:string,
    title:string
}

export const userLoveTalk = defineStore('loveTalk',{
    state() {
        return{
            //as Array<talk> 用于约束数组类型
            talkList:[] as Array<talk>
        }
        
    },
})