<template>
    <div style="display: flex;">
        <!-- 侧边栏 -->
        <!-- <component :is="sideBarStore.isDisplay? SideBar: SideBarMini"></component> -->
        <SideBar v-if="sideBarStore.isDisplay"></SideBar>
        <SideBarMini v-if="!sideBarStore.isDisplay"></SideBarMini>

        <!-- 此处page-warpper使用了id选择器，style优先于class选择器的style生效，因此:class="frontPageMainClass() 修改无效 -->
        <!-- <div id="page-wrapper"  class="gray-bg" :class="frontPageMainClass()" > -->
        <div id="front-page-main"  class="gray-bg" :class="frontPageMainClass()" >

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
                <!-- vue动态组件，通过特殊的:is属性指定组件 -->
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
        name: "FrontPage"
    }
</script>
<script lang='ts' setup>
import { useRouter, RouterView } from 'vue-router'
import HeaderMenu from '@/components/HeaderMenu.vue'
import OnlineUser from '@/components/OnlineUser.vue'
import MainChatRoom from "@/components/MainChatRoom.vue";
import PrivateChatRoom from "@/components/PrivateChatRoom.vue";
import FileDownload from '@/components/FileDownload.vue';
import FileUpload from '@/components/FileUpload.vue';
import RightBottomWindow from '@/components/RightBottomWindow.vue';
import SideBar from '@/components/SideBar.vue';
import { ref, onMounted, type ComponentOptions, type Ref, provide } from 'vue';
import { type ComponentsMap } from '@/types'
import { useCommonStore } from '@/store/commonStore';
import { storeToRefs } from 'pinia';
import Gallary from '@/components/Gallary.vue';
import { useSideBar } from '@/store/sidebar';
import SideBarMini from '@/components/SideBarMini.vue';
import SubHeader from  '@/components/SubHeader.vue';
import UserInfo from '@/components/UserInfo.vue';
import UserInfoChange from '@/components/UserInfoChange.vue'
import DinoGame from "@/components/game/DinoGame.vue"

let sideBarStore=useSideBar();
let commonStore = useCommonStore();

let rbw = ref();
function testAnimate() {
    rbw.value.startAnimation()
}
// 这两种写法都无法使chatCon变为响应式数据，暂不清楚第二种方式失败的原因
// 只有storeToRefs()方法成功
// let chatCon=commonStore.chatCon
// let chatCon=ref(commonStore.chatCon)
let { mainCom } = storeToRefs(commonStore);
// 用于记录动态组件为哪个组件的map
let mainConList: ComponentsMap = {
    "mainChatRoom": MainChatRoom,
    "privateChatRoom": PrivateChatRoom,
    "gallary": Gallary,
    "fileDownload": FileDownload,
    "fileUpload": FileUpload,
    "userInfo" : UserInfo,
    "userInfoChange": UserInfoChange,
    "dinoGame": DinoGame,
}
// 如果mainCom记录的界面组件不在mainConList中，则重置为默认显示组件（第0位）
// 获取mainConList的全部key值组成的数组
let keys=Object.keys(mainConList)
if(!keys.includes(mainCom.value as string)){
    mainCom.value=keys[0]
}



//setup阶段，chatComponentRef=ref()还没有被赋值，在onMounted生命周期中才可获取值
let chatComponentRef = ref();
onMounted(() => {
    // chatComponentRef.value确实获得了mainCharRoom的组件实例，但只能访问组件defineExpose的内容
    // console.log("chatComponent name",chatComponentRef.value)

})
let toPrivateChatRoom = commonStore.toPrivateChatRoom;
let toMainChatRoom = commonStore.toMainChatRoom;

//设置动态类别，使用匿名函数，然会对象，key为动态添加的类，value为布尔值，表示该类是否生效
let frontPageMainClass=()=>{
    return{
        'front-page-main':sideBarStore.isDisplay,
        'front-page-main-with-mini-sidebar':!sideBarStore.isDisplay
    }
}




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