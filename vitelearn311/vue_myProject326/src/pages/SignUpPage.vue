<template>
    <!-- <div class="signUpPage">
        <h2> This is singUpPage</h2>
        <p><label>用户</label><input v-model="user.userName"></p>
        <p><label>密码</label><input v-model="user.password"></p>
        <el-button @click="signUpUser">注册</el-button>
        <el-button @click="backToLogin">返回登录</el-button>
    </div> -->
    <div class="signUpPage">
        <div class="loginColumns animated fadeInDown">
            <div class="row">
                <div class="col-md-6">
                    <h2 class="font-bold">欢迎访问个人聊天室</h2>
                    <h2 class="font-bold">注册界面</h2>
                    <p>
                        //注册界面
                    </p>

                </div>
                <div class="col-md-6">
                    <div class="ibox-content">

                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Name" required="true"
                                    v-model="user.userName">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="Password" required="true"
                                    v-model="user.password">
                            </div>
                            <!-- <div class="form-group">
                                <div class="checkbox i-checks"><label class="">
                                        <div class="icheckbox_square-green" style="position: relative;"><input
                                                type="checkbox" style="position: absolute; opacity: 0;"><ins
                                                class="iCheck-helper"
                                                style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                        </div><i></i> Agree the terms and policy
                                    </label></div>
                            </div> -->
                            <!-- <button class="btn btn-primary block full-width m-b" @click="signUpUser">注册</button> -->
                            <el-button type="primary" :loading="isSigning" @click="handleSignUp()" class=" full-width m-b">注册</el-button>
                            <p class="text-muted text-center"><small>已有账号？</small></p>
                            <a class="btn btn-sm btn-white btn-block" @click="backToLogin">登录</a>

                        <p class="m-t"> <small>Inspinia we app framework base on Bootstrap 3 © 2014</small> </p>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>
<script lang='ts'>
export default
    {
        name: "SingUpPage"
    }
</script>
<script lang='ts' setup>

import { ref, reactive, type Ref } from "vue";
import { type UserInter } from "@/types/UserType";
import { type ResultInter } from "@/types/ResultType";
import { useRouter, type Router } from "vue-router"
import axios, { type AxiosResponse } from "axios";
import { requestPrefix } from "@/utils/commonUtils";
import { ElMessage } from "element-plus";

let router: Router = useRouter()

let user: UserInter = reactive({})

function backToLogin() {
    router.replace({
        path: "/login"
    })
}

const baseIP = import.meta.env.BASE_IP;

let isSigning=false;
let handleSignUp=function(){
    isSigning=true;
    signUpUser().then((res)=>{
        isSigning=false;
    })
}

async function signUpUser() {
    let res: AxiosResponse<ResultInter> = await axios.post(requestPrefix+"/api/user/sign" || "http://localhost:8200/api/user/sign", user);
    if (res.data.code == 200) {
        console.log(res.data.data)
        let newUser = res.data.data as UserInter
        ElMessage({
            message:"欢迎新用户：" + newUser.userName + " 三秒后返回登录页面",
            type:'success',
            plain:true,
        })
        // alert("欢迎新用户：" + newUser.userName + " 三秒后返回登录页面")
        setTimeout(() => {
            router.replace({
                name: "LoginPage"
            });
        }, 3000)
    } else {
        ElMessage({
            message:"注册失败： "+res.data.data ,
            type:'error',
            plain:true,
        })
        console.log(res.data.data)
    }
}

</script>
<style scoped></style>