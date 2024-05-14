import { defineStore } from 'pinia';


export let useSideBar=defineStore("sideBar",{

    actions:{
        showSideBar(){
            this.isDisplay=! this.isDisplay
            console.log("isDisplay",this.isDisplay)
        }
    },
    state(){
        return{
            isDisplay:true
        }
    },
    getters:{

    }
})
