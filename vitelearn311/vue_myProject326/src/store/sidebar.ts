import { defineStore } from 'pinia';
import type { ComponentsMap } from '@/types';



let componentConfig:ComponentsMap={
    'mainChatRoom':{
        fullName:'公共聊天室',
        shortName:'聊天',
        isAdmin:false
    },
    'fileUpload':{
        fullName:'文件上传',
        shortName:'上传',
        isAdmin:false
    },
    'fileDownload':{
        fullName:'文件下载',
        shortName:'下载',
        isAdmin:false
    },
    'gallary':{
        fullName:'画廊',
        shortName:'画廊',
        isAdmin:false
    },
    'userInfo':{
        fullName:'个人信息',
        shortName:'个人',
        isAdmin:false
    },
    'adminInfo':{
        fullName:'综合记录',
        shortName:'综合',
        isAdmin:true
    }
}

export let useSideBar=defineStore("sideBar",{

    actions:{
        showSideBar(){
            this.isDisplay=! this.isDisplay
            sessionStorage.setItem("sideBarDisplay",JSON.stringify(this.isDisplay))
            console.log("isDisplay",this.isDisplay)
            
        }
    },
    state(){
        return{
            isDisplay:JSON.parse(sessionStorage.getItem("sideBarDisplay") as string || 'true'),
            componentConfig:componentConfig
        }
    },
    getters:{

    }
})
