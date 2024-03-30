import { defineStore } from "pinia";
import axios from "axios";
import { type UserInter} from "@/types/UserType"

export const useOnlineUser=defineStore("onlineStore",{
    

    actions:{

    },
    
    state(){
        return{
            user:JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {}
        }
    }
    
})