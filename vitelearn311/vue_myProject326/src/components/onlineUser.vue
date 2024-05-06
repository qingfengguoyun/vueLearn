<template>
    <div class="ibox-content onlineUserStyle" >
        <h2>用户列表</h2>

        <div class="input-group">
            <input type="text" placeholder="Search client " class="input form-control">
            <span class="input-group-append">
                <button type="button" class="btn btn btn-primary"> <i class="fa fa-search"></i> Search</button>
            </span>
        </div>
        <div class="clients-list">
            <ul class="nav nav-tabs">
                <li><a class="nav-link active" data-toggle="tab"><i class="fa fa-user"></i>
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
                                                <span class="label label-primary" style="height: auto;"
                                                    v-if="userVo.isOnline == true">在线</span>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-primary" style="height: auto;"
                                                    v-if="userVo.userId != getUserId()"
                                                    @click="toPrivateChat(userVo)">私聊
                                                </button>
                                            </td>
                                            <td>
                                                <span class="label label-warning"
                                                    v-if="unReadMessageMap.has(userVo.userId as string)">
                                                    {{ unReadMessageMap.get(userVo.userId as
                                                        string)?.unReadMessageCount }}
                                                </span>
                                                <span class="label label-warning" style="visibility: hidden;"
                                                    v-if="!unReadMessageMap.has(userVo.userId as string)">

                                                </span>
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

import { ref, type Ref, onMounted, inject, reactive } from 'vue';

import { useOnlineUser } from '@/store/onlineUser';
import { getImage } from '@/utils/commonUtils';
import { useSocket } from '@/utils/socketIo';
import type { UserVo, MessageVo, UnReadMessageCount } from '@/types';
import { usePrivateChatRoom } from '@/store/privteChatRoom';
import { getUserId } from '@/utils/commonUtils';
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/store/commonStore';

// let { toMainChatRoom, toPrivateChatRoom } = inject("changeChatRoom", { toMainChatRoom: () => { }, toPrivateChatRoom: () => { } })

let commonStore = useCommonStore();
let toMainChatRoom = commonStore.toMainChatRoom;
let toPrivateChatRoom = commonStore.toPrivateChatRoom;
let onlineUser = useOnlineUser()
let privateChat = usePrivateChatRoom()
let socket = useSocket()
let unReadMessageMap = ref(new Map<String, UnReadMessageCount>());

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

function toPrivateChat(param: UserVo) {
    console.log('paramUSERVO', param)
    privateChat.setConnectUser(param);
    toPrivateChatRoom();
    // //在用户界面直接更新privateCharRoomStore的消息，虽然不太合理（因为privateChatRoom组件初始化时会重新查一遍，但切换私聊对象时不会触发组件的初始化）
    // privateChat.getMessageVoList({"connectUserId":param.userId}).then(()=>{

    // })
    //移除与connectUser的未读消息
    onlineUser.unReadMessageCount.delete(param.userId as String)
}

socket.on("receive_private_message", (data: string) => {
    console.log("onlineUser收到私发消息" + data)
    // vueMessage += (message + "\n");
    let mes = JSON.parse(data) as MessageVo
    let userId = mes.sendUser.id as string
    //如果接到的消息的发送者不为自身
    if (mes.sendUser.id != getUserId()) {
        //若当前界面为私聊且对象为发送者则不执行任何操作
        //初次登录时sessionStorage中，connectUser，chatCom可能为空，需设置默认值
        let connectUserVo = JSON.parse(sessionStorage.getItem("connectUser") as string) as UserVo || {} as UserVo
        let chatCom = sessionStorage.getItem("chatCom") as string || 'mainChatRoom'
        console.log("connectUserVo.userId", connectUserVo.userId, "chatCom", chatCom)
        if (connectUserVo.userId == mes.sendUser.id && chatCom == 'privateChatRoom') {

        } else {
            if (unReadMessageMap.value.has(userId)) {
                let count = unReadMessageMap.value.get(userId)?.unReadMessageCount as number;
                (unReadMessageMap.value.get(userId) as UnReadMessageCount).unReadMessageCount = count + 1;
            } else {
                let obj: UnReadMessageCount = {};
                obj.id = userId;
                obj.unReadMessageCount = 1;
                obj.userName = mes.sendUser.userName
                unReadMessageMap.value.set(userId, obj)
            }
        }

    }
})

onMounted(async () => {
    console.log("down")

    await onlineUser.getAllUserInfo()
    await onlineUser.getUnReadMessageCount().then(() => {
        unReadMessageMap.value = onlineUser.unReadMessageCount;
    })

})

</script>
<style scoped>
    .onlineUserStyle {
        width: 400px;
        display: block;
    }

    @media screen and (max-width: 768px) {
        .onlineUserStyle {
            width: 100%;
            display: block;
        }
    }

</style>