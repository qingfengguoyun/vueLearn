<template>
    <!-- html -->
    <div class="person"> 
    <h1>{{ val }}</h1>
    <button @click="changeValue">修改value</button>

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


    import {onMounted,onUpdated,onBeforeUnmount, ref} from 'vue'

    let val=ref<string>("zhangsan");

    function changeValue(){
        // console.log("did")
        val.value+="~";
    }

    //常用生命周期函数
    //on(Before)Mounted,on(Before)Updated,on(Before)Unmount
    //实质为调用对应方法，执行函数
    onMounted(()=>{
    console.log("person组件挂载完成")
    })
    onUpdated(()=>{
    console.log("person组件更新完成")
    })
    onBeforeUnmount(()=>{
    console.log("person组件销毁前")
    })
    //


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