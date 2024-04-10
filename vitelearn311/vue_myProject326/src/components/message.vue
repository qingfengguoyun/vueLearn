<template>
    <!-- <li> 用户:{{message.userId}} : {{ message.messageContent }}</li> -->

    <div class="chat-element m-t-sm" >
        <a href="widgets.html#" class="float-left">
            <img alt="image" class="rounded-circle" :src="getImage('img/a4.jpg')" style="width: 38px; height: 38px;">
        </a>
        <div class="media-body " >
            <small class="float-right text-navy ">1m ago</small>
            <strong class="h5">用户：{{ message.sendUser.userName }} 用户Id：{{ message.sendUser.userId }}</strong>
            <p class="m-b-xs h6 p-xs">
                {{ message.messageContent }}
            </p>
            <small class="text-muted">发送时间</small>
        </div>
    </div>


</template>
<script lang='ts'>
export default
    {
        name: "message"
    }
</script>
<script lang='ts' setup>
    import { ref, defineProps, type Ref, reactive } from "vue";
    import { type MessageVo } from "@/types";
    import { type UserInter } from "@/types/UserType";
    let props = defineProps({
        receivedMessage: Object
    })
    // interface MessageVo {
    //     userId: number,
    //     userName: string,
    //     messageId: number,
    //     messageContent: string
    // }
    let message: MessageVo = reactive(props.receivedMessage as MessageVo)
    console.log("@@@@@", message)
    function getImage(imgSrc: any) {
        let url = new URL(imgSrc, import.meta.url).href
        console.log("@@url:", url)
        return url;
    }

    
</script>
<style scoped>
li {
    border: 2px solid black;
    margin-top: 5px;
}
</style>