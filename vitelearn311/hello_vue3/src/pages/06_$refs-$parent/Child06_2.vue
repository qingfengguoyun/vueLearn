<template>
    <div class="child">
        <h2>子组件2</h2>
        <p>孩子2的手办：
            <span v-for="(model,index) in cModels" :key="index">
                <li>{{ model }}</li>
            </span>
        </p>
        <button @click="getModelFromParent($parent)">抢父亲的一个手办</button>
        
    </div>
</template>
<script lang='ts'>
export default
{
    name: "Child06_2"
}
</script>
<script lang='ts' setup>
import { type Ref,ref } from 'vue';
    let cModels:Ref<string[]>=ref([]);
    function getModelFromParent(ins:any){
        try {
            let model=(ins.models as string[]).pop()
            if(model != undefined){
                cModels.value.push(<string>model)
            }           
        } catch (error) {
            
        }
        
    }
    defineExpose({
        cModels
    })
</script>
<style scoped>
.child{
    border: 2px solid black;
}
</style>