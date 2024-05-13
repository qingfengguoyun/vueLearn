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
                        //描述
                    </p>

                </div>
                <div class="col-md-6">
                    <div class="ibox-content">

                        <div class="form-group">
                            <input class="form-control" placeholder="Username" required="true" v-model="user.userName">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Password" required="true"
                                v-model="user.password">
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

import { ref, reactive } from "vue";
import { type UserInter, UserClass } from "@/types/UserType";
import { type ResultInter } from "@/types/ResultType";
import axios, { type AxiosResponse, type AxiosResponseHeaders } from "axios";
import { useRouter, RouterLink, RouterView } from "vue-router";
import useSocketIo from '@/utils/socketIo';
import { postRequest } from "@/utils/axiosUtils";


let router = useRouter();
let socketIo=useSocketIo();

let user: UserInter = {}


const baseIP = import.meta.env.BASE_IP;

async function login() {
    console.log("用户", user.userName, "尝试登录")
    // let res:AxiosResponse= await axios.post( baseIP+":8200/api/user/login"||"http://localhost:8200/api/user/login",user);
    let res: AxiosResponse = await postRequest("/api/user/login", user);
    console.log(res)
    let socket
    // console.log(res.data.code)
    // let res2:UserInter=res.data.data;
    // console.log(res2)
    if (res.data.code === 200) {
        console.log("res:", res.data.data)
        user = res.data.data
        console.log("用户", user.userName, "登录成功")
        sessionStorage.setItem("userInfo", JSON.stringify(user))
        if (res.headers) {
            let token = (res.headers as any).get("authorization")
            console.log("authorization", token)
            sessionStorage.setItem("Authorization", token)
        }
        //初始化socket
        socket = socketIo.socketInstance(user.id as string, user.userName as string, user.password as string)
        //初始化chatCon
        // sessionStorage.setItem('chatCom','mainChatRoom')
        router.push({
            name: "FrontPage",
        })
    }
    else {
        console.log("用户", user.userName, "登录失败", res.data.data)
        alert("用户" + user.userName + "登录失败" + res.data.data)
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