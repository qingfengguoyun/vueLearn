<template>
    <!-- <li> 用户:{{message.userId}} : {{ message.messageContent }}</li> -->

    <!-- <div class="chat-element m-t-sm">
        <a href="widgets.html#" class="float-left">
            <img alt="image" class="rounded-circle" :src="getImage('img/a1.jpg')" style="width: 38px; height: 38px;">
        </a>
        <div class="media-body ">
            <small class="float-right text-navy ">1m ago</small>
            <strong class="h5">用户：{{ message.sendUser.userName }} 用户Id：{{ message.sendUser.id }}</strong>
            <p class="m-b-xs h6 p-xs">
                {{ message.messageContent }}
            </p>
            <small class="text-muted">发送时间</small>
        </div>
    </div> -->



    <div class="chat-message " :class="{left: !isOnlineUser,right :isOnlineUser}">
        <img class="message-avatar" :src="getImage('img/a1.jpg')" alt="">
        <div class="message" style="font-size: 1.25em;" ref="mes">
            <a class="message-author" href="#" :style="{'color':isOnlineUser?'black':'','font-weight': isOnlineUser ? 'bold' : ''}"> 
                {{ message.sendUser.userName }} 
            </a>
            <span class="message-date">  {{ message.date }} </span>
            <span class="message-content m-t-sm">
                {{ message.messageContent }}
            </span>
        </div>
    </div>


</template>
<script lang='ts'>
export default
    {
        name: "Message"
    }
</script>
<script lang='ts' setup>
import { ref, defineProps, type Ref, reactive, onMounted } from "vue";
import { type MessageVo } from "@/types";
import { type UserInter } from "@/types/UserType";
import { getImage, getUserId } from "@/utils/commonUtils"
let props = defineProps({
    receivedMessage: {} 
})

let message: MessageVo = reactive(props.receivedMessage as MessageVo)
let isOnlineUser:Ref<boolean> = ref(false)
let mes:Ref<any>=ref() 

if (message.sendUser.id == getUserId()) {
    isOnlineUser.value = true
}

// onMounted(()=>{
//     if((props.receivedMessage as MessageVo).isUnRead==true){
//     mes.value.classList.add('bounce')
//     setTimeout(() => {
//         mes.value.classList.remove('bounce')
//     }, 2000)
// }
// })


</script>
<style scoped>
li {
    border: 2px solid black;
    margin-top: 5px;
}
</style>