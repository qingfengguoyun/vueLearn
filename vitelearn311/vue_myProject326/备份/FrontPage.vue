<template>
    <div >
        <el-container class="layout-container-demo">
            <el-header direction="horizontal">
                <headerMenu></headerMenu>
            </el-header>
            <el-container >
                <el-main>Main
                    <!-- <loginPage></loginPage> -->
                    <mainChatRoom></mainChatRoom>
                    <!-- <test></test> -->
                </el-main>
                <el-aside width="200px" style="height: 500px;">
                  Aside
                  <onlineUser></onlineUser>
                </el-aside>
                
            </el-container>
        </el-container>
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
    import { useOnlineUser } from "@/store/onlineUser";
    


    let onlineUserStore=useOnlineUser()

    let user=onlineUserStore.user

</script>
<style scoped>
.layout-container-demo .el-header {
  position: relative;
  display: inline-flex;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 10px;
  border:2px solid black
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>