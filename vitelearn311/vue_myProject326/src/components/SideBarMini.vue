<template>
    <div class="sidebarMini mini-navbar" style="background-color: #2F4050">
        <nav class="sidebar-mini navbar-default " role="navigation" >
            <div class="sidebar-collapse">
                <ul class="nav metismenu" id="side-menu" style="background-color: #2F4050;">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <img alt="image" class="rounded-circle message-avatar" :src="onlineUser.getUserImageUrl()">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="block m-t-xs font-bold">{{ user.userName }}</span>                              
                            </a>
                        </div>

                    </li>
                    <li>
                        <a href="#" @click="commonStore.toMainChatRoom()"><i class="fa fa-th-large"></i> <span
                                class="nav-label">聊天</span></a>
                        <!-- <ul class="nav nav-second-level collapse" aria-expanded="false">
                            <li><a href="#">Dashboard v.1</a></li>
                            <li><a href="#">Dashboard v.2</a></li>
                            <li><a href="#">Dashboard v.3</a></li>
                            <li><a href="#">Dashboard v.4</a></li>
                            <li><a href="#">Dashboard v.5 </a></li>
                        </ul> -->
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toFileUpload()"><i class="fa fa-th-large"></i> <span
                                class="nav-label">文件</span></a>
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toFileDownload()"><i class="fa fa-th-large"></i> <span
                                class="nav-label">下载</span></a>
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toGallary()"><i class="fa fa-th-large"></i> <span
                                class="nav-label">画廊</span></a>
                    </li>
                    <li>
                        <a href="#" @click="commonStore.toUserInfoChange()"><i class="fa fa-th-large"></i> <span
                                class="nav-label">信息</span></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-th-large"></i> <span class="nav-label">其他</span></a>
                    </li>


                </ul>

            </div>
        </nav>
    </div>
</template>
<script lang='ts'>
export default
    {
        name: "SideBarMini"
    }
</script>
<script lang='ts' setup>
import { useRouter, RouterLink } from 'vue-router';
import { type UserInter } from '@/types/UserType'
import { getImage } from '@/utils/commonUtils';
import { useCommonStore } from '@/store/commonStore';
import { useOnlineUser } from '@/store/onlineUser';
import { useSideBar } from '@/store/sidebar';
import { isArrayHasDuplicates } from '../utils/commonUtils';



let commonStore = useCommonStore();
let onlineUser = useOnlineUser();
let sideBar = useSideBar();

let user = JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {}
let router = useRouter();
</script>
<style scoped></style>