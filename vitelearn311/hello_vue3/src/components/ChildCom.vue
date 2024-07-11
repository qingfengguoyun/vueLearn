
<template>
    <div>
        data:{{ data }}
    </div>
    <div>
        config:{{ config }}
    </div>

</template>
<script lang='ts'>
    export default
        {
            name: "ChildCom"
        }
</script>
<script setup lang='ts'>
import { inject,type Ref,ref } from 'vue';
import type { Config } from '@/types';


    let config=inject<Config>("config");
    console.log(config?.isOver);

    function change(){
        config!.isOver=true;
    }
    let { data } = defineProps<{data: any}>();
    function show2(){
        console.log("123123");
    }
    function show() {
        console.log(data);
    }
    defineExpose({
        show2,
        data,
        show,
    })
    setTimeout(()=>{
        change()
    },2000)

</script>
<style scoped></style>