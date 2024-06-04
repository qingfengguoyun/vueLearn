<template>
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>{{ mainConList[commonStore.mainCom as string]  }}</h2>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#">This is</a>
                </li>
                <li class="breadcrumb-item active">
                    <strong>Breadcrumb</strong>
                </li>
            </ol>
        </div>
    </div>
</template>
<script lang='ts'>
export default
    {
        name: "SubHeader"
    }
</script>
<script lang='ts' setup>

import { useCommonStore } from '@/store/commonStore';
import type { ComponentsMap } from '@/types';
import { ref } from "vue";
let commonStore=useCommonStore()

interface com{
    [key:string]:any
} 

let mainConList:com = {
    "mainChatRoom": "公共聊天室",
    "privateChatRoom": "个人聊天室",
    "gallary": "画廊",
    "fileDownload": "下载文件",
    "fileUpload": "上传文件",
    "userInfo" : "用户信息",
    "userInfoChange": "修改个人信息",
}
// let comName=ref(mainConList[commonStore.mainCom as string])


</script>
<style scoped></style>