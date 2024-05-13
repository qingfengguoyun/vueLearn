<template>
    <div class="scopeChildren" >
        <h2>作用域插槽子组件</h2>
        <slot name="models" :models="models">

        </slot>
    </div>
</template>
<script lang='ts'>
export default
{
    name: "ScopeChildren"
}
</script>
<script lang='ts' setup>
let models:String[]=[
    "埃吉尔手办",
    "柴郡手办",
    "天狼星手办"
]

</script>
<style scoped>
    .scopeChildren{
        border: 1px solid black;
        
    }

</style>