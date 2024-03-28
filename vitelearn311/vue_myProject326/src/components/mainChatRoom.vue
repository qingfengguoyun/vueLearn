<template>
     <el-container class="layout-container-demo">
            <el-header >
                输入内容：<input v-model="inputMessage">
                <button @click="sendMessage"> 发送</button>
            </el-header>
            <el-container >
                <el-main>
                    <textarea readonly="readonly" v-model="showMessage"></textarea>
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
    import { watch,ref } from "vue";
    import { useSocket } from "@/utils/socketIo";
    import {  Socket } from 'socket.io-client';
    let socket=useSocket() 
    console.log(socket)
    let messages=[""]
    let inputMessage=ref("")
    let showMessage=ref("")

    watch(()=>{
        return messages
    },()=>{
        console.log("did")
        if(messages.length>10){
			messages.shift();
		}
		// showMessage=messages.join("\n");
    })

    socket.on("receive_message",(message:any)=>{
        console.log("收到消息" + message)
			// vueMessage += (message + "\n");
			messages.push(message)
            // console.log(messages.length)
            showMessage.value=messages.join("\n");
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