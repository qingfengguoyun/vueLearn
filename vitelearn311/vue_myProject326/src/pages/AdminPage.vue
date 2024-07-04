<template>
    <div style="display: flex;">
        <!-- 侧边栏 -->
        <!-- <component :is="sideBarStore.isDisplay? SideBar: SideBarMini"></component> -->
        <SideBar ></SideBar>

        <!-- 此处page-warpper使用了id选择器，style优先于class选择器的style生效，因此:class="frontPageMainClass() 修改无效 -->
        <!-- <div id="page-wrapper"  class="gray-bg" :class="frontPageMainClass()" > -->
        <div id="front-page-main"  class="gray-bg" :class="{'front-page-main':true}" >

            <!-- header -->
            <div class="row border-bottom">
                <HeaderMenu></HeaderMenu>
            </div>
            <!-- sub header -->
            <!-- <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-sm-4">
                    <h2>This is main title</h2>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a href="index.html">This is</a>
                        </li>
                        <li class="breadcrumb-item active">
                            <strong>Breadcrumb</strong>
                        </li>
                    </ol>
                </div>
                <div class="col-sm-8">
                    <div class="title-action">
                        <button type="button" class="btn btn-w-m btn-primary"
                            @click="testAnimate()"><strong>testAnimate</strong></button>
                    </div>
                    <div class="title-action">
                        <button type="button" class="btn btn-w-m btn-primary"
                            @click="toMainChatRoom()"><strong>backToMainChatRoom</strong></button>
                    </div>
                    <div>
                        {{ mainCom }}
                    </div>
                </div>
            </div> -->
            <SubHeader></SubHeader>
            <!-- mainContent -->
            <div class="wrapper wrapper-content row">
                <!-- vue动态组件，通过特殊的:is属性指定组件  -->
                <component :is="mainConList[mainCom as string] || Object.values(mainConList)[0]" ref="chatComponentRef"></component>
                <onlineUser v-if="commonStore.showOnlineUser"></onlineUser>

            </div>
            <!-- footer -->
            <div class="footer">
                <div class="float-right">
                    10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                    <strong>Copyright</strong> Example Company © 2014-2018
                </div>
            </div>
            <rightBottomWindow ref="rbw"></rightBottomWindow>
        </div>
    </div>
</template>
<script lang='ts'>
export default
{
    name: "AdminPage"
}
</script>

<script lang='ts' setup>

import { type ComponentsMap } from '@/types'
import { useCommonStore } from "@/store/commonStore";
import { storeToRefs } from 'pinia';
import SideBar from "@/components/SideBar.vue";
import UserInfo from '@/components/UserInfo.vue';
import UserInfoChange from '@/components/UserInfoChange.vue'
import AdminInfo from '../components/AdminInfo.vue';
import { onUnmounted } from 'vue';


let commonStore = useCommonStore();
let { mainCom } = storeToRefs(commonStore);
// mainCom.value="adminInfo"
// 用于记录动态组件为哪个组件的map
let mainConList: ComponentsMap = {
    "adminInfo": AdminInfo,
    "userInfo" : UserInfo,
    "userInfoChange": UserInfoChange,
}
// 如果mainCom记录的界面组件不在mainConList中，则重置为默认显示组件（第0位）
let keys=Object.keys(mainConList)
if(!keys.includes(mainCom.value as string)){
    mainCom.value=keys[0]
}

onUnmounted(()=>{
   
})
</script>


<style scoped>
#front-page-main{
    padding: 0 15px;
    position: relative !important;
    flex-shrink: 1;
    /* 最小高度为100vh，其中vh表示视口（viewport）高度，100vh表示视口高度的100% */
    min-height: 100vh
}
</style>