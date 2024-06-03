<template>
    <div class="userInfo p-h-md">
        <!-- 展示个人信息 -->
        <div v-if="!isOnChange">
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>用户名:</h3>
                </div>
                <el-col :span=8 class="w-200">
                    <el-input :placeholder="form.userName" v-model="onlineUser.user.userName"
                        disabled="false"></el-input>
                </el-col>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>头像</h3>
                </div>
                <div>
                    <div>
                        <el-image :src="'img/' + onlineUser.user.userDefaultImage || defaultImages[0]"
                            :style="{ height: '60px' }"></el-image>
                    </div>
                </div>
            </el-row>
        </div>
        <!-- 修改个人信息 -->
        <div v-if="isOnChange">
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>用户名:</h3>
                </div>
                <el-col :span=8 class="w-200">
                    <el-input :placeholder="form.userName" v-model="form.userName"></el-input>
                </el-col>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md " style="min-width: 100px;">
                    <h3>密码</h3>
                </div>
                <el-col :span="8" class="w-200">
                    <el-input :placeholder="form.password" show-password v-model="form.password"></el-input>
                </el-col>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md " style="min-width: 100px;">
                    <h3>确认密码</h3>
                </div>
                <el-col :span="8" class="w-200">
                    <el-input :placeholder="form.password" show-password v-model="form.repeatPasword"></el-input>
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
            </el-row>
            <el-row class="p-sm ">
                <div>
                    <h3>上传自定义头像</h3>
                </div>
            </el-row>
            <el-row class="p-sm ">
                <el-upload v-model:file-list="fileList" class="upload-demo" action="#" :multiple="false"
                    list-type="picture" :auto-upload="false" drag ref="uploadRef">
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
                <el-button type="primary" round class="m-r-md" v-if="!isOnChange" v-on:click="begainChangeUserInfo">
                    修改</el-button>
                <el-button type="primary" round class="m-r-md" v-if="isOnChange" v-on:click="begainChangeUserInfo">
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
        name: "UserInfo"
    }
</script>
<script lang='ts' setup>
import { type Ref, ref, toRaw } from 'vue';
import { useOnlineUser } from '@/store/onlineUser';
import UserInfo from '@/components/UserInfo.vue';
import { getImage, getImageById } from '@/utils/commonUtils';
import type { User } from '@/types';
import useUserInfo from '@/hooks/useUserInfo';

let userInfo=useUserInfo();
let onlineUser = useOnlineUser();
let changeForm = ref({
    id:onlineUser.user.id,
    userName:onlineUser.user.userName,
    password:onlineUser.user.password,
    userImageId:onlineUser.user.userImageId,
    userDefaultImage:onlineUser.user.userDefaultImage,
})
let form = ref({
    userName: onlineUser.user.userName,
    password: onlineUser.user.password,
    repeatPasword:onlineUser.user.password,
    userDefaultHeadPhoto: onlineUser.user.userDefaultImage,
    userImageId: onlineUser.user.userImageId
})
let defaultImages = [
    'default_head_photo.jpg',
    '1_1.png',
    '2_1.png',

]
let selectedDefaultImage = ref(0);
let newHeadPhotoUrl=ref(onlineUser.user.userImageId!=null?getImageById(onlineUser.user.userImageId):"img/"+(onlineUser.user.userDefaultImage || defaultImages[0]))
let changeDefalutImage = function (i: number) {
    selectedDefaultImage.value = i;
    newHeadPhotoUrl.value="img/"+defaultImages[i]
    changeForm.value.userDefaultImage="img/"+defaultImages[i]
}
let fileList = ref([])
let isOnChange = ref(false);
let begainChangeUserInfo = function () {
    isOnChange.value = !isOnChange.value
}
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