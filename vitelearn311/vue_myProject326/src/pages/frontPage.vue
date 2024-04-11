<template>
    <div id="page-wrapper" class="gray-bg" style="width: 100%;">
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
                    <button type="button" class="btn btn-w-m btn-primary" @click="testAnimate()"><strong>testAnimate</strong></button>
                </div>
            </div>
        </div>
        <!-- mainContent -->
        <div class="wrapper wrapper-content row">
            <mainChatRoom></mainChatRoom>
            <onlineUser></onlineUser>
            
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

</template>

<script lang='ts'>
export default
{
    name: "FrontPage"
}
</script>
<script lang='ts' setup>
    import { useRouter,RouterView} from 'vue-router'
    import headerMenu from '@/components/headerMenu.vue'
    import onlineUser from '@/components/onlineUser.vue'
    import mainChatRoom from "@/components/mainChatRoom.vue";
    import test from "@/components/test.vue";
    import rightBottomWindow from '@/components/rightBottomWindow.vue';
    import { ref,onMounted } from 'vue';
    let rbw=ref();
    // onMounted(()=>{
    //     console.log(rbw.value);
    //     rbw.value.startAnimation()
    //     // startAnimation
    // })
    function testAnimate(){
        rbw.value.startAnimation()
    }
    





</script>
<style scoped>
</style>