<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <!-- <h1>1, watch监视【ref】定义的【基本类型】数据</h1>
        <h2>当前求和为：{{ sum }}</h2>
        <button @click="changeSum">点击+1</button> -->

        <br>
        <h2>水温：{{ cage.temp }}</h2>
        <h2>水位：{{ cage.height }}</h2>
        <button @click="addTemp">加温</button>
        <button @click="addHeight">加水位</button>

        
        

        
    </div>
</template>



<script lang="ts" >
    // js/ts
    export default
    {
        name:'Person'
    }
</script>


<script lang="ts" setup>
    import { ref, toRefs, watch,reactive,watchEffect} from 'vue';
    import PersonClass from './utils/person.ts';
    import WaterCage from "./utils/WaterCage.ts";
    let cage=ref(new WaterCage(10,0));

    function addTemp(){
        cage.value.temp+=10;
    }

    function addHeight(){
        cage.value.height+=1
    }
    // watch([()=>cage.value.temp,()=>cage.value.height],(value)=>{
    //     console.log(value);
    //     if(cage.value.temp>=50||cage.value.height>=5){
    //         console.log("发送请求");
    //     }
    // })

    //watchEffect不需要指明监视对象，在回调函数中自动查找对象（因此回调函数没有参数）
    watchEffect(()=>{
        console.log(cage.value)
        if(cage.value.temp>=50||cage.value.height>=5){
            console.log("发送请求");
        }
    })
    // let person=ref(new PersonClass("zhang",18,[1,2,3]))
    // let {name,age}=toRefs(person.value);



</script>

<style>
    /* 样式 */
    .person {
        background-color: #ddd;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px; 
    }
</style>@/components/utils/person.js./utils/person.js