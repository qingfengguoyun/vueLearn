import { defineStore } from "pinia";
import { type MessageVo } from "@/types";
import { requestPrefix } from "@/utils/commonUtils";
import axios from "axios";
import { getRequest, postRequest } from "@/utils/axiosUtils";
import { type ResultInter } from "@/types/ResultType";


export let useMainChatRoom=defineStore("mainChatRoom",{

    actions:{
        async getMessageVo(){
            console.log("resfsdfasaasdgafgasdf")
            // let res=await axios.post(requestPrefix+"/api/message/getMessages");
            
            let res=await getRequest("/api/message/queryLatestMessages",{num:5});
            console.log("res",res)
            let r=res.data as ResultInter
            console.log("eqweqweqw",r)
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

