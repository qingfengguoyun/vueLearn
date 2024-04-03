<template>
    <div class="onlineUser">
        <h2>在线用户</h2>
        <ul>
            <li v-for="user in userList" :key="user.id">
                {{ user.userName }}
            </li>
        </ul>
    </div>

</template>
<script lang='ts'>
export default
{
    name: "onlineUser"
}
</script>
<script lang='ts' setup>
    let userList=[
        {
            id:1,
            userName:"qwe",
            password:"123"
        },
        {
            id:2,
            userName:"asd",
            password:"123"
        },
        {
            id:3,
            userName:"zxc",
            password:"123"
        },
    ]


</script>
<style scoped>

</style>