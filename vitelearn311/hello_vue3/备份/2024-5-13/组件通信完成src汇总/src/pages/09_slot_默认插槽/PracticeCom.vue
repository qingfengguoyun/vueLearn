<template>
    <div class="practiceCom">
        <h2>子组件</h2>
    <div>
        <slot>默认内容</slot>
    </div>
    </div>
    

</template>
<script lang='ts'>
export default
{
    name: 'PracticeCom'
}
</script>
<script lang='ts' setup>

</script>
<style scoped>
.practiceCom{
    border: 1px solid black;
}
</style>