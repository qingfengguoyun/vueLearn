<template>
    <div class="sideBar mini-navbar" style="background-color: #2F4050">
        <nav class="sidebar navbar-default " role="navigation" >
            <div class="sidebar-collapse" >
                <ul class="nav metismenu" id="side-menu" style="background-color: #2F4050;">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <img alt="image" class="rounded-circle message-avatar" :src="onlineUser.getUserImageUrl()">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="block m-t-xs font-bold">{{ user.userName }}</span>
                                <span class="text-muted text-xs block">Art Director <b class="caret"></b></span>
                            </a>
                            <!-- <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><a class="dropdown-item" href="#">Contacts</a></li>
                                <li><a class="dropdown-item" href="#">Mailbox</a></li>
                                <li class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Logout</a></li>
                            </ul> -->
                        </div>
                        <div class="logo-element">
                            IN+
                        </div>
                    </li>
                    <!-- <li>
                        <a href="#" @click="commonStore.toMainChatRoom()"><i class="fa fa-th-large"></i> <span class="nav-label">公共聊天室</span></a>
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toFileUpload()"><i class="fa fa-th-large"></i> <span class="nav-label">文件上传</span></a>
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toFileDownload()"><i class="fa fa-th-large"></i> <span class="nav-label">文件下载</span></a>
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toGallary()"><i class="fa fa-th-large"></i> <span class="nav-label">画廊</span></a>
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toUserInfo()"><i class="fa fa-th-large"></i> <span class="nav-label">个人信息</span></a>
                    </li> -->
                    <li v-for="(comConf,key) in sideBar.componentConfig" :key="key">
                        <template v-if="!comConf.isAdmin && onlineUser.user.userName!='admin'">
                            <a href="#" @click="commonStore.toSelectComponent(key as string)"><i class="fa fa-th-large"></i> <span class="nav-label">{{ comConf.fullName }}</span></a>
                        </template>
                        <template v-if="comConf.isAdmin && onlineUser.user.userName=='admin'">
                            <a href="#" @click="commonStore.toSelectComponent(key as string)"><i class="fa fa-th-large"></i> <span class="nav-label">{{ comConf.fullName }}</span></a>
                        </template>                       
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-th-large"></i> <span class="nav-label">其他功能</span><span
                                class="fa arrow"></span></a>
                    </li>


                </ul>

            </div>
        </nav>
    </div>

</template>
<script lang='ts'>
export default
{
    name: "SideBar"
}
</script>
<script lang='ts' setup>
import { useRouter, RouterLink } from 'vue-router';
import { type UserInter } from '@/types/UserType'
import { getImage } from '@/utils/commonUtils';
import { useCommonStore } from '@/store/commonStore';
import { useOnlineUser } from '@/store/onlineUser';
import { useSideBar } from '@/store/sidebar';

console.log("Sidebar Setup")

let commonStore=useCommonStore();
let onlineUser=useOnlineUser();
let sideBar=useSideBar();

let user = JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {}
let router = useRouter();




</script>
<style scoped>

</style>