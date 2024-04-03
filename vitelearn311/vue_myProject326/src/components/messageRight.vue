<template>
    <!-- <li> 用户:{{message.userId}} : {{ message.messageContent }}</li> -->

    <div class="chat-element right">
        <a href="widgets.html#" class="float-right">
            <img alt="image" class="rounded-circle" >
        </a>
        <div class="media-body text-right ">
            <small class="float-left">5m ago</small>
            <strong>用户：{{ message.userName }}</strong>
            <p class="m-b-xs">
                {{ message.messageContent }}
            </p>
            <small class="text-muted">Today 4:21 pm - 12.06.2014</small>
        </div>
    </div>


</template>
<script lang='ts'>
export default
    {
        name: "messageRight"
    }
</script>
<script lang='ts' setup>
import { ref, defineProps, type Ref, reactive } from "vue";
import { type MessageVo } from "@/types";
import { type UserInter } from "@/types/UserType";
let props = defineProps({
    receivedMessage: Object
})
interface MessageVo {
    userId: number,
    userName: string,
    messageId: number,
    messageContent: string
}
let message: MessageVo = reactive(props.receivedMessage as MessageVo)
console.log("@@@@@", message)
function getImage(imgSrc: any) {
    let url = new URL(imgSrc, import.meta.url).href
    console.log("@@url:", url)
    return url;
}

let rightClass = "";
let userInfo = JSON.parse(sessionStorage.getItem('userInfo') as string) as UserInter
if (message.userId === userInfo.id) {
    rightClass = "right"
}
</script>
<style scoped>
li {
    border: 2px solid black;
    margin-top: 5px;
}
</style>