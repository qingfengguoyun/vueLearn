<template>
    <div class="loginPage">
        <!-- <h2>This is loginPage</h2>
        <p><label>用户</label><input v-model="user.userName"></p>
        <p><label>密码</label><input v-model="user.password"></p>
        <el-button @click="login">登录</el-button>
        <el-button @click="signUp">注册</el-button> -->
        <div class="loginColumns animated fadeInDown">
            <div class="row">
                <div class="col-md-6">
                    <h2 class="font-bold">欢迎访问个人聊天室</h2>
                    <h2 class="font-bold">登录界面</h2>
                    <p>
                        2024-5-30
                    </p>

                </div>
                <div class="col-md-6">
                    <div class="ibox-content">

                        <div class="form-group">
                            <el-input placeholder="Username" v-model="user.userName"  clearable size="large"/>
                            <!-- <input class="form-control" placeholder="Username" required="true" v-model="user.userName"> -->
                        </div>
                        <div class="form-group"> 
                            <el-input type="password" placeholder="Password" 
                                v-model="user.password" clearable size="large"/>
                            <!-- <input type="password" class="form-control" placeholder="Password" required="true"
                                v-model="user.password"> -->
                        </div>
                        <button class="btn btn-primary block full-width m-b" @click="login">登录</button>

                        <a href="#">
                            <small>忘记密码</small>
                        </a>

                        <p class="text-muted text-center">
                            <small>没有注册？</small>
                        </p>
                        <a class="btn btn-sm btn-white btn-block" @click="signUp">前往注册</a>

                        <p class="m-t">
                            <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script lang='ts'>
export default
    {
        name: "LoginPage"
    }
</script>
<script lang='ts' setup>

import { ref, reactive,type Ref  } from "vue";
import { type UserInter, UserClass } from "@/types/UserType";
import type { ResultInter } from "@/types/ResultType";
import axios, { type AxiosResponse, type AxiosResponseHeaders } from "axios";
import { useRouter, RouterLink, RouterView } from "vue-router";
import useSocketIo from '@/hooks/socketIo';
import { postRequest } from "@/utils/axiosUtils";
import { ElMessage } from "element-plus";
import { useOnlineUser } from "@/store/onlineUser";
import type { User } from "@/types";



let router = useRouter();
let socketIo = useSocketIo();

let user: Ref<User> = ref({})
let onlineUser = useOnlineUser();

const baseIP = import.meta.env.BASE_IP;

async function login() {
    console.log("用户", user.value.userName, "尝试登录")
    // let res:AxiosResponse= await axios.post( baseIP+":8200/api/user/login"||"http://localhost:8200/api/user/login",user);
    let res: AxiosResponse<ResultInter> = await postRequest("/api/user/login", user.value);
    console.log(res)
    let socket
    // console.log(res.data.code)
    // let res2:UserInter=res.data.data;
    // console.log(res2)
    if (res.data.code === 200) {
        console.log("res:", res.data.data)
        let u = res.data.data
        console.log("用户", user.value.userName, "登录成功")
        sessionStorage.setItem("userInfo", JSON.stringify(u))
        if (res.headers) {
            let token = (res.headers as any).get("authorization")
            console.log("authorization", token)
            sessionStorage.setItem("Authorization", token)
        }
        //初始化socket
        socket = socketIo.socketInstance(u.id as string, u.userName as string, u.password as string)
        //初始化chatCon
        // sessionStorage.setItem('chatCom','mainChatRoom')
        // 更新pinia仓库 onlineUser中的user信息
        // 以及重置showInfoUserId为当前登录对象
        onlineUser.user = u
        onlineUser.showInfoUserId = u.id!
        ElMessage({
            message: "欢迎用户：" + u.userName,
            type: "success"
        })
        if (u.userName == "admin") {
            router.push({
                name: "AdminPage",
            })
        } else {
            router.push({
                name: "FrontPage",
            })
        }

    }
    else {
        console.log("用户", user.value.userName, "登录失败", res.data.data)
        // alert("用户" + user.userName + "登录失败" + res.data.data)
        ElMessage({
            message: "用户登录失败：" + res.data.data,
            type: "error"
        })
    }


}

async function signUp() {
    // let res:ResultInter= await axios.post("localhost:8200/login",user);
    console.log("跳转至注册界面")
    router.push({
        path: "/signUp"
    })
    // console.log("用户",user.userName,"尝试注册")
}


</script>
<style scoped></style>