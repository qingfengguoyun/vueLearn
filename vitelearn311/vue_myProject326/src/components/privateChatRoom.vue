<template>
    <div class="ibox-content" style="width: calc(100% - 400px);">
        <div>
            <h2> This is PrivateChatRoom</h2>
        </div>
        <div>
            <h4> Connect with :{{ privateChat.connectUser.userName }}</h4>
        </div>
        <div class="chat-form p-xs border-bottom">
            <div class="form-group">
                <textarea class="form-control" style="height: auto;" placeholder="Message" v-model="inputMessage"></textarea>
            </div>
            <div class="text-right">
                <button  class="btn btn-sm btn-primary m-t-n-xs" @click="sendPrivateMessage()">
                    <strong>Send message</strong></button>
            </div>
            
        </div>
        <div>
            <div class="chat-activity-list" v-for="message in messages" :key="message.messageId">
                <message  :receivedMessage="message"></message>               
            </div>
        </div>

    </div>

</template>
<script lang='ts'>
export default
{
    name: "privateChatRoom"
}
</script>
<script lang='ts' setup>
import { watch, ref, type Ref, onMounted } from "vue";
import { useSocket } from "@/utils/socketIo";
import message from "@/components/message.vue";
// import messageRight from "@/components/messageRight.vue";
import type { MessageVo,MessagePojo } from "@/types";
import { getUserId} from "@/utils/commonUtils";
import { usePrivateChatRoom } from "@/store/privteChatRoom";
import { storeToRefs } from "pinia";
import { postRequest } from "@/utils/axiosUtils";

let privateChat=usePrivateChatRoom()
let {messageVoList,connectUser} =storeToRefs(privateChat)
let socket = useSocket()
let messages: Ref<MessageVo[]> = messageVoList
let inputMessage = ref("")


watch(messages, () => {
    if (messages.value.length > 5) {
        messages.value.pop();
    }
}, { deep: true })

socket.on("receive_private_message", (data: string) => {
    console.log("private_message收到消息" + data)
    // vueMessage += (message + "\n");
    let mes = JSON.parse(data) as MessageVo
    if(mes.sendUser.userId==privateChat.connectUser.id){
        messages.value.unshift(mes)
    }
})

async function sendPrivateMessage() {
    console.log("send private message")
    let pojo:MessagePojo={
        sendUserId:getUserId() ,
        content:inputMessage.value,
        receiveUserId: privateChat.connectUser.id,
        isBroadcast: false
    }
    privateChat.sendPrivateMessage(pojo);
    // socket.emit("send_message", pojo)
}
onMounted(async ()=>{
    console.log("privateChatroom onMounted")
    // await privateChat.getMessageVoList({connectUserId:privateChat.connectUser.id})
    // messages=ref(privateChat.messageVoList)
    // console.log("messages",messages.value)
    // await mainChatRoom.getMessageVo();
    // messages.value=mainChatRoom.messageVoList
})

</script>
<style scoped>

</style>