<template>
    <div class="baseCom" :style="toStyle(comData)" :class="animationClasses">
        <slot>
            <!-- <div :style="toStyle(comData)"></div> -->
        </slot>
    </div>
</template>
<script lang='ts'>
    export default
        {
            name: "Obstacle"
        }
</script>
<script lang='ts' setup>
    import { ref, inject,type Ref } from "vue";
    import { cloneDeep } from 'lodash';
    import { toSizeStyle, toStyle } from "@/hooks/useBaseCom";
    import { useComponentRef } from "@/hooks/useComponentRef";
    import type { Enemy, GameConfig } from "@/types";
    //组件初始化属性（位置，判定区，显示图片等)
    let { comData, comDataDefault } = defineProps<{ comData: Enemy, comDataDefault: Enemy }>();
    //组件动画类
    let animationClasses = ref({
        fire_loop: true,
    })
    //组件动画默认配置（重置时使用）
    let animationClassesDefault = cloneDeep(animationClasses.value);
    //游戏总配置项
    let gameConfig = inject<Ref<GameConfig>>("gameConfig") as Ref<GameConfig>;

    /**
     * 实现组件独有逻辑，封装为方法
     */

    //障碍角色移动方法
    function enemyMove() {
        console.log("enemyMove")
        const intervalTime = 20; // 每0.05秒执行一次
        //当前速度
        let s: number = comData.speed as number;

        comData.isActive = true;
        if (comData.isActive && !gameConfig.value.isGameover) {

            let id = setInterval(() => {
                // console.log(gameConfig)
                if (gameConfig.value.isGameover) {
                    clearInterval(id);
                    return;
                }
                if (comData.left + comData.width >= 0) {
                    comData.left -= s * intervalTime / 1000
                    comData.hitbox_left -= s * intervalTime / 1000
                    // console.log('enemyHit',comData.hitbox_left)

                } else {
                    Object.assign(comData, comDataDefault);
                    // comData=enemyDataDefault;
                    gameConfig.value.score += 10
                    // clearInterval(id);
                    // return;
                }
            }, intervalTime)
        }
    }

    //障碍角色刷新方法
    function enemyInit() {

    }


    //组件重置
    function reset() {
        Object.assign(animationClasses.value, animationClassesDefault)
        // animationClasses.value.player_gameover = false;
    }
    defineExpose({
        reset,
        enemyMove,
    })

</script>
<style scoped>
    .baseCom {
        position: absolute;
    }

    .fire_loop {
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

    }
</style>