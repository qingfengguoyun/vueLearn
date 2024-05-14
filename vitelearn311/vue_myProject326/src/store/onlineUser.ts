import { defineStore } from "pinia";
import axios from "axios";
import { type UserInter} from "@/types/UserType"
import type {  UserVo, UnReadMessageCount,  User }from "@/types"
import { requestPrefix,imageRequestPrefix } from "@/utils/commonUtils";
import useSocketIo from "@/hooks/socketIo";
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
                //使用reduce方法将数组对象转化为map，第二个参数为map对象的初始化，用于指定key和value的类型
                // reduce方法((newIns,arrayObj)=>{（逻辑块） return newIns}), newIns初始化对象）
                // 表示对每一个数组对象执行逻辑块后，转变为一个newIns对象
                this.unReadMessageCount=array.reduce((map,obj)=>{
                    map.set(obj.id as string ,obj);
                    return map;
                },new Map<String,UnReadMessageCount>)
            }
        },
        clearUnReadMessage(connectUserId:String){
            if(this.unReadMessageCount.has(connectUserId)){
                this.unReadMessageCount.delete(connectUserId)
            }
        },
        getUserImageUrl():String{
            if(!this.user.userImageId){
                if(this.user.userDefaultImage){
                    return ('img/'+this.user.userDefaultImage) as String;
                }else{
                    return 'img/a1.jpg'
                }
                
            }else{
                return requestPrefix+"/api/file/getImage/"+this.user.userImageId
            }
        },

        checkUpdateToken(){

        }
    },
    
    state(){
        return{
            user:JSON.parse(sessionStorage.getItem("userInfo") as string) as User || {},
            userList:[] as UserVo[],
            userToken:JSON.parse(sessionStorage.getItem("userToken") as string) as String || "",
            unReadMessageCount:new Map<String,UnReadMessageCount>()
        }
    }
    
})