
import {defineStore} from 'pinia'
import { type UserInter } from '@/types/UserType'
import type { UserVo,MessageVo } from '@/types'
import { postRequest,getRequest } from '@/utils/axiosUtils'
import type { ResultInter } from '@/types/ResultType'
import { watch } from 'vue'



export let usePrivateChatRoom=defineStore("usePrivateChatRoom",{
    
    actions:{

        setConnectUser(param:UserVo){
            this.connectUser.id=param.userId;
            this.connectUser.userName=param.userName;
        },
        async getMessageVoList(param:any){
            console.log("getMessageVoList")
            let res=await getRequest<ResultInter>("/api/message/getPrivateMessage",param);
            console.log(res.data)
            if(res.data.code==200){
                this.messageVoList=res.data.data
            }
        },
        async sendPrivateMessage(param:any){
            let res=await postRequest<ResultInter>("/api/message/sendPrivateMessage",param);
            if(res.data.code==200){
                console.log("receive message",res.data.data)
                let mes:MessageVo=res.data.data as MessageVo
                this.messageVoList.unshift(mes);       
            }
        },
        initPrivateChatRoom(){

        }
        
    },
    state() {
        return{
           connectUser:{} as UserInter,
           messageVoList:[] as MessageVo[]
        }
    },
    
})
