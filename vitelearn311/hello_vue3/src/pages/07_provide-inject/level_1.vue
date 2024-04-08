<template>
    <div class="parent">
        <h2>1层组件</h2>
        <level_2></level_2>
        
    </div>
</template>
<script lang='ts'>
export default
    {
        name:"level_1"
}
</script>
<script lang='ts' setup>
import level_2 from './level_2.vue';

</script>
<style scoped>
.parent{
    border: 2px solid black;
    margin: 3px
}
</style>