<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <h2>车牌：{{ car.brand }},车价：{{ car.price }}</h2>
        <!-- <button @click="changePrice">修改价格</button> -->
        <button @click="changeCar">修改车</button>
        <tr></tr>
        <h2>车牌2：{{ car2.brand }},车价2：{{ car2.price }}</h2>
        <!-- <button @click="changePrice">修改价格</button> -->
        <button @click="changeCar2">修改车2</button>
        <div v-for="g in games" v-bind:key="g.id">
            <li> {{ g.id }} ,{{ g.name }}</li>
        </div>
        <button @click="changeGame1Name">修改游戏名</button>
        
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
import { ref,reactive } from 'vue';

    let car=reactive({
        brand:"奔驰",
        price:100
    })
    let car2=ref({
        brand:"奔驰2",
        price:1000
    })
    function changeCar(){
        // car={
        //     brand:"宝马",
        //     price:90
        // }// 这种方式界面不会更新
        // car=reactive({
        //     brand:"宝马",
        //     price:90
        // })// 这种方式界面也不会更新
        Object.assign(car,{
            brand:"宝马",
            price:90
        })//这种方式可以更新，assign将后者的属性值依据名称，将值赋给了car中对应的同名属性
    }
    function changeCar2(){
        //使用ref定义响应式对象的情况下，可以对value直接赋值
        car2.value={
            brand:"宝马22",
            price:900
        }
    }
    let games=ref([
        {id:1,name:"game1"},
        {id:2,name:"game2"},
        {id:3,name:"game3"},
    ]);
    function changeGame1Name(){
        games.value[0].name+="1";
    };
    let sum=ref(0);
    function add(){
        sum.value+=1;
        sum.value 
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