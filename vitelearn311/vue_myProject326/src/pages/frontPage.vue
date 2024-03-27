<template>
    <div >
        <el-container class="layout-container-demo">
            <el-header>Header</el-header>
            <el-container >
                <el-main>Main
                    <!-- <loginPage></loginPage> -->
                </el-main>
                <el-aside width="200px" style="height: 500px;">Aside</el-aside>
                
            </el-container>
        </el-container>
    </div>
</template>
<script lang='ts'>
export default
{
    name: "frontPage"
}
</script>
<script lang='ts' setup>
    import type router from '@/router';
    import { useRouter,RouterView} from 'vue-router'
    import loginPage from './loginPage.vue';



</script>
<style scoped>
.layout-container-demo .el-header {
  position: relative;
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