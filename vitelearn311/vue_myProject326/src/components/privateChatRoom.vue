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
import { watch, ref, reactive, type Ref, onMounted } from "vue";
import { useSocket } from "@/utils/socketIo";
import message from "@/components/message.vue";
// import messageRight from "@/components/messageRight.vue";
import type { MessageVo,MessagePojo } from "@/types";
import { getUserId} from "@/utils/commonUtils";
import { usePrivateChatRoom } from "@/store/privteChatRoom";
import { postRequest } from "@/utils/axiosUtils";

let privateChat=usePrivateChatRoom()
let socket = useSocket()
let messages: Ref<MessageVo[]> = ref(privateChat.messageVoList)
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
    console.log("qqqq", mes)
    if(mes.sendUser.userId==privateChat.connectUser.id){
        messages.value.unshift(mes)
    }
    // console.log(messages.length)
    // showMessage.value=messages.value.join("\n");
    // console.log(showMessage)
})

async function sendPrivateMessage() {
    console.log("send private message")
    let pojo:MessagePojo={
        sendUserId:getUserId() ,
        content:inputMessage.value,
        receiveUserId: privateChat.connectUser.id,
        isBroadcast: false
    }
    let res=await postRequest("/api/message/sendPrivateMessage",pojo)
    if(res.data.code==200){
        console.log("receive message",res.data.data)
        let mes:MessageVo=res.data.data as MessageVo
        messages.value.unshift(mes);

    }
    // socket.emit("send_message", pojo)
}
onMounted(async ()=>{
    console.log("privateChatroom onMounted")
    // await mainChatRoom.getMessageVo();
    // messages.value=mainChatRoom.messageVoList
})

</script>
<style scoped>

</style>