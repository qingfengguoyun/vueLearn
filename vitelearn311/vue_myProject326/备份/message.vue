<template>
    <!-- <li> 用户:{{message.userId}} : {{ message.messageContent }}</li> -->
    
        <div class="feed-element">
            <a class="float-left" href="profile.html">
                <img alt="image" class="rounded-circle" :src="getImage('img/a4.jpg')">
            </a>
            <div class="media-body " >
                <!-- <small class="float-right">5m ago</small> -->
                <strong>用户:{{message.userName}} :</strong> {{ message.messageContent }} <br>
                <small class="text-muted">{{ new Date() }}</small>

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
    function getImage(imgSrc:any){
        let url=new URL(imgSrc, import.meta.url).href
        console.log("@@url:",url)
        return url;
    }
</script>
<style scoped>
    li{
        border: 2px solid black; 
        margin-top: 5px;
    }
</style>