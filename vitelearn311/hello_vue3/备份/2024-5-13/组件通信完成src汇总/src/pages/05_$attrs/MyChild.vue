<template>
    <div class="child">
        <h2> Child</h2>
        <h3> 从yeye处收到的obj1：{{ props.obj1 }}</h3>
        <h3> 从yeye处收到的obj2：{{ props.obj2 }}</h3>
        <h3> 从yeye处收到的obj3：{{ props.obj3 }}</h3>
        <button @click="props.objFun"> 点击给yeye加一岁 </button>


    </div>

</template>
<script lang='ts'>
export default
{
    name: "MyChild"
}
</script>
<script lang='ts' setup>
import {ref, type Ref} from 'vue'

interface objInter{
    'obj1':any
    'obj2':any
    'obj3':any
    'objFun':Function
}


let props=defineProps<objInter>()
// let props=defineProps([
//     'obj1',
//     'obj2',
//     'obj3',
//     'objFun'
// ])
console.log(props)

</script>
<style scoped>
.child{
    border: 2px solid black;
}
</style>