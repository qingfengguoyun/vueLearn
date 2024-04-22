import { defineStore } from "pinia";
import axios from "axios";
import { type UserInter} from "@/types/UserType"
import { type UserVo, type UnReadMessageCount }from "@/types"
import { requestPrefix } from "@/utils/commonUtils";
import { useSocket } from "@/utils/socketIo";
import { postRequest } from "@/utils/axiosUtils";
import type { ResultInter } from "@/types/ResultType";



// await axios.post( baseIP+":8200/api/user/login"||"http://localhost:8200/api/user/login",user);


// let socket=useSocket();

export const useOnlineUser=defineStore("onlineUser",{
    

    actions:{
        async getAllUserInfo(){
            // let res= await axios.post(requestPrefix+"/api/user/queryAllUserStatus"||"http://localhost:8200/api/user/queryAllUserStatus")
            let res= await postRequest<any>("/api/user/queryAllUserStatus",{})
            if(res.data.code===200){
                console.log("resdata:",res.data.data)
                this.userList=res.data.data
            }           
        },
        async getUnReadMessageCount(){
            let res=await postRequest<any>("/api/message/queryUnReadMessageCount",{});
            if(res.data.code===200){
                let array=res.data.data as UnReadMessageCount[]
                this.unReadMessageCount=array.reduce((map,obj)=>{
                    map.set(obj.id as string ,obj);
                    return map;
                },new Map<String,UnReadMessageCount>)
            }
        },

        checkUpdateToken(){

        }
    },
    
    state(){
        return{
            user:JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {},
            userList:[] as UserVo[],
            userToken:JSON.parse(sessionStorage.getItem("userToken") as string) as String || "",
            unReadMessageCount:new Map<String,UnReadMessageCount>()
        }
    }
    
})