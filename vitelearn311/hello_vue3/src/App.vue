<template>
  <div>
    <h2>a:{{ a }}</h2>
    <h2>b:{{ b }}</h2>
  </div>
  <ChildCom ref="childComRef" :data="a"></ChildCom>
  <hr>
  <template v-for="(data, index) in arr" :key="data">
    <ChildCom ref="childComList" :data="data"></ChildCom>
  </template>
  <hr>
  <div style="width: 100px;height:100px; position:relative;border: 1px solid black;">
    <div style="width: 80px; height: 80px; top: 10px;left:10px; border: 1px solid black; position: absolute; display: flex; justify-content: center; align-items: center;">
      <h4 style="text-align: center;position: relative;">test</h4>
    </div>
  </div>
</template>

<script setup lang="ts" name="App">
  import { type Ref, ref, reactive, onMounted, inject, provide } from "vue";
  import { cloneDeep } from "lodash";
  import ChildCom from "./components/ChildCom.vue";
  import { useComponentArrayRef, useComponentRef } from './hooks/useComponentRef';
  import type { Config } from "./types";



  let a = reactive({
    a1: 1,
    a2: 2,
  });
  // let arr = reactive([
  //   { a: 1 },
  //   { b: 2 },
  //   { c: 3 }
  // ])
  let arr = ref([
    { a: 1 },
    { b: 2 },
    { c: 3 }
  ])
  let b = cloneDeep(a);
  let childComRef = useComponentRef(ChildCom);
  // let childComList=ref();
  let childComList = useComponentArrayRef(ChildCom)
  // childComList.value[0].show2()
  

  let config:Config=reactive({
    isOver:false,
  })

  provide("config",config);



  onMounted(() => {
    childComRef.value?.show();
    // childComList[1].value?.show();
    // console.log(Object.keys(childComList))
    console.log("ttwerwerw",childComList.value![0])
    // const ChildComList = useComponentRef<Array<typeof ChildCom>>([]);
  })


</script>

<style scoped></style>
