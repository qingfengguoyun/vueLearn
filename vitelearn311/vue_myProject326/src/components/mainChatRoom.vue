<template>
     <el-container class="layout-container-demo">
            <el-header >
                输入内容：<input v-model="inputMessage">
                <button @click="sendMessage"> 发送</button>
            </el-header>
            <el-container >
                <el-main>
                    <!-- v-for循环一定要指定:key，否则已经渲染的dom元素不会被移除 -->
                    <!-- 最好使用对象中的唯一属性指定key -->
                    <!-- 如果对象中没有可以作为key的属性，可以直接将对象本身作为key（前提为每个对象均不同）
                    或使用数组索引作为key(不推荐，因为性能较低)
                    <div v-for="(message,index) in messages" :key="index"> </div> -->
                    <div v-for="message in messages" :key="message.messageId">
                        <message :receivedMessage="message"></message>
                    </div>
                </el-main>               
            </el-container>
    </el-container>

</template>
<script lang='ts'>
export default
{
    name: "mainChatRoom"
}
</script>
<script lang='ts' setup>
    import { watch,ref,reactive,type Ref } from "vue";
    import { useSocket } from "@/utils/socketIo";
    import {  Socket } from 'socket.io-client';
    import message  from "@/components/message.vue";
    import { type MessageVo } from "@/types";

    let socket=useSocket() 
    console.log(socket)
    let messages:Ref<MessageVo[]>=ref([])
    let inputMessage=ref("")
    let showMessage:Ref<String>=ref("")

    watch(messages,()=>{
        if (messages.value.length > 5) {
                messages.value.pop();
            }
    },{deep:true})

    socket.on("receive_message",(data:string)=>{
        console.log("收到消息" + data)
			// vueMessage += (message + "\n");
            let mes=JSON.parse(data) as MessageVo
            console.log("qqqq",mes)
			messages.value.unshift(mes)           
            // console.log(messages.length)
            // showMessage.value=messages.value.join("\n");
            // console.log(showMessage)
    })

    function sendMessage(){
        socket.emit("send_message",inputMessage.value)
    }

</script>
<style scoped>
    .layout-container-demo .el-header {
        position: relative;
        display: inline-flex;
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
    }
    textarea {
        height: 400px;
        width: 100%;
    }
</style>