
import {defineStore} from 'pinia'
import { type UserInter } from '@/types/UserType'
import type { UserVo,MessageVo } from '@/types'
import { postRequest,getRequest } from '@/utils/axiosUtils'
import type { ResultInter } from '@/types/ResultType'
import { watch } from 'vue'




export let usePrivateChatRoom=defineStore("usePrivateChatRoom",{
    
    actions:{

        setConnectUser(param:UserVo){
            console.log("param",param)
            this.connectUser.id=param.userId;
            this.connectUser.userName=param.userName;
            // 将connectUser存入sessionStorage中
            sessionStorage.setItem('connectUser',JSON.stringify(param))
        },
        async getMessageVoList(param:any):Promise<MessageVo[]>{
            console.log("getMessageVoList param",param)
            let res=await getRequest<ResultInter>("/api/message/getPrivateMessage",param);
            console.log("getMessageVoList",res.data)
            if(res.data.code==200){
                this.messageVoList=res.data.data
                return res.data.data
            }
            return [];
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

        },
        async getHistoryMessageVoList(msgId?:string,sendUserId?:string,receiveUserId?:string){
            let userIds=[]
            userIds.push(sendUserId?sendUserId:this.messageVoList[this.messageVoList.length-1].sendUser.id)
            userIds.push(receiveUserId?receiveUserId:this.messageVoList[this.messageVoList.length-1].receiveUser!.id )
            let param={
                msgId:msgId? msgId : this.messageVoList[this.messageVoList.length-1].messageId,
                userIds:userIds
            }
            let res=await postRequest<ResultInter>("/api/message/queryHistoryPrivateMessagesByMsgIdAndUserIds",param);
            if(res.data.code==200){
                console.log("历史消息：",res.data.data)
                this.showMessageNumLimit+=(res.data.data as []).length
                this.messageVoList.push(...res.data.data)                    
            }
        }

        
    },
    state() {
        return{
           connectUser:JSON.parse(sessionStorage.getItem('connectUser') as string) as UserInter || {} as UserInter,
           showMessageNumLimit: 10,
           messageVoList:[] as MessageVo[]
        }
    },
    
})
