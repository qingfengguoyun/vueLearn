<template>
    <div class="signUpPage">
        <h2> This is singUpPage</h2>
        <p><label>用户</label><input v-model="user.userName"></p>
        <p><label>密码</label><input v-model="user.password"></p>
        <el-button @click="signUpUser">注册</el-button>
        <el-button @click="backToLogin">返回登录</el-button>
    </div>
    
</template>
<script lang='ts'>
export default
{
    name: "SingUpPage"
}
</script>
<script lang='ts' setup>

import { ref,reactive,type Ref } from "vue";
import { type UserInter } from "@/types/UserType";
import { type ResultInter } from "@/types/ResultType";
import {useRouter,type Router} from "vue-router"
import axios, { type AxiosResponse } from "axios";

let router:Router=useRouter()

let user:UserInter=reactive({})

function backToLogin(){
    router.replace({
        path:"/login"
    })
}

const baseIP = import.meta.env.BASE_IP;

async function signUpUser(){
    let res:AxiosResponse<ResultInter>=await axios.post( baseIP+":8200/api/user/sign"||"http://localhost:8200/api/user/sign",user);
    if(res.data.code==200){
        console.log(res.data.data)
        let newUser=res.data.data as UserInter
        alert("欢迎新用户："+newUser.userName+" 三秒后返回登录页面")
        setTimeout(()=>{
            router.replace({
                name:"loginPage"
            });
        },3000)
    }else{
        console.log(res.data.data)
    }
}

</script>
<style scoped>

</style>