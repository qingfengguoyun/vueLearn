<template>
    <div class="BaseComponent" ref="baseComponent" :style="toSizeStyle(config)">
        <slot></slot>
    </div>

</template>
<script lang='ts'>
    export default
        {
            name: 'BaseComponet'
        }
</script>
<script lang='ts' setup>
    import { toSizeStyle, toStyle } from '@/hooks/useBaseCom';
    import { useComponentRef } from '@/hooks/useComponentRef';
    import type { BaseCom } from '@/types';
    import { computed, onMounted, ref, watchEffect } from 'vue';

    let baseComponent = useComponentRef(HTMLElement)
    let { config } = defineProps<{ config: BaseCom }>()

    const decreaseAmount = 3;
    const intervalTime = 33; // 每0.02秒执行一次
    const totalTime = 2000; // 总共3秒，即3000毫秒
    let currentTime = 0;





    onMounted(() => {
        // console.log("baseComponent:", baseComponent.value?.classList)
        // console.log("baseComponent style:", baseComponent.value?.style['width'])
        // console.log("baseComponent getBoundingClientRect:", baseComponent.value?.getBoundingClientRect())
    })
    defineExpose({
        baseComponent,
    })

</script>
<style scoped>
    .BaseComponent {
        /* border: 1px solid black;
        background-color: skyblue; */
        /* border-radius: 50%; */
        position: absolute;


    }

    @keyframes move_left {
        from {}

        to {
            transform: translate(-900px)
        }
    }

</style>