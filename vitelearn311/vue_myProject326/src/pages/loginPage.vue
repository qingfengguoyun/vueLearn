<template>
    <div class="loginPage" >
        <h2>This is loginPage</h2>
        <p><label>用户</label><input v-model="user.userName"></p>
        <p><label>密码</label><input v-model="user.password"></p>
        <el-button @click="login">登录</el-button>
        <el-button @click="signUp">注册</el-button>
    </div>
</template>
<script lang='ts'>
export default
{
    name:"loginPage"
}
</script>
<script lang='ts' setup>

    import { ref,reactive } from "vue";
    import { type UserInter ,UserClass} from "@/types/UserType";
    import { type ResultInter }from "@/types/ResultType";
    import axios from "axios";
    import { useRouter,RouterLink,RouterView } from "vue-router";
    import {io} from 'socket.io-client'
    import {socketInstance} from '@/utils/socketIo';
import type { Socket } from "dgram";

    let router=useRouter();


    let user:UserInter=reactive({
        id:-1,
        userName:"",
        password:""
    })

    async function login(){
        console.log("用户",user.userName,"尝试登录")
        let res:ResultInter= await axios.post("http://localhost:8200/api/user/login",user);
        console.log(res)
        let socket
        // console.log(res.data.code)
        // let res2:UserInter=res.data.data;
        // console.log(res2)
        if(res.data.code===200){
            let {userId,userName,password}=res.data.data
            user.userName=userName;
            user.password=password;
            user.id=userId;
            console.log("用户",user.userName,"登录成功")
            sessionStorage.setItem("userInfo",JSON.stringify(user))
            socket=socketInstance(user.id as number,user.userName as string,user.password as string)
            router.push({
                name:"frontPage",
            })
        }
        else{
            console.log("用户",user.userName,"登录失败",res.data.data)
            alert("用户"+user.userName+"登录失败"+res.data.data)
        }
        
        
    }

    async function signUp(){
        // let res:ResultInter= await axios.post("localhost:8200/login",user);
        console.log("跳转至注册界面")
        router.push({
            path:"/signUp"
        })
        // console.log("用户",user.userName,"尝试注册")
    }
    

</script>
<style scoped>

</style>