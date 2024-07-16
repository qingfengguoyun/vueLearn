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
            name: "Asteroid"
        }
</script>
<script lang='ts' setup>
    import { ref, inject, type Ref } from "vue";
    import { cloneDeep } from 'lodash';
    import { toSizeStyle, toStyle, validateHitbox } from "@/hooks/useBaseCom";
    import type { BaseCom, Enemy, GameConfig } from "@/types";
    import { getRamdomInit } from "@/hooks/useUtils";
    // 组件初始化属性（位置，判定区，显示图片等)
    let { baseCom } = defineProps<{ baseCom: Enemy }>();
    let comData = ref(baseCom)
    let comDataDefault = cloneDeep(comData.value);
    //组件动画类
    let animationClasses = ref({
        // fire_loop: true,
        asteroid_explode: false,
        asteroid_roll: true,
    })
    //组件动画默认配置（重置时使用）
    let animationClassesDefault = cloneDeep(animationClasses.value);
    //游戏总配置项
    let gameConfig = inject<Ref<GameConfig>>("gameConfig") as Ref<GameConfig>;
    let displayBoard = inject<BaseCom>("displayBoard") as BaseCom;

    // 组件各项内容（comData）初始化
    function comInit() {
        // 对组件各项内容（comData）进行初始化
        // comData.value.height=0;
        // ...

        // 组件默认值备份
        comDataDefault = cloneDeep(comData.value)
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

    function asteroidExplode() {
        // comData.value.displayImg      
        console.log("asteroidExplode")
        comData.value.isActive = false
        comData.value.display_img = "img/charactors/asteroid/Asteroid_1_explode.png"
        animationClasses.value.asteroid_roll = false;
        animationClasses.value.asteroid_explode = true;
        let id = setTimeout(() => {
            // comData.value.isActive=false;
            // animationClasses.value.asteroid_explode=false;
            // reset();
            randomReset()
        }, 400);
    }


    function asteroidMove() {
        let interval = 20
        let h_move = 'right';
        let h_speed = comData.value.speed;
        let id = setInterval(() => {
            if(gameConfig.value.isGameover){
                clearInterval(id);
            }

            if (comData.value.left >= displayBoard.width - comData.value.width && h_move == 'right') {
                console.log("left")
                h_speed = -comData.value.speed!;
                console.log('h_speed', h_speed)
                h_move = 'left'
            }
            if (comData.value.left <= 0 && h_move == 'left') {
                h_speed = comData.value.speed!;
                h_move = 'right'
            }
            if (comData.value.isActive) {
                comData.value.top += comData.value.speed! * interval / 1000;
                // comData.value.hitbox_top+=comData.value.speed!*interval/1000;
                comData.value.left += h_speed! * interval / 1000;
                validateHitbox(comData.value);
            }

        }, interval)
    }
    //随机初始化位置
    function randomReset() {
        reset();
        comData.value.top = -comData.value.height;
        comData.value.left = Math.random() * (displayBoard.width - comData.value.width);
        validateHitbox(comData.value)
        comData.value.speed = comDataDefault.speed! * 0.6 + (comDataDefault.speed! * 0.4) * Math.random()
        setTimeout(() => {
            comData.value.isActive = true
        }, Math.random() * 1000)
    }

    // 自定义逻辑结束

    //组件重置
    function reset() {
        Object.assign(animationClasses.value, animationClassesDefault)
        Object.assign(comData,comDataDefault)
        // animationClasses.value.player_gameover = false;
    }
    defineExpose({
        comData,
        reset,
        //自定义逻辑
        // move
        asteroidExplode,
        asteroidMove,
        randomReset,
    })

</script>
<style scoped>
    .baseCom {
        position: absolute;
        display: flex;
        justify-content: center;
        /* align-items: center; */
    }

    .asteroid_explode {
        animation-name: asteroid_explode;
        animation-duration: 0.5s;
        animation-iteration-count: 1;
        animation-timing-function: steps(8);
        animation-fill-mode: forwards;
    }

    @keyframes asteroid_explode {
        from {
            background-position: 0% 0px;
        }

        to {
            background-position: -800% 0px;
        }
    }

    .asteroid_roll {
        animation-name: asteroid_roll;
        animation-duration: 4s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    @keyframes asteroid_roll {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
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