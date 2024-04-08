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
// inject:inject通过类似map.getOrDefault的方式获取传递的数据，第一个参数为key，第二个参数为接收失败后的默认值，同时用于指定接收数据的类型
// 函数也有默认值：eg：updateData:(param:any)=>{}
let {level0_data,updateData}=inject("dataContent",{level0_data:999,updateData:(param:any)=>{}})
let updateReceive=inject("updateReceive",(param:any)=>{})

</script>
<style scoped>
.parent{
    border: 2px solid black;
    margin: 3px
}
</style>