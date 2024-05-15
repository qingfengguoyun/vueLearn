<template>
    <!-- <li> 用户:{{message.userId}} : {{ message.messageContent }}</li> -->

    <div class="chat-element right">
        <a class="float-right">
            <img alt="image" class="rounded-circle" :src="getImage('img/a1.jpg')">
        </a>
        <div class="media-body text-right ">
            <small class="float-left">5m ago</small>
            <strong>用户：{{ message.sendUser.userName }}</strong>
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
        name: "MessageRight"
    }
</script>
<script lang='ts' setup>
import { ref, defineProps, type Ref, reactive } from "vue";
import { type MessageVo } from "@/types";
import { type UserInter } from "@/types/UserType";
import { getImage } from "@/utils/commonUtils";
let props = defineProps({
    receivedMessage: Object
})

let message: MessageVo = reactive(props.receivedMessage as MessageVo)
console.log("@@@@@", message)


// let rightClass = "";
// let userInfo = JSON.parse(sessionStorage.getItem('userInfo') as string) as UserInter
// if (message.sendUser?.userId === userInfo.id) {
//     rightClass = "right"
// }
</script>
<style scoped>
li {
    border: 2px solid black;
    margin-top: 5px;
}
</style>