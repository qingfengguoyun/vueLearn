<template>
    <div class="userInfo p-h-md">
        <!-- 展示个人信息 -->
        <div>
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>用户名</h3>
                </div>
                <el-col :span=8 class="w-200">
                    <h3>{{ userInfo.vo.userName}}</h3>
                </el-col>
            </el-row>
            <el-row class="p-sm ">
                <div class="m-r-md" style="min-width: 100px;">
                    <h3>头像</h3>
                </div>
                <div>
                    <div>
                        <el-image :src="userInfo.profilePhoto" :style="{ height: '60px' }"></el-image>
                    </div>
                </div>
            </el-row>
            <el-row class="p-sm ">
            <div>
                <el-button type="primary" round class="m-r-md" v-if="userInfo.vo.userId==onlineUser.user.id" v-on:click="commonStore.toUserInfoChange">
                    修改</el-button>
            </div>
        </el-row>
        </div>

    </div>


</template>
<script lang='ts'>
export default
    {
        name: "UserInfo"
    }
</script>
<script lang='ts' setup>
import { type Ref, ref, toRaw, onMounted, onBeforeMount } from 'vue';
import { useOnlineUser } from '@/store/onlineUser';
import { getImage, getImageById, getProfilePhotoById } from '@/utils/commonUtils';
import type { UserVo, User } from '@/types';
import useUserInfo from '@/hooks/useUserInfo'
import { postRequest } from '@/utils/axiosUtils';
import type { ResultInter } from '@/types/ResultType';
import { useCommonStore } from '@/store/commonStore';



let commonStore=useCommonStore();
let onlineUser = useOnlineUser();
let userId = onlineUser.showInfoUserId
// let vo:Ref<UserVo> =ref({});
// let profilePhoto = ref("")
// console.log("userId", userId)

let userInfo=ref(useUserInfo());
userInfo.value.getUserInfoById(userId!)

onMounted(async () => {
   
    // let res = await postRequest<ResultInter>("/api/user/getUserInfoById", userId);
    // if (res.data.code == 200) {
    //     console.log("res.data.data", res.data.data)
    //     vo.value = res.data.data;
    //     console.log("vo:", vo.value)
    //     if (vo.value.userImageId != null) {
    //         profilePhoto.value = getProfilePhotoById(vo.value.userImageId)
    //     } else if (vo.value.userDefaultImage != null) {
    //         profilePhoto.value = "img/" + vo.value.userDefaultImage;
    //     } else {
    //         profilePhoto.value = "img/default_head_photo.jpg";
    //     }
    // }
})




// let changeForm = ref({
//     id:onlineUser.user.id,
//     userName:onlineUser.user.userName,
//     password:onlineUser.user.password,
//     userImageId:onlineUser.user.userImageId,
//     userDefaultImage:onlineUser.user.userDefaultImage,
// })
// let form = ref({
//     userName: onlineUser.user.userName,
//     password: onlineUser.user.password,
//     repeatPasword:onlineUser.user.password,
//     userDefaultHeadPhoto: onlineUser.user.userDefaultImage,
//     userImageId: onlineUser.user.userImageId
// })
// let defaultImages = [
//     'default_head_photo.jpg',
//     '1_1.png',
//     '2_1.png',
// ]






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