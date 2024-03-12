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

            console.log(this)//undifine
            
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
                name = 'zhangsan'; //这样修改name，界面不产生变化
                console.log(name);
            }
            function changeAge(){
                age= 123;
                console.log(age);
            }
            //将数据方法返回出去，template中才能使用
            // return{name:name,age:age,changeName:changeName,changeAge:changeAge};
            return{name,age,changeName,changeAge};        
            //此时的name,age为非响应式数据，修改name并不会改变前端界面展示的内容

            //setup的返回时也可为一个渲染函数
            // return function(){
            //     return '哈哈';
            // }
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