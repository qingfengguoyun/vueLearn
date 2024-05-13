<template>
    <div class="parent">
        <h2>parent组件</h2>
        <MyChild v-bind="$attrs"></MyChild>
    </div>


</template>
<script lang='ts'>
export default
    {
        name: "MyParent"
    }
</script>
<script lang='ts' setup>
import MyChild from './MyChild.vue';

</script>
<style scoped>

.parent{
    border: 2px solid black;
}
</style>