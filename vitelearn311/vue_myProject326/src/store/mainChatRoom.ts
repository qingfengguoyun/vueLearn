import { defineStore } from "pinia";
import { type MessageVo } from "@/types";
import { getRequest, postRequest } from "@/utils/axiosUtils";
import { type ResultInter } from "@/types/ResultType";


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
        }
    },

    state() {
        return{
            messageVoList:[] as MessageVo[]
        }
    },
})

