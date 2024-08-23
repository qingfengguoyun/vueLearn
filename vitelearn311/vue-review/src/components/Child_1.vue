<template>
    <div class="child">
        <button @click="increaseAge"> 子组件按钮-age增加</button>
        <button @click="changeData2"> 子组件按钮-changeData2</button>
        <div>
            <h2>{{ data1 }},{{ data2 }}</h2>
        </div>
        <div>
            <h2>props:{{ props.data1 }},{{ props.data2 }}</h2>
        </div>

        
    </div>

</template>
<script lang='ts'>
export default
{
    name: "Child_1"
}
</script>
<script lang='ts' setup>
import { defineEmits,ref } from 'vue';

    interface dataInter{
        
    }

    let emit=defineEmits(['getAge','increateAge'])
    // let {data1,data2}=defineProps(['data1','data2'])
    let props=defineProps(['data1','data2'])
    let data={
        name:"qwe",
        age:18,
    }

    let data1=ref(props.data1)
    let data2=ref(props.data2)

    let getAge=function(){
        emit("getAge",data.age);
    }
    let increaseAge=function(){
        data.age+=1;
        emit('increateAge',data.age)
    }
    function changeData2(){
        data2.value=0;
    }



</script>
<style scoped>
.child{
    background-color: #ddd;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

</style>