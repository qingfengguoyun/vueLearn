<template>
    <div class="loginPage" >
        <h2>This is loginPage</h2>
        <p><label>用户</label><input v-model="user.userName"></p>
        <p><label>密码</label><input v-model="user.password"></p>
        <button @click="login">登录</button>
        <button @click="signUp">注册</button>
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

    let router=useRouter();


    let user:UserInter=reactive({
        id:-1,
        userName:"",
        password:""
    })

    async function login(){
        // let res:ResultInter= await axios.post("localhost:8200/login",user);
        console.log("用户",user.userName,"尝试登录")
        console.log("用户",user.userName,"登录成功")
        router.push({
            name:"frontPage"
        })
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