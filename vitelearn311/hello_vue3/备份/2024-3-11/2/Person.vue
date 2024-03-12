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

<script>
    // js/ts
    export default{
        name:'Person',
        setup(){
            let name='张三';
            let age =120;
            let tel=123123123;
            // return {
            //     name:name,
            //     age:age
            // };
            //vue3，数据key，value相同时可省略key

            //方法
            function changeName(){
                name = 'zhangsan';
                console.log(name);
            }
            function changeAge(){
                age= 123;
                console.log(age);
            }
            return{name,age,changeName,changeAge};
            
            //此时的name,age为非响应式数据，修改name并不会改变前端界面展示的内容
        }
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