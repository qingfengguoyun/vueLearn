<template>
    <div class="baseCom" :style="toStyle(comData)" :class="animationClasses" v-if="comData.isActive">
        <slot>
            <!-- <div :style="toStyle(comData)"></div> -->
        </slot>
    </div>
</template>
<script lang='ts'>
    export default
        {
            name: "BaseCom"
        }
</script>
<script lang='ts' setup>
    import { ref, inject, type Ref } from "vue";
    import { cloneDeep } from 'lodash';
    import { toSizeStyle, toStyle } from "@/hooks/game/useBaseCom";
    import type { BaseCom, Enemy, GameConfig } from "@/types/game";
    import { getRamdomInit } from "@/hooks/game/useUtils";
    // 组件初始化属性（位置，判定区，显示图片等)
    let { baseCom} = defineProps<{ baseCom: BaseCom }>();
    let comData=ref(baseCom)
    let comDataDefault=cloneDeep(comData)
    //组件动画类
    let animationClasses = ref({
        // fire_loop: true,
    })
    //组件动画默认配置（重置时使用）
    let animationClassesDefault = cloneDeep(animationClasses.value);
    //游戏总配置项
    let gameConfig = inject<Ref<GameConfig>>("gameConfig") as Ref<GameConfig>;
    // 组件各项内容（comData）初始化
    
    function comInit() {
        // 对组件各项内容（comData）进行初始化
        comData.value.display_img="img/charactors/dino/stand.gif"
        comData.value.isActive=true;
        // 组件默认值备份
        comDataDefault=cloneDeep(comData)
    }
    // 组件初始化
    comInit()


    // 实现组件自定义逻辑，封装为方法(例如移动，各种动作,动画等)

    // function move(){
    //     let id=setInterval(()=>{
    //         comData.left+=1;
    //         comData.hitbox_left+=1;
    //     },50);
    // }  

    // 自定义逻辑结束

    //组件重置
    function reset() {
        Object.assign(animationClasses.value, animationClassesDefault)
        comData.value.isActive=true;
        // animationClasses.value.player_gameover = false;
    }
    defineExpose({
        comData,
        reset,
        //自定义逻辑
        // move
    })

</script>
<style scoped>
    .baseCom {
        position: absolute;
    }

    /* .fire_loop {
        animation-name: fire_loop;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: steps(8);
    }

    @keyframes fire_loop {

        from {
            background-position: 0% 0px;
        }

        to {
            background-position: 800% 0px;
        }

    } */
</style>