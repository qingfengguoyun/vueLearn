<template>
    <!-- html -->
    <div class="person">
        <h2>姓名：{{ name }}</h2>
        <h2>年龄：{{ age }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <!-- <h2>姓名：{{ name }}</h2> -->
        <button @click="showTel">查询联系方式</button>

        
    </div>
</template>



<script lang="ts" >
    // js/ts
    export default
    {
        name:'Person'
    }
</script>
<!-- setup 语法糖，在script标签中加入setup，可省略setup（）{}与return的步骤 -->
<script lang="ts" setup>
    let name='张三';
    let age =120;
    let tel=123123123;

    //方法
    function changeName(){
        name = 'zhangsan'; //这样修改name，界面不产生变化
        console.log(name);
    }
    function changeAge(){
        age= 123;
        console.log(age);
    }
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