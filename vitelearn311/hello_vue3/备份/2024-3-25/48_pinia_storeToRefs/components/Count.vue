<template>
    <div class="count">
        <h2> Count组件</h2>
        <h2>当前和为：{{ sum }}</h2>
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
    import {ref,watch,toRefs} from "vue"
    import { useCountStore } from "@/store/Count";
    import { storeToRefs} from "pinia"
    // let sum=ref<number>(1);
    let n=ref<number>(1)
    let countStore=useCountStore();

    // let {sum}=toRefs(countStore)
    //对于pinia的仓库（store），反解时需使用pinia提供的storeToRefs进行包裹，而不是通常的toRefs
    //使用toRefs不会报错，但会导致大量无效内容转化为ref（响应式）对象
    let {sum}=storeToRefs(countStore)
    console.log(storeToRefs(countStore))


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