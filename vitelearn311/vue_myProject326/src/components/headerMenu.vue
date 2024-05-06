<template>
    <nav class="navbar navbar-static-top  " role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i
                    class="fa fa-bars"></i> </a>
            <form role="search" class="navbar-form-custom" action="search_results.html">
                <div class="form-group">
                    <input type="text" placeholder="Search for something..." class="form-control" name="top-search"
                        id="top-search">
                </div>
            </form>
        </div>
        <ul class="nav navbar-top-links navbar-right">
            <li>
                <span class="m-r-sm text-muted welcome-message">欢迎 {{ user.userName }}</span>
            </li>
            <!-- <li class="dropdown">
                <a class="dropdown-toggle count-info" data-toggle="dropdown" href="empty_page.html#">
                    <i class="fa fa-envelope"></i> <span class="label label-warning">16</span>
                </a>
            </li>
            <li class="dropdown">
                <a class="dropdown-toggle count-info" data-toggle="dropdown" href="empty_page.html#">
                    <i class="fa fa-bell"></i> <span class="label label-primary">8</span>
                </a>
            </li> -->


            <li>
                <a href="#" @click="logOut">
                    <i class="fa fa-sign-out" ></i> 退出登录
                </a>
            </li>
        </ul>

    </nav>
</template>
<script lang='ts'>
export default
    {
        name: "headerMenu"
    }
</script>
<script lang='ts' setup>
import { useRouter, RouterLink } from 'vue-router';
import { type UserInter } from '@/types/UserType'

let user = JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {}
let router = useRouter();


function logOut() {
    console.log("logout")
    router.replace({
        name: "LoginPage"
    })
}

</script>
<style scoped>
.header-menu {
    position: relative;
    display: inline-flex;
}
</style>