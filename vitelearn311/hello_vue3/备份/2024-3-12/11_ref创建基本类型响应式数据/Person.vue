<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
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

<script lang="ts" setup>
    //引入ref
    import { ref } from "vue";
    //创建ref对象（类似java的泛型）
    let name=ref('张三');
    let age =ref(120);
    let tel=123123123;

    console.log(1,name);
    console.log(2,age);
    console.log(tel);
    
    
    //方法
    function changeName(){
        //此时name为ref对象，value为其本来的值
        name.value = 'zhangsan'; 
        console.log(name);
    }
    function changeAge(){
        age.value+=1;
        console.log(age);
    }
    function showTel(){
        alert(tel);
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