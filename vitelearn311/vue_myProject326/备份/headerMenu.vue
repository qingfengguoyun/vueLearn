<template>
    <div class="header-menu">
        <p> 欢迎用户：{{ user.userName }}</p>
        <el-button @click="signOut"> 退出登录 </el-button>
    </div>
</template>
<script lang='ts'>
export default
{
    name: "headerMenu"
}
</script>
<script lang='ts' setup>
    import { useRouter } from 'vue-router';
    import { type UserInter } from '@/types/UserType'

    let user=JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {}
    let router=useRouter();

    function signOut(){
        router.replace({
            name:"LoginPage"
        })
    }
    
</script>
<style scoped>
    .header-menu {
        position: relative;
        display: inline-flex;
    }
</style>