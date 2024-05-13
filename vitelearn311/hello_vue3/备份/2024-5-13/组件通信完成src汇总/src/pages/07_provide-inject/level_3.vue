<template>
    <div class="parent">
        <h2>3层组件</h2>
        <h3>data:{{ level0_data }}</h3>
        <button @click="updateReceive('level3')"> 传给level0数据 </button>
    </div>
</template>
<script lang='ts'>
export default
    {
        name:"level_3"
}
</script>
<script lang='ts' setup>
import { type Ref,ref,inject } from 'vue';
let {level0_data,updateData}=inject("dataContent",{level0_data:999,updateData:(param:any)=>{}})
let updateReceive=inject("updateReceive",(param:any)=>{})

</script>
<style scoped>
.parent{
    border: 2px solid black;
    margin: 3px
}
</style>