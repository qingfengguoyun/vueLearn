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
                <el-col :span="4" class="w-200 m-l-md" style="display: flex; align-items: center;" v-if="changeForm.repeatPassword!=changeForm.password">
                    <span style="color: red; ">两次密码输入不一致</span>
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
                    list-type="picture" :auto-upload="false" drag :limit="1" ref="uploadRef" :on-exceed="handleExceed" >
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
                <el-button type="primary" round class="m-r-md"  v-on:click="commonStore.toUserInfo()">
                    取消</el-button>
            </div>
            <div>
                <el-button type="primary" round  @click="updateUserInfo()"> 保存 </el-button>
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
import { type Ref, ref, toRaw, watch,computed } from 'vue';
import { useOnlineUser } from '@/store/onlineUser';
import UserInfo from '@/components/UserInfo.vue';
import { getImage, getImageById, getProfilePhotoById } from '@/utils/commonUtils';
import type { User } from '@/types';
import useUserInfoChange from'@/hooks/useUserInfoChange';
import { useCommonStore } from '@/store/commonStore';
import { type UploadInstance, type UploadUserFile,type UploadRawFile,type UploadProps ,genFileId, ElMessage} from 'element-plus';
import { fileUploadRequest, postRequest } from '@/utils/axiosUtils';
import type { ResultInter } from '@/types/ResultType';
import type { UserVo } from '@/types';

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
let uploadRef=ref<UploadInstance>()

let newHeadPhotoUrl=ref(onlineUser.user.userImageId!=null?getProfilePhotoById(onlineUser.user.userImageId):"img/"+(onlineUser.user.userDefaultImage || defaultImages[0]))

let changeDefalutImage = function (i: number) {
    selectedDefaultImage.value = i;
    newHeadPhotoUrl.value="img/"+defaultImages[i]
    changeForm.value.userDefaultImage="img/"+defaultImages[i]
}
let fileList:Ref<UploadUserFile[]> = ref([])
let isOnChange = ref(false);

// 当upload组件的文件数大于1个时，新文件替换旧文件
const handleExceed: UploadProps['onExceed'] = (files,fileList) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}
watch(fileList,()=>{
    if(fileList.value.length>=1){
        newHeadPhotoUrl.value=fileList.value[0].url!
        selectedDefaultImage.value=-1;
        return;
    }else{
        newHeadPhotoUrl.value=onlineUser.user.userImageId!=null?getProfilePhotoById(onlineUser.user.userImageId):"img/"+(onlineUser.user.userDefaultImage || defaultImages[0])
        return;
    }
})
//提交数据合理性验证，用于控制保存按钮的disable
let validate=function():boolean{
    let passwordValidate=changeForm.value.password==changeForm.value.repeatPassword
    return passwordValidate
}
let uploadNativeProfilePhoto=async function(){
    let fd = new FormData();
    console.log(fileList.value)
    // ts for( .. in ..)遍历的是下标 ，for(.. of ..) 遍历的是数组
    // 或者使用 list.foreach((var,index,array)=>{})
    for (let el of fileList.value) {
        console.log(el)
        fd.append("file", el.raw as UploadRawFile);
        // let imageRequestUrl=requestPrefix+'/api/file/uploadByBatch'
    }
    let res = await fileUploadRequest<ResultInter>("/api/user/uploadUserProfilePhoto",fd); 
    if (res.data) {
        console.log(res.data.data)
        if (res.data.code == '200') {
            uploadRef.value!.clearFiles()
            return res.data.data.id;
        }
    }
    return false;
}
// 更新用户信息
let updateUserInfo=async function(){
    if(!validate()){
        ElMessage({
            message:"请检查用户信息",
            type:"error"
        })
        return;
    }
    let u:User={
        id:onlineUser.user.id,
        userName:changeForm.value.userName,
        password:changeForm.value.password,
        userDefaultImage:selectedDefaultImage.value!=-1?defaultImages[selectedDefaultImage.value]:defaultImages[0],
    }
    //如果有自定义头像，则上传
    if(fileList.value.length>=1){
        let res=await uploadNativeProfilePhoto()
        if(res!=false){
            u.userImageId=res;
        }
        console.log("res",res)
    }
    console.log("userDefaultImage",u.userDefaultImage)
    if(selectedDefaultImage.value==-1 && u.userDefaultImage==null){
        u.userImageId=onlineUser.user.userImageId
    }    
    userInfo.updateUserInfo(u);
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