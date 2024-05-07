import { defineStore } from "pinia";
import type { ComponentsMap } from "@/types";
import mainChatRoom from "@/components/mainChatRoom.vue";
import privateChatRoom from "@/components/privateChatRoom.vue";
import gallary from "@/components/gallary.vue";


export let useCommonStore=defineStore('commonStore',{

    actions:{
        toPrivateChatRoom(){
            console.log("toPrivateChatRoom")
            sessionStorage.setItem('mainCom',"privateChatRoom");
            this.mainCom="privateChatRoom";
        },
        toMainChatRoom(){
            console.log("toMainChatRoom")
            sessionStorage.setItem('mainCom',"mainChatRoom");
            this.mainCom="mainChatRoom";
        },
        toGallary(){
            console.log("toGallary")
            sessionStorage.setItem("mainCom","gallary");
            this.mainCom="gallary";
        }

    },
    state(){
        return{
            // 标识FrontPage界面mainContent区域显示哪个组件
            // 界面刷新将导致pinia也被重置，因此若想保留组件的显示状态，只能存在sessionStorage中
            mainCom:sessionStorage.getItem('mainCom') as string==null? "mainChatRoom" as String :sessionStorage.getItem('mainCom') as string,
            needOnlineUserCom: true,
        }
    },
    getters:{
        showOnlineUser():Boolean{
            if(this.mainCom!="mainChatRoom" && this.mainCom!="privateChatRoom"){
                return false;
            }
            else{
                return true;
            }
        }
    }
})