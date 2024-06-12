<template>
    <div class="test">
        <h2>sum:{{ sum }}</h2>
        <h2>number:{{ number }}</h2>
        <button @click="add()"> add</button>
        <button @click="insert()">insert</button>
        <h2>{{ testArray }}</h2>
        

    </div>

</template>
<script lang='ts'>
export default
{
    name:"Test"
}
</script>
<script lang='ts' setup>
import useTest from '@/hooks/useTest';
let {sum,number,add,testArray,insert} =useTest()
</script>
<style scoped>
.test {
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}
</style>