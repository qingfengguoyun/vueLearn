<template>
    <div class="count">
        <h2> Count组件</h2>
        <h2>当前和为：{{ countStore.sum }}</h2>
        <!-- v-model-number 尽可能将值转化为数字 -->
        <select v-model.number="n">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="add">加</button>
        <button @click="minus">减</button>
    </div>

</template>
<script lang='ts'>
export default
{
    name:"Count"
}
</script>
<script lang='ts' setup>
    import {ref,watch} from "vue"
    import { useCountStore } from "@/store/Count";
    // let sum=ref<number>(1);
    let n=ref<number>(1)
    let countStore=useCountStore();

    /*
        特别注意:ref类型对象嵌套时，访问内部的ref类型数据的值不再需要.value
        例:
        let obj=ref({
        a:1,
        b:2,
        c:ref(3)
        })
        console.log(obj.value.c)
    */

    // 第一种方式：直接修改
    // function add(){
    //     countStore.sum +=n.value
    // }

    //第二种方式：$patch
    // countStore.$patch({
    //     sum:123
    // })
    function add(){
        countStore.addSum(n.value);
    }
    //第三种方法：action
    function minus(){
        countStore.minusSum(n.value);
    }


    watch(()=>{
        return n.value
    },function(newValue , oldValue){
        console.log("n:",n.value,"newValue:",newValue,"oldValue:",oldValue)
    })

</script>
<style scoped>
  .count {
    background-color: skyblue;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px;
  }
  select,button {
    margin: 0 5px;
    height: 25px;
  }
</style>