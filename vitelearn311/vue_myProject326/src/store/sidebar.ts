import { defineStore } from 'pinia';


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
            isDisplay:JSON.parse(sessionStorage.getItem("sideBarDisplay") as string || 'true')
            
        }
    },
    getters:{

    }
})
