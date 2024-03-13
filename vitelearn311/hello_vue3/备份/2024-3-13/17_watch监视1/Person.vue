<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <h1>1, watch监视【ref】定义的【基本类型】数据</h1>
        <h2>当前求和为：{{ sum }}</h2>
        <button @click="changeSum">点击+1</button>
        
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
    import { ref, watch} from 'vue';
    //数据
    let sum =ref(0)

    function changeSum(){
        sum.value+=1;
    }
    //监视 watch
    // watch(对象,回调函数)
    let stopwatch=watch(sum,function(newValue,oldValue){
        console.log("sum Changed");
        console.log("from",oldValue,"to",newValue);
        if(sum.value>5){
            console.log("stop watch");
            stopwatch();
        }
    })


</script>

<style>
    /* 样式 */
    .person {
        background-color: #ddd;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px; 
    }
</style>