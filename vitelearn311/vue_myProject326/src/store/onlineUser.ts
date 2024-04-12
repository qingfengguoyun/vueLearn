import { defineStore } from "pinia";
import axios from "axios";
import { type UserInter} from "@/types/UserType"
import { type UserVo }from "@/types"
import { requestPrefix } from "@/utils/commonUtils";



// await axios.post( baseIP+":8200/api/user/login"||"http://localhost:8200/api/user/login",user);


export const useOnlineUser=defineStore("onlineUser",{
    

    actions:{
        async getAllUserInfo(){
            let res= await axios.post(requestPrefix+"api/user/queryAllUserStatus"||"http://localhost:8200/api/user/queryAllUserStatus")
            if(res.data.code===200){
                console.log("resdata:",res.data.data)
                this.userList=res.data.data
            }
            
        },
    },
    
    state(){
        return{
            user:JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {},
            userList:[] as UserVo[]
        }
    }
    
})