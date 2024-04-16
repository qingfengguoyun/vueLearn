<template>
    <div class="ibox-content" style="width: 400px; ">
        <h2>用户列表</h2>

        <div class="input-group">
            <input type="text" placeholder="Search client " class="input form-control">
            <span class="input-group-append">
                <button type="button" class="btn btn btn-primary"> <i class="fa fa-search"></i> Search</button>
            </span>
        </div>
        <div class="clients-list">
            <ul class="nav nav-tabs">
                <li><a class="nav-link active" data-toggle="tab" ><i class="fa fa-user"></i>
                        全部用户</a></li>
            </ul>
            <div class="tab-content">
                <div id="tab-1" class="tab-pane active">
                    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 100%;">
                        <div class="full-height-scroll" style="overflow: hidden; width: auto; height: 100%;">
                            <div class="table-responsive">
                                <table class="table table-striped table-hover">
                                    <tbody>
                                        <tr v-for="userVo in onlineUser.userList" :key="userVo.userId">
                                            <td class="client-avatar"><img alt="image" :src="getImage('img/a1.jpg')">
                                            </td>
                                            <td>{{ userVo.userName }}
                                            </td>
                                            <td class="client-status">
                                                <span class="label label-primary"
                                                    v-if="userVo.isOnline == true">Active</span>
                                            </td>
                                            <td >
                                                <span class="label label-primary" @click="toPrivateChat(userVo)"
                                                    >Connect</span>
                                            </td>
                                            <td >
                                                <button type="button" class="btn btn-info m-r-sm">20</button>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="slimScrollBar"
                            style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 366.599px;">
                        </div>
                        <div class="slimScrollRail"
                            style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>
<script lang='ts'>
export default
    {
        name: "onlineUser"
    }
</script>
<script lang='ts' setup>
// let userList = [
//     {
//         id: 1,
//         userName: "qwe",
//         password: "123"
//     },
//     {
//         id: 2,
//         userName: "asd",
//         password: "123"
//     },
//     {
//         id: 3,
//         userName: "zxc",
//         password: "123"
//     },
// ]

import { ref, type Ref, onMounted, inject } from 'vue';

import { useOnlineUser } from '@/store/onlineUser';
import { getImage } from '@/utils/commonUtils';
import { useSocket } from '@/utils/socketIo';
import type { UserVo } from '@/types';
import { usePrivateChatRoom } from '@/store/privteChatRoom';

let {toMainChatRoom,toPrivateChatRoom}=inject("changeChatRoom",{toMainChatRoom:()=>{},toPrivateChatRoom:()=>{}})
let onlineUser = useOnlineUser()
let privateChat=usePrivateChatRoom()
let socket = useSocket()

socket.on("user_online", (data: string) => {
    console.log("topic:userOnline" + data)
    // vueMessage += (message + "\n");
    let mes = JSON.parse(data)
    for (let i = 0; i < onlineUser.userList.length; i++) {
        if (onlineUser.userList[i].userId == mes) {
            onlineUser.userList[i].isOnline = true;
        }
    }
})
socket.on("user_offline", (data: string) => {
    console.log("topic:userOffline" + data)
    // vueMessage += (message + "\n");
    let mes = JSON.parse(data)
    for (let i = 0; i < onlineUser.userList.length; i++) {
        if (onlineUser.userList[i].userId == mes) {
            onlineUser.userList[i].isOnline = false;
        }
    }
})

function toPrivateChat(param:UserVo){
   privateChat.setConnectUser(param);
    toPrivateChatRoom();
}
onMounted(()=>{
    console.log("down")
    onlineUser.getAllUserInfo()
})

</script>
<style scoped></style>