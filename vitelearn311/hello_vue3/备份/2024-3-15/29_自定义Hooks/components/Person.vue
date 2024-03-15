<template>
    <!-- html -->
    <div class="person">
        <div> sum:{{ sum }} bigsum:{{ bigSum }}</div>
        <button @click="addSum"> sum+1</button> 
        <h2> 狗子图</h2>
        <img v-for="(dog,index) in dogList" :key="index" :src="dog">
  </div>
  <button @click="anotherDog"> 再来一只</button>

</template>



<script lang="ts" >
    // js/ts
    export default
    {
        name:'Person'
    }
</script>


<script lang="ts" setup>

    import { ref,reactive} from 'vue'
    import axios from 'axios'
    import useDog from '@/hooks/useDog'
    import useSum from '@/hooks/useSum'

    let {anotherDog,dogList} = useDog()
    let {sum,addSum,bigSum} =useSum()




</script>

<style>
    /* 样式 */
    .person {
        background-color: #ddd;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px; 
    }
    button{
        margin: 0 5px;
    }
    li {
        font-size: 20px;
    }
    img {
        height: 100px;
        margin-right: 10px;
    }

</style>