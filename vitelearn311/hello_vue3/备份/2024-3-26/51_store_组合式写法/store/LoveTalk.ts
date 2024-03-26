import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import axios from "axios";
interface talk{
    id:string,
    title:string
}

// export const userLoveTalk = defineStore('loveTalk',{

//     actions:{
    
//         async addTalk(){
//             let res= await axios.get('https://api.uomg.com/api/rand.qinghua?format=json');
//             let obj={
//                 id:nanoid(),
//                 title:res.data.content
//             }
//             this.talkList.unshift(obj)
//         },

//         removeAll(){
//             localStorage.removeItem('talkList')
//             this.talkList=[] as Array<talk>
//             console.log("清空talkList")
//         }
//     },


//     state() {
//         return{
//             //as Array<talk> 用于约束数组类型
//             // as ：ts的断言语法
//             // talkList:[] as Array<talk>

//             //localStorage里的内容均为字符串，因此getItem后需使用as断言其为string
//             //同时添加 || [] as Array<talk> 保证本地浏览器没有数据时可初始化
//             talkList:JSON.parse(localStorage.getItem('talkList') as string) as Array<talk> || [] as Array<talk>
//         }
        
//     },
// })


import { reactive } from "vue";

// pinia store组合式写法，第二参数变为函数式，类似vue的setup函数
export const useLoveTalk = defineStore('loveTalk',()=>{

        //actions

        async function addTalk(){
            let res= await axios.get('https://api.uomg.com/api/rand.qinghua?format=json');
            let obj={
                id:nanoid(),
                title:res.data.content
            }
            talkList.unshift(obj)
        }

        function removeAll(){
            localStorage.removeItem('talkList')
            talkList=[] as Array<talk>
            console.log("清空talkList")
        }

        //state
        //注意：使用组合式写法时，定义的对象需手动包裹为reactive或ref对象 !!!
        //使用选项式时，useLoveTalk的state被自动封装为proxy对象，但使用组合式时需手动封装
        let talkList=reactive(JSON.parse(localStorage.getItem('talkList') as string) as Array<talk> || [] as Array<talk>)
        // let talkList=JSON.parse(localStorage.getItem('talkList') as string) as Array<talk> || [] as Array<talk>

        return { addTalk,removeAll,talkList}
})