<template>
    <div class="scopeFather p-md-4">
        <h2>作用域插槽父组件</h2>
        <h3>具名插槽和作用域插槽联合使用：v-shot:插槽名="子组件传递prop"</h3>
        <ScopeChildren>
            <template v-slot:models="props">
            <ul>
                <li v-for="model in props.models">
                    {{ model }}
                </li>
            </ul>
        </template>
        </ScopeChildren>

    </div>

</template>
<script lang='ts'>
export default
{
    name: 'ScopeFather'
}
</script>
<script lang='ts' setup>
import ScopeChildren from './ScopeChildren.vue';



</script>
<style scoped>
    .scopeFather{
        border: 1px solid black;
        width: 100%;
    }
</style>