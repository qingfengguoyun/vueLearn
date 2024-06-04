<template>
    <div class="userInfo p-h-md">
        <!-- 修改个人信息 -->
        <div>
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>用户名:</h3>
                </div>
                <el-col :span=8 class="w-200">
                    <el-input :placeholder="changeForm.userName" v-model="changeForm.userName"></el-input>
                </el-col>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md " style="min-width: 100px;">
                    <h3>密码</h3>
                </div>
                <el-col :span="8" class="w-200">
                    <el-input :placeholder="changeForm.password" show-password v-model="changeForm.password"></el-input>
                </el-col>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md " style="min-width: 100px;">
                    <h3>确认密码</h3>
                </div>
                <el-col :span="8" class="w-200">
                    <el-input :placeholder="changeForm.password" show-password v-model="changeForm.repeatPassword"></el-input>
                </el-col>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>头像</h3>
                </div>
                <div>
                    <div>
                        <el-image :src="newHeadPhotoUrl"
                            :style="{ height: '60px' }"></el-image>
                    </div>
                </div>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>默认头像</h3>
                </div>
                <div class="m-r-md" v-for="(imageUrl, index) in defaultImages">
                    <div>
                        <el-image :src="'img/' + imageUrl" :style="{ height: '60px' }"
                            :class="{ img_border: index != selectedDefaultImage, img_border_selected: index == selectedDefaultImage }"
                            @click="changeDefalutImage(index)"></el-image>
                    </div>
                </div>
                <div>
                    <el-button type="primary">还原</el-button>
                </div>
            </el-row>
            <el-row class="p-sm ">
                <div>
                    <h3>上传自定义头像</h3>
                </div>
            </el-row>
            <el-row class="p-sm ">
                <el-upload v-model:file-list="fileList" class="upload-demo" action="#" :multiple="false"
                    list-type="picture" :auto-upload="false" drag limit=1 ref="uploadRef">
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </el-row>
        </div>

        <el-row class="p-sm ">
            <div>
                <el-button type="primary" round class="m-r-md" v-if="isOnChange" v-on:click="commonStore.toUserInfo()">
                    取消</el-button>
            </div>
            <div>
                <el-button type="primary" round :disabled="!isOnChange" @click="updateUserInfo()"> 保存 </el-button>
            </div>
        </el-row>
    </div>


</template>
<script lang='ts'>
export default
    {
        name: "UserInfoChange"
    }
</script>
<script lang='ts' setup>
import { type Ref, ref, toRaw, watch } from 'vue';
import { useOnlineUser } from '@/store/onlineUser';
import UserInfo from '@/components/UserInfo.vue';
import { getImage, getImageById, getProfilePhotoById } from '@/utils/commonUtils';
import type { User } from '@/types';
import useUserInfoChange from'@/hooks/useUserInfoChange';
import { useCommonStore } from '@/store/commonStore';

let commonStore=useCommonStore();
let userInfo=useUserInfoChange();
let onlineUser = useOnlineUser();
let changeForm = ref({
    id:onlineUser.user.id,
    userName:onlineUser.user.userName,
    password:onlineUser.user.password,
    userImageId:onlineUser.user.userImageId,
    userDefaultImage:onlineUser.user.userDefaultImage,
    repeatPassword:onlineUser.user.password,
})
let defaultImages = [
    'default_head_photo.jpg',
    '1_1.png',
    '2_1.png',
]
let selectedDefaultImage = ref(-1);

let newHeadPhotoUrl=ref(onlineUser.user.userImageId!=null?getProfilePhotoById(onlineUser.user.userImageId):"img/"+(onlineUser.user.userDefaultImage || defaultImages[0]))

let changeDefalutImage = function (i: number) {
    selectedDefaultImage.value = i;
    newHeadPhotoUrl.value="img/"+defaultImages[i]
    changeForm.value.userDefaultImage="img/"+defaultImages[i]
}
let fileList = ref([])
// watch(fileList,(newIns,oldIns)=>{
//     console.log("fileLsit",newIns.length)
//     while(fileList.value.length>1){
//         fileList.value.unshift()
//     }
// })
let isOnChange = ref(false);
let updateUserInfo=function(){
    let u:User={
        id:onlineUser.user.id,
        userName:changeForm.value.userName,
        password:changeForm.value.password,
        userDefaultImage:defaultImages[selectedDefaultImage.value]
    }
    userInfo.updateUserInfo(u);

    isOnChange.value=!isOnChange.value
}



</script>
<style scoped>
    .userInfo {
        background-color: white
    }

    .img_border {
        border: 2px solid gainsboro;
        padding: 2px
    }

    .img_border_selected {
        border: 2px solid rgb(119, 223, 98);
        padding: 2px
    }

    el-row {
        padding: 15px;
    }
</style>