<template>
    <button @click="click">测试按钮组件</button>

</template>
<script lang='ts'>
    export default
        {
            name: 'TestBtn'
        }
</script>
<script lang='ts' setup>

    function click() {
        console.log("click")
    }
</script>
<style scoped></style>