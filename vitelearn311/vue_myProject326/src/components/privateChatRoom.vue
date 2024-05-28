<template>
    <div class="ibox-content chatRoomStyle" >
        <div>
            <h2> 单独聊天室</h2>
        </div>
        <div>
            <h4> 私聊对象 :{{ privateChat.connectUser.userName }}</h4>
        </div>
        <div class="chat-form p-xs border-bottom">
            <div class="form-group">
                <textarea class="form-control" style="height: auto;" placeholder="Message"
                    v-model="inputMessage"></textarea>
            </div>
            <div class="text-right">
                <button class="btn btn-sm btn-primary m-t-n-xs" @click="sendPrivateMessage()">
                    <strong>发送消息</strong></button>
            </div>

        </div>
        <div class="chat-discussion chat-list">
            <div class="chat-activity-list" v-for="message in messageVoList" :key="message.messageId">
                <Message :receivedMessage="message"></Message>
            </div>
        </div>

    </div>

</template>
<script lang='ts'>
export default
    {
        name: "PrivateChatRoom"
    }
</script>
<script lang='ts' setup>
import { watch, ref, type Ref, onMounted, onBeforeMount } from "vue";
import  useSocketIo from "@/hooks/socketIo";
import Message from "@/components/Message.vue";
// import messageRight from "@/components/messageRight.vue";
import type { MessageVo, MessagePojo, UserVo } from "@/types";
import { arrayDuplicate, getUserId, isArrayHasDuplicates } from "@/utils/commonUtils";
import { usePrivateChatRoom } from "@/store/privteChatRoom";
import { storeToRefs } from "pinia";
import { postRequest } from "@/utils/axiosUtils";
import { useOnlineUser } from "@/store/onlineUser";

let privateChat = usePrivateChatRoom()
//setup 函数中不能使用await 方法，除非使用then执行后续操作
// await privateChat.getMessageVoList({ connectUserId: privateChat.connectUser.id })
let { messageVoList, connectUser } = storeToRefs(privateChat)
let socket = useSocketIo().getSocket();
let inputMessage = ref("")
let onlineUser = useOnlineUser();
//私聊对象信息ConnectUserVo 从sessionStorage中获取
let connectUserVo = JSON.parse(sessionStorage.getItem("connectUser") as string) as UserVo



watch(messageVoList, (newIns, oldIns) => {
    //判断newIns中是否有重复,如果有则去重
    if (isArrayHasDuplicates(newIns)) {
        messageVoList.value = arrayDuplicate(newIns);
    }
    if (messageVoList.value.length > 10) {
        messageVoList.value.pop();
    }
}, { deep: true })

//可以添加针对connectUser的watch方法
watch(connectUser,async (newIns,oldIns)=>{
    console.log("WATCH",newIns,oldIns)
    console.log("update MessageVoList")
    await privateChat.getMessageVoList({ connectUserId: newIns.id })
    messageVoList.value = privateChat.messageVoList
},{ deep: true })

socket.on("receive_private_message", (data: string) => {
    console.log("private_message收到消息" + data)
    // vueMessage += (message + "\n");
    let mes = JSON.parse(data) as MessageVo

    // 如果收到的消息为connectUser发送的，则加入消息显示队列
    connectUserVo = JSON.parse(sessionStorage.getItem("connectUser") as string) as UserVo
    if (mes.sendUser.id == connectUserVo.userId) {
        messageVoList.value.unshift(mes)
        console.log("@@@@list", messageVoList.value)
    }
})

async function sendPrivateMessage() {
    console.log("send private message")
    connectUserVo = JSON.parse(sessionStorage.getItem("connectUser") as string) as UserVo
    let pojo: MessagePojo = {
        sendUserId: getUserId(),
        content: inputMessage.value,
        receiveUserId: connectUserVo.userId,
        isBroadcast: false
    }
    privateChat.sendPrivateMessage(pojo);
    inputMessage.value = ""
    // socket.emit("send_message", pojo)
}
onBeforeMount(async () => {
    console.log("privateChatroom onBeforeMount")
    // 刷新后 privateChat.connectUser.id 也被清空，因此只能从sessionStorage中取Userid    
    if (connectUserVo && connectUserVo.userId != null) {
        await privateChat.getMessageVoList({ connectUserId: connectUserVo.userId })
        messageVoList.value = privateChat.messageVoList
    }
    //清除和ConnectUser的未读记录
    onlineUser.unReadMessageCount.delete(connectUserVo.userId as string);

})
onMounted(async () => {
    console.log("privateChatroom onMounted")
})

</script>
<style scoped></style>