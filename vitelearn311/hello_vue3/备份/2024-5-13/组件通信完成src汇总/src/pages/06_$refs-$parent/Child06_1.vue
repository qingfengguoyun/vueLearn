<template>
    <div class="child">
        <h2>子组件1</h2>
        <p>孩子1的手办：
            <span v-for="(model, index) in cModels" :key="index">
                <li>{{ model }}</li>
            </span>
        </p>
        <button @click="getModelFromParent($parent)">抢父亲的一个手办</button>

    </div>
</template>
<script lang='ts'>
export default
    {
        name: "Child06_1"
    }
</script>
<script lang='ts' setup>
import { type Ref, ref } from 'vue';
let cModels: Ref<string[]> = ref([]);
function getModelFromParent(ins: any) {
    console.log("done")
    console.log(ins)
    try {
        let model = (ins.models as string[]).pop()
        console.log(model)
        console.log("@@@" + cModels.value)
        if (model != undefined) {
            cModels.value.push(<string>model)
        }
    } catch (error) {
        console.log(error)
    }

}
defineExpose({
        cModels
    })

</script>
<style scoped>
.child {
    border: 2px solid black;
}
</style>