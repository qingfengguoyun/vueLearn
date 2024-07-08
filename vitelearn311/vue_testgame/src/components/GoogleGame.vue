<template>
    <div class="googleGame" :style="toSizeStyle(displayBoard)">
        <div class="border_background" :class="boardAnimateClass" :style="toSizeStyle(displayBoard)"
            @click="dino.playerJump">
            <!-- 游戏界面将显示在这里 -->
            <!-- <BaseComponent class="player" :class="playerClass" ref="player" :config="playerData" @click="playerJump">
                
                <div :style="toStyle(playerData)"></div>

            </BaseComponent> -->
            <Dino :baseCom="playerData" :gameConfig="gameConfig" ref="dino"></Dino>

            <Obstacle :baseCom="enemyData" :gameConfig="gameConfig" ref="obstacle"></Obstacle>

            <template v-for="(lifeData, index) in lifeDatas" :key="index">
                <Life :baseCom="lifeData" ref="lifes">

                </Life>
            </template>


            <!-- <BaseComponent ref="enemy" :config="enemyData" v-if="!(enemyData.left >= displayBoard.width)">

                <div class="fire_loop" :style="toStyle(enemyData)"></div>
            </BaseComponent> -->
        </div>
    </div>

    <el-button type="primary" @click="gameStart">开始</el-button>
    <h2 v-if="gameConfig.isGameover"> GameOver</h2>
    <h2>score:{{ gameConfig.score }}</h2>
</template>
<script lang='ts'>
    export default
        {
            name: 'GoogleGame'
        }
</script>
<script lang='ts' setup>
    import { onMounted, ref, watch, type Ref, reactive, provide } from 'vue';
    import BaseComponent from '@/components/BaseComponent.vue';
    import { ElMessage } from 'element-plus';
    import { useComponentRef } from '@/hooks/useComponentRef';
    import type { BaseCom, Enemy, GameConfig, HitBox, Player } from '@/types';
    import { initBaseCom, initEnemy, initPlayer, toSizeStyle, toStyle } from '@/hooks/useBaseCom';
    import { cloneDeep } from 'lodash';
    import Dino from '@/components/Dino.vue';
    import Obstacle from './Obstacle.vue';

    let gameConfig: Ref<GameConfig> = ref({
        isGameover: false,
        isPaused: false,
        score: 0,
        lifeRemain: 3,
    })
    provide('gameConfig', gameConfig)
    let displayBoard: Ref<BaseCom> = ref(initBaseCom(600, 300, 0, 0))
    let boardAnimateClass = ref({
        // border_background: true,
        border_background_move: false,
    })
    let ground = 270
    let dino = ref();

    let playerData: Player = initPlayer(40, 40, 50, ground - 40, 25, 25, 800, 'img/charactors/dino/walk.gif')
    // console.log(toStyle(playerData.value));
    let enemyData: Enemy = initEnemy(48, 64, 400, ground - 64, 30, 40, 200, 10, 'img/charactors/fire/burning_loop_1.png')
    let obstacle = ref();

    let lifeDatas: BaseCom[] = [initBaseCom(24, 24, 0, 0), initBaseCom(24, 24, 30, 0), initBaseCom(24, 24, 60, 0)]
    let lifes = ref()
    let lifeRemain = 3;

    //游戏初始化/重置方法
    function gameInit() {
        // isGameover.value = false;
        // score.value = 0;
        // 游戏总配置重置
        Object.assign(gameConfig.value, {
            isGameover: false,
            isPaused: false,
            score: 0,
            lifeRemain: 3,
        })
        //玩家角色重置
        // Object.assign(playerData.value, playerDataDefault);
        // 玩家组件（dino）重置
        dino.value.reset();
        //障碍物重置
        // Object.assign(enemyData.value, enemyDataDefault);
        obstacle.value.reset();
        for (let index in lifes.value) {
            lifes.value[index].reset()
        }
        // Object.assign(boardAnimateClass.value, {
        //     border_background_move:  gameConfig.value.isGameover,
        // })
    }
    function gameStart() {
        gameInit();
        obstacle.value.enemyMove();
        boardMove();
        gameOverCheck();
    }
    //背景开始移动
    function boardMove() {
        boardAnimateClass.value.border_background_move = true;
    }



    //判断BaseCom是否碰撞
    function isCollision(player: BaseCom, enemy: BaseCom): boolean {
        // 计算椭圆的半径
        const playerRadiusX = player.hitbox_width / 2;
        const playerRadiusY = player.hitbox_height / 2;
        const enemyRadiusX = enemy.hitbox_width / 2;
        const enemyRadiusY = enemy.hitbox_height / 2;

        // 计算半径之和
        const radiusSumX = playerRadiusX + enemyRadiusX;
        const radiusSumY = playerRadiusY + enemyRadiusY;

        // 计算椭圆的中心点
        const playerCenterX = player.hitbox_left + playerRadiusX;
        const playerCenterY = player.hitbox_top + playerRadiusY;
        const enemyCenterX = enemy.hitbox_left + enemyRadiusX;
        const enemyCenterY = enemy.hitbox_top + enemyRadiusY;

        // 计算椭圆之间的距离
        const dx = Math.abs(playerCenterX - enemyCenterX);
        const dy = Math.abs(playerCenterY - enemyCenterY);

        // 判断更精确的情况
        const distanceSquared = (dx * dx) / (radiusSumX * radiusSumX) + (dy * dy) / (radiusSumY * radiusSumY);

        return distanceSquared <= 1;

    }
    // 监听游戏是否结束
    function gameOverCheck() {
        let id = setInterval(() => {
            if (!gameConfig.value.isGameover) {
                if (isCollision(dino.value.comData, obstacle.value.comData)) {
                    gameConfig.value.lifeRemain! -= 1;
                    lifes.value[gameConfig.value.lifeRemain!].comData.isActive=false;
                    if (gameConfig.value.lifeRemain == 0) {
                        gameConfig.value.isGameover = true;
                    }
                }

                // console.log("continue")
            } else {
                // console.log(playerData.value,enemyData.value)
                gameConfig.value.isGameover = true;
                clearInterval(id);
                //播放玩家受伤动画
                dino.value.playerDead();
                boardAnimateClass.value.border_background_move = false;
                console.log("isgameover", gameConfig.value.isGameover)
                console.log("gameover")
                return;
            }
        }, 10)
    }




    onMounted(() => {

        // console.log('border:', border)
        // console.log('border classes:', border.value?.classList)
        // console.log('base1', base1)

    })



</script>
<style scoped>
    .googleGame {
        text-align: left;
        /* width: 600px;
        height: 300px; */
        /* border: 2px solid black; */
        position: relative;
        display: flex;
        overflow: hidden;
        border: 2px solid black;
        /* background-image: url('/img/background/background_1.png'); */
        /* background-repeat: repeat-x; */

    }

    .border_background {
        background-image: url('img/background/background_1.png');
    }

    .border_background_move {
        animation-name: border_background;
        animation-duration: 8s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    @keyframes border_background {
        0% {
            /* background-position: 0% 0px; */
        }

        100% {
            background-position: -600px 0px;
        }
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