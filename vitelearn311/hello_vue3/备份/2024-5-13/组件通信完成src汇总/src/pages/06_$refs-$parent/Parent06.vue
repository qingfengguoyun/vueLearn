<template>
    <div class="parent">
        <h2>父组件</h2>
        <p>父亲的手办：
            <span v-for="model in models" :key="model">
                <li>{{ model }}</li>
            </span>
        </p>
        <button @click="getFromAllChild($refs)"> 从每个孩子处抢一个手办</button>
        <p>数量：</p>
        <Child06_1 ref="c1"></Child06_1>
        <Child06_2 ref="c2"></Child06_2>
    </div>

</template>
<script lang='ts'>
export default
    {
        name: "Parent06"
    }
</script>
<script lang='ts' setup>
import Child06_1 from "@/pages/06_$refs-$parent/Child06_1.vue"
import Child06_2 from "@/pages/06_$refs-$parent/Child06_2.vue"
import { ref, reactive, type Ref } from "vue";

let models:Ref<string[]> = ref(["埃吉尔", "黛朵", "海王星"])
function getFromAllChild(childs:any){
    console.log("childs:",childs)
    for(let key in childs){
        console.log(key)
        console.log("@@@@!@#",childs[key])
        // cModel虽然是ref类型，但因为childs[key]本身为proxy对象，会自动调用.value。因此不需要手动.value访问真实对象
        let model=childs[key].cModels.pop()
        if(model != undefined){
            models.value.push(model);
        }
        
    }
}


defineExpose({
    models
})




</script>
<style scoped>
.parent {
    border: 2px solid black;
}
</style>