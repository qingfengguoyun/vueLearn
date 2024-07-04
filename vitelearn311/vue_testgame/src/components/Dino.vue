<template>

    <div class="dino" :style="toSizeStyle(comData)" :class="playerClass">
        <slot>
            <div :style="toStyle(comData)"></div>
        </slot>
    </div>
</template>

<script lang="ts">
export default {
    name: "Dino",
};
</script>

<script setup lang="ts">
import { toSizeStyle, toStyle } from "@/hooks/useBaseCom";
import { useComponentRef } from "@/hooks/useComponentRef";
import type { BaseCom, GameConfig, Player } from "@/types";
import { computed, onMounted, ref, watchEffect } from "vue";

let baseComponent = useComponentRef(HTMLElement);
let { comData, comDataDefault, gameConfig } = defineProps<{ comData: Player, comDataDefault: Player, gameConfig: GameConfig }>();


let playerClass = ref({
    player_gameover: false
})

let hurt_animation = [
    'img/charactors/dino/hurt_1.png',
    // 'img/charactors/dino/hurt_2.png',
    'img/charactors/dino/hurt_3.png'
]

// 玩家阵亡动画
function playerDead() {
    console.log('playerDead')
    playerClass.value.player_gameover = true;
    // setTimeout(() => {
    //     playerClass.value.player_gameover = false;
    // }, 2000);
    let index = 0
    let id = setInterval(() => {
        comData.display_img = hurt_animation[index]
        index += 1;
        if (index >= hurt_animation.length) {
            clearInterval(id);
            return;
        }
    }, 100)

}
//玩家角色跳跃方法
function playerJump() {
    const intervalTime = 20; // 每0.05秒修改一次位置
    const totalTime = 800; // 跳跃总耗时
    let currentTime = 0;
    //加速度
    let gravity = (comData.speed) as number / (totalTime / 1000 / 2);
    console.log('gravity', gravity)
    //当前速度
    let s: number = comData.speed as number;
    if (!comData.isActive && !gameConfig.isGameover) {
        //isPause=true：禁止操作
        comData.isActive = true
        let id = setInterval(() => {
            //如果gameover则保持玩家当前位置，并结束定时任务
            if (gameConfig.isGameover) {
                clearInterval(id);
                return;
            }
            let s1 = s - intervalTime * gravity / 1000;
            let avgSpeed = (s1 + s) / 2
            // 显示和受击框位置变化
            comData.top -= avgSpeed * intervalTime / 1000;
            comData.hitbox_top -= avgSpeed * intervalTime / 1000;
            currentTime += intervalTime;
            // console.log("top", comData.value.top)
            s = s1;
            if (currentTime >= (totalTime - intervalTime) || comData.hitbox_top > comDataDefault.hitbox_top) {
                //还原玩家角色位置
                Object.assign(comData, comDataDefault);
                // comData.value=comDataDefault;
                //解除禁止操作
                comData.isActive = false;
                clearInterval(id);
                return;
            }
        }, intervalTime)
    }
}
//组件重置
function reset(){
    playerClass.value.player_gameover=false;
}

defineExpose ({
    playerJump,
    playerDead,
    reset,
})
</script>

<style scoped>
.dino {
    position: absolute;
}

.player_gameover {
    animation-name: player_gameover;
    animation-duration: 2s;
    animation-fill-mode: forwards;
}


@keyframes player_gameover {
    0% {}

    10% {
        transform: translateY(0px);
    }

    30% {
        transform: translateY(-50px);
    }

    /* 最后一帧 */
    100% {
        transform: translateY(400px);

    }
}
</style>
