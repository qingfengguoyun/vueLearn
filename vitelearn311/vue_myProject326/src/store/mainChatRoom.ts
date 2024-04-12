import { defineStore } from "pinia";
import { type MessageVo } from "@/types";
import { requestPrefix } from "@/utils/commonUtils";
import axios from "axios";


export let useMainChatRoom=defineStore("mainChatRoom",{

    actions:{
        async getMessageVo(){
            let res=await axios.post(requestPrefix+"api/message/getMessages");
        }
    },

    state() {
        return{
            messageVoList:[] as MessageVo[]
        }
    },
})

