<template>
    <div class="ibox-content" style="width: calc(100% - 400px);">
        <div class="chat-form p-xs border-bottom">
            <div class="form-group">
                <textarea class="form-control" style="height: auto;" placeholder="Message" v-model="inputMessage"></textarea>
            </div>
            <div class="text-right">
                <button  class="btn btn-sm btn-primary m-t-n-xs" @click="sendMessage">
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
        name: "mainChatRoom"
    }
</script>
<script lang='ts' setup>
import { watch, ref, reactive, type Ref } from "vue";
import { useSocket } from "@/utils/socketIo";
import message from "@/components/message.vue";
import messageRight from "@/components/messageRight.vue";
import { type MessageVo } from "@/types";
import { type UserInter } from "@/types/UserType";

let socket = useSocket()
console.log(socket)
let messages: Ref<MessageVo[]> = ref([])
let inputMessage = ref("")
let showMessage: Ref<String> = ref("")

watch(messages, () => {
    if (messages.value.length > 5) {
        messages.value.pop();
    }
}, { deep: true })

socket.on("receive_message", (data: string) => {
    console.log("收到消息" + data)
    // vueMessage += (message + "\n");
    let mes = JSON.parse(data) as MessageVo
    console.log("qqqq", mes)
    messages.value.unshift(mes)
    // console.log(messages.length)
    // showMessage.value=messages.value.join("\n");
    // console.log(showMessage)
})

function sendMessage() {
    console.log("do sendMessage")
    let pojo={
        content:inputMessage.value
    }
    socket.emit("send_message", pojo)
}

let userInfo=JSON.parse(sessionStorage.getItem('userInfo') as string) as UserInter

</script>

<style scoped>
</style>