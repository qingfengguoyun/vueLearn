<template>
    <li> 用户:{{message.userId}} : {{ message.messageContent }}</li>

</template>
<script lang='ts'>
export default
{
    name: "message"
}
</script>
<script lang='ts' setup>
import { ref,defineProps,type Ref,reactive } from "vue";
import { type MessageVo } from "@/types";
let props=defineProps({
    receivedMessage:Object
})
interface MessageVo{
    userId:number,
    userName: string,
    messageId: number,
    messageContent: string
}
let message:MessageVo =reactive(props.receivedMessage as MessageVo) 
console.log("@@@@@",message)
</script>
<style scoped>
    li{
        border: 2px solid black; 
        margin-top: 5px;
    }
</style>