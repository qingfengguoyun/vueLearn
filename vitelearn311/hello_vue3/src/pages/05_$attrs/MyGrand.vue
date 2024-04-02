<template>
    <div class="grand">
        <h2>yeye组件</h2>
        <p>
        <h3>爷爷的age：</h3>{{ age }}</p>
        <MyParent :obj1="obj1" :obj2="obj2" :obj3="obj3" :objFun="objFun"></MyParent>
    </div>

</template>
<script lang='ts'>
export default
    {
        name: "MyGrand"
    }
</script>
<script lang='ts' setup>
import { ref, reactive, type Ref } from 'vue';
import MyParent from './MyParent.vue';

let age = ref(60);

let obj1: Ref<string> = ref("obj1")
let obj2: Ref<string> = ref("obj2")
let obj3: Ref<number> = ref(3)
let objFun = () => {
    age.value += 1
}

</script>

<style scoped>
.grand {
    border: 2px solid black;
}
</style>