import { defineStore } from "pinia";

export let useCommonStore=defineStore('commonStore',{

    actions:{
        toPrivateChatRoom(){
            console.log("toPrivateChatRoom")
            sessionStorage.setItem('chatCom',"privateChatRoom");
            this.chatCom="privateChatRoom";
        },
        toMainChatRoom(){
            console.log("toMainChatRoom")
            sessionStorage.setItem('chatCom',"mainChatRoom");
            this.chatCom="mainChatRoom";
        }
    },
    state(){
        return{
            // 标识FrontPage界面mainContent区域显示哪个组件
            // 界面刷新将导致pinia也被重置，因此若想保留组件的显示状态，只能存在sessionStorage中
            chatCom:sessionStorage.getItem('chatCom') as string==null? "mainChatRoom" as String :sessionStorage.getItem('chatCom') as string
        }
    }
})