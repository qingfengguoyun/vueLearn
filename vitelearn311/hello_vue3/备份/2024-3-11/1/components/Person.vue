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

    //OptionsAPI 选项式（配置项式），Vue2格式
    export default{
        name:'Person',
        data(){
            return{
                name:"张三",
                age:18,
                tel:"138888888"
            }
        },
        methods:{
            changeName(){
                this.name='zhang-san';
            },
            changeAge(){
                this.age=1;
            },
            showTel(){
                alert(this.tel);
            }
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