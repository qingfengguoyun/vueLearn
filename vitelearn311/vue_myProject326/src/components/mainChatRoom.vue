<template>
    <div class="ibox-content chatRoomStyle" >
        <div>
            <h2> 公共聊天室 </h2>
        </div>
        <div class="chat-form p-xs border-bottom">
            <div class="form-group">
                <textarea class="form-control" style="height: auto;" placeholder="Message" v-model="inputMessage"></textarea>
            </div>
            <div class="text-right">
                <button  class="btn btn-sm btn-primary m-t-n-xs" @click="sendMessage">
                    <strong>发送消息</strong></button>
            </div>
            
        </div>
        <div class="chat-discussion chat-list">
            <div class="chat-activity-list" v-for="message in messages" :key="message.messageId" >
                <message  :receivedMessage="message"></message>                     
            </div>
            <div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px;  height: 166px;"></div>         
        </div>

    </div>

</template>
<script lang='ts'>
export default
    {
        name: "MainChatRoom"
    }
    
</script>
<script lang='ts' setup>
import { watch, ref, reactive, type Ref, onMounted } from "vue";
import useSocketIo from "@/hooks/socketIo";
import message from "@/components/Message.vue";
// import messageRight from "@/components/messageRight.vue";
import { type MessageVo } from "@/types";
import { arrayDuplicate, getUserId,getUserInfo, isArrayHasDuplicates } from "@/utils/commonUtils";
import { useMainChatRoom } from "@/store/mainChatRoom";
// import { useSocket } from '../utils/socketIo';

let socket = useSocketIo().getSocket();
let mainChatRoom =useMainChatRoom();
let messages: Ref<MessageVo[]> = ref(mainChatRoom.messageVoList)
let inputMessage = ref("")

watch(messages, (newIns,oldIns) => {
    //判断newIns中是否有重复,如果有则去重
    if (isArrayHasDuplicates(newIns)){
        messages.value=arrayDuplicate(newIns);
    }
    if (messages.value.length > 10) {
        messages.value.pop();
    }
    //对消息进行去重(但仅修改newIns并不会同步修改messages)
    // newIns=arrayDuplicate(newIns);
}, { deep: true })

socket.on("receive_message", (data: string) => {
    console.log("收到消息" + data)
    let mes = JSON.parse(data) as MessageVo
    console.log("qqqq", mes)
    messages.value.unshift(mes)
    console.log("messages",messages.value)
})

function sendMessage() {
    console.log("do sendMessage")
    let pojo={
        sendUserId:getUserId(),
        content:inputMessage.value
    }
    socket.emit("send_message", pojo)
    inputMessage.value=""
}
onMounted(async ()=>{
    console.log("mainChatroom onMounted")
    await mainChatRoom.getMessageVo();
    messages.value=mainChatRoom.messageVoList
})

</script>

<style scoped>

</style>