<template>
  <div class="app">
    <!-- <h1>hello world</h1> -->
    <!-- <login/> -->
    <!-- <Card/> -->
    obj:{{ obj }}
    <button @click="add()"> ++</button>
    {{ test }}
    <button @click="change()"> change</button>
    <button @click="change2()"> change2</button>

    {{ array }}
    <button @click="remove()"> remove</button>
    {{ num1 }}
  </div>
</template>

<script lang="ts">

  export default
    {
      name: 'App', //组件名
    }
</script>

<script lang="ts" setup>
  import login from '@/components/login.vue'
  import Card from '@/components/MyCard.vue'
  import { watch, ref, type Ref } from 'vue';
  let obj = ref({
    a: 1,
    b: 2
  })
  watch(() => {
    return obj.value.b
  }, (o, n) => {
    if (obj.value.a < 11) {
      console.log("qwe")
      obj.value.a += 1;

    }
    return;
  })

  function add() {
    obj.value.b += 1;
  }
  interface TestInterface {
    left: number,
    top: number,
    h_left: number,
    h_top: number,
  }

  function init(): TestInterface {
    let t: TestInterface = {
      left: 10,
      top: 20,
      get h_left() {
        return this.left + 5; // 计算属性
      },
      get h_top() {
        return this.top + 10; // 计算属性
      },
      set h_left(n: number) {
        this.h_left = n // 计算属性
      },
      set h_top(n: number) {
        this.h_top = n // 计算属性
      }
    }
    return t;
  }
  function change() {
    test.value.left += 5;
  }
  function change2() {
    test.value.h_left = 1220;
  }
  let test = ref(init());

  let array:Ref<any[]>=ref([]);
  for(let i=0;i<10;i++){
    let obj={
      num:i,
    }
    array.value.push(obj);
  }
  function remove(){
    array.value=array.value.filter(t=>{return t.num!=3});
  }
  // let id=setInterval(()=>{
  //   for(let data of array.value){
  //     data.num-=1;
  //   }
  // },3000)
  let num1=ref(0);
  function show1(){
    num1.value+=1;
    console.log(num1.value)
  }
  for(let i=0;i<10;i++){
    show1()
  }



</script>
<style>
  .app {
    background-color: #ddd;
    box-shadow: 0 0 10px;
    /* border-radius: 10px; */
    padding: 20px;
    width: 100%;
    height: 100%;
  }
</style>