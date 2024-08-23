<template>
    <div class="father">
        <Child_1 @increate-age="handleIntreaseAge" :data1="data1" :data2="data2"></Child_1>
        <div>
            <h2>父组件-监听子组件自定义事件-子组件信息{{ childParam }}</h2>
        </div>
        <button><h2 @click="changeData">修改数据</h2></button>

    </div>
    

</template>
<script lang='ts'>
export default
{
    name: "Father"
}
</script>
<script lang='ts' setup>

import Child_1 from './Child_1.vue';
import { type Ref,ref } from 'vue';

let data1='data1'
let data2=ref(2)

interface Param{
    name?:string,
    age?:number
}
let childParam:Ref<Param>=ref({})

let handleIntreaseAge=function(age:number){
    console.log("监听Child_1组件increateAge事件")
    childParam.value.age=age;
}

function changeData(){
    data2.value+=1;
    data1+='1';
}

</script>
<style scoped>

.father{
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

</style>