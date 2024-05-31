import { defineStore } from "pinia";
import { type MessageVo } from "@/types";
import { getRequest, postRequest } from "@/utils/axiosUtils";
import { type ResultInter } from "@/types/ResultType";
import useSocketIo from "@/hooks/socketIo";


export let useMainChatRoom=defineStore("mainChatRoom",{

    actions:{
        async getMessageVo(){
            // let res=await axios.post(requestPrefix+"/api/message/getMessages");           
            let res=await getRequest("/api/message/queryLatestMessages",{num:8});
            let r=res.data as ResultInter
            console.log("res.data",r)
            if(r.code===200){
                this.messageVoList=r.data
            }
        },
        async getHistoryMessageVos(msgId?:string){
            if(!msgId){
                msgId=this.messageVoList[this.messageVoList.length-1].messageId;
            }
            let res=await getRequest("/api/message/queryHistoryMessagesByMsgId",{msgId:msgId});
            let r=res.data as ResultInter
            console.log("查询消息历史记录",r)
            if(r.code===200){
                this.showMessageNumLimit+=8;
                this.messageVoList.push(...r.data)
            }
        }
    },

    state() {
        return{
            messageVoList:[] as MessageVo[],
            showMessageNumLimit: 10
        }
    },
})

