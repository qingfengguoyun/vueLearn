<template>
    <div style="display: flex;">
        <sideBar></sideBar>

        <div id="page-wrapper"  class="gray-bg"  :style="sideBarStore.isDisplay?{}:{width:'100% '}">


            <!-- header -->
            <div class="row border-bottom">
                <headerMenu></headerMenu>
            </div>
            <div class="row wrapper border-bottom white-bg page-heading">
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
            </div>
            <!-- mainContent -->
            <div class="wrapper wrapper-content row">
                <!-- vue动态组件，通过特殊的:is属性指定组件 -->
                <component :is="mainConList[mainCom] || mainConList[0]" ref="chatComponentRef"></component>
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
import headerMenu from '@/components/headerMenu.vue'
import onlineUser from '@/components/onlineUser.vue'
import mainChatRoom from "@/components/mainChatRoom.vue";
import privateChatRoom from "@/components/privateChatRoom.vue";
import fileDownload from '@/components/fileDownload.vue';
import fileUpload from '@/components/fileUpload.vue';
import rightBottomWindow from '@/components/rightBottomWindow.vue';
import sideBar from '@/components/sideBar.vue';
import { ref, onMounted, type ComponentOptions, type Ref, provide } from 'vue';
import { type ComponentsMap } from '@/types'
import { useCommonStore } from '@/store/commonStore';
import { storeToRefs } from 'pinia';
import gallary from '@/components/gallary.vue';
import { useSideBar } from '@/store/sidebar';

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
    "mainChatRoom": mainChatRoom,
    "privateChatRoom": privateChatRoom,
    "gallary": gallary,
    "fileDownload": fileDownload,
    "fileUpload": fileUpload
}

//setup阶段，chatComponentRef=ref()还没有被赋值，在onMounted生命周期中才可获取值
let chatComponentRef = ref();
onMounted(() => {
    // chatComponentRef.value确实获得了mainCharRoom的组件实例，但只能访问组件defineExpose的内容
    // console.log("chatComponent name",chatComponentRef.value)

})
let toPrivateChatRoom = commonStore.toPrivateChatRoom;
let toMainChatRoom = commonStore.toMainChatRoom;




</script>
<style scoped></style>