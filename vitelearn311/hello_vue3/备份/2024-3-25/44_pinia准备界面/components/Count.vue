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
    import {ref,watch} from "vue"
    let sum=ref<number>(1);
    let n=ref<number>(1)

    function add(){
        sum.value +=n.value
    }
    function minus(){
        sum.value -=n.value
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