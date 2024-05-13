<template>
    <div class="scopeFather p-md-4">
        <h2>作用域插槽:父组件</h2>
        <h4>**作用域插槽：当数据在子组件时，使用作用域插槽(v-shot="data")接收子组件prop的数据</h4>
        <h4>**具名插槽和作用域插槽联合使用：v-shot:插槽名="子组件传递prop"</h4>
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