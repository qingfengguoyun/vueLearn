import { defineStore } from "pinia";
import type { ComponentsMap } from "@/types";
import MainChatRoom from "@/components/MainChatRoom.vue";
import PrivateChatRoom from "@/components/PrivateChatRoom.vue";
import Gallary from "@/components/FileDownload.vue";
import UserInfo from "@/components/UserInfo.vue";
import type {User} from "@/types"


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
        },
        toFileDownload(){
            console.log("toFileDownload")
            sessionStorage.setItem("mainCom","fileDownload");
            this.mainCom="fileDownload";
        },
        toFileUpload(){
            console.log("toFileUpload")
            sessionStorage.setItem("mainCom","fileUpload");
            this.mainCom="fileUpload";
        },
        toUserInfo(){
            console.log("toUserInfo")
            sessionStorage.setItem("mainCom","userInfo");
            this.mainCom="userInfo";
        },
        toUserInfoChange(){
            console.log("toUserInfoChang")
            sessionStorage.setItem("mainCom","userInfoChange");
            this.mainCom="userInfoChange";
        },
        toSelectComponent(comName:string){
            console.log(comName);
            sessionStorage.setItem("mainCom",comName);
            this.mainCom=comName;
        },

    },
    state(){
        return{
            // 标识FrontPage界面mainContent区域显示哪个组件
            // 界面刷新将导致pinia也被重置，因此若想保留组件的显示状态，只能存在sessionStorage中
            mainCom:sessionStorage.getItem('mainCom') as string==null? "mainChatRoom" as String :sessionStorage.getItem('mainCom') as string,
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
        },
    }
})