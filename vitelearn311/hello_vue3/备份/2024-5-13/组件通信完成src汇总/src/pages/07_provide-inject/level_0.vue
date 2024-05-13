<template>
    <div class="parent">
        <h2>最外层组件</h2>
        <h3>data:{{ level0_data }}</h3>
        <h3>reveive:{{ receive_data }}</h3>
        <level_1></level_1>
        
    </div>
</template>
<script lang='ts'>
export default
    {
        name:"level_0"
}
</script>
<script lang='ts' setup>
import level_1 from '@/pages/07_provide-inject/level_1.vue';
import { ref,reactive,type Ref,provide } from 'vue';
let receive_data=ref("接收子组件的数据");
let level0_data=ref(1);
function updateReceiveData(data:string){
    receive_data.value=data
}
function updateData(param:number){
    level0_data.value=param
}
// provide函数:参数两个，第一个为key，第二个为传递的对象(value)
//所有子组件可通过inject方法，根据键值对获取相应对象
// value可以为复数个对象乃至函数组成的对象
provide("dataContent",{level0_data,updateData})
provide("updateReceive",updateReceiveData)
</script>
<style scoped>
.parent{
    border: 2px solid black;
    margin: 3px
}

</style>