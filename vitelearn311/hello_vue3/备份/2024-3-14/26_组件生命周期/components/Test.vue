<template>
    <h2> This is Test template</h2>
</template>
<script lang="ts">
    export default
    {
        name:'Test'
    }

</script>
<script lang="ts" setup>

    import {defineExpose} from 'vue'
    let testData1="qwe"
    let testData2={
        a:1,
        b:2
    }
    defineExpose({testData1,testData2})



</script>
<style>

</style>