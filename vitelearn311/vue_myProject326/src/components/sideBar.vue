<template>
    <div class="sideBar" style="background-color: #2F4050">
        <nav class="navbar-default navbar-static-side" role="navigation" >
            <div class="sidebar-collapse" >
                <ul class="nav metismenu" id="side-menu" style="background-color: #2F4050;">
                    <li class="nav-header">
                        <div class="dropdown profile-element">
                            <img alt="image" class="rounded-circle" :src="getImage('img/small.jpg')">
                            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="block m-t-xs font-bold">{{ user.userName }}</span>
                                <span class="text-muted text-xs block">Art Director <b class="caret"></b></span>
                            </a>
                            <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><a class="dropdown-item" href="#">Contacts</a></li>
                                <li><a class="dropdown-item" href="#">Mailbox</a></li>
                                <li class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Logout</a></li>
                            </ul>
                        </div>
                        <div class="logo-element">
                            IN+
                        </div>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-th-large"></i> <span class="nav-label">Dashboards</span>
                            <span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" aria-expanded="false">
                            <li><a href="#">Dashboard v.1</a></li>
                            <li><a href="#">Dashboard v.2</a></li>
                            <li><a href="#">Dashboard v.3</a></li>
                            <li><a href="#">Dashboard v.4</a></li>
                            <li><a href="#">Dashboard v.5 </a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-diamond"></i> <span class="nav-label">Layouts</span></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-bar-chart-o"></i> <span class="nav-label">Graphs</span><span
                                class="fa arrow"></span></a>
                        <ul class="nav nav-second-level collapse" aria-expanded="false">
                            <li><a href="#">Flot Charts</a></li>
                            <li><a href="#">Morris.js Charts</a></li>
                            <li><a href="#">Rickshaw Charts</a></li>
                            <li><a href="#">Chart.js</a></li>
                            <li><a href="#">Chartist</a></li>
                            <li><a href="#">c3 charts</a></li>
                            <li><a href="#">Peity Charts</a></li>
                            <li><a href="#">Sparkline Charts</a></li>
                        </ul>
                    </li>


                </ul>

            </div>
        </nav>
    </div>

</template>
<script lang='ts'>
export default
{
    name: "sideBar"
}
</script>
<script lang='ts' setup>
import { useRouter, RouterLink } from 'vue-router';
import { type UserInter } from '@/types/UserType'
import { getImage } from '@/utils/commonUtils';

let user = JSON.parse(sessionStorage.getItem("userInfo") as string) as UserInter || {}
let router = useRouter();
</script>
<style scoped>

</style>