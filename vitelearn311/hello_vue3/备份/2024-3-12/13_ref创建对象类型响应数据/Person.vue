<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <h2>车牌：{{ car.brand }},车价：{{ car.price }}</h2>
        <button @click="changePrice">修改价格</button>
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
import { ref } from 'vue';

    let car=ref({
        brand:"奔驰",
        price:1000
    });
    console.log(car);
    function changePrice(){
        car.value.price+=10;
    }
    let games=ref([
        {id:1,name:"game1"},
        {id:2,name:"game2"},
        {id:3,name:"game3"},
    ]);
    function changeGame1Name(){
        games.value[0].name+="1";
    };
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