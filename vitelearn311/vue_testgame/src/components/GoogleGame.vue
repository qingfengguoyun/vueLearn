<template>
    <div class="googleGame" :style="toSizeStyle(displayBoard)">
        <div class="border_background" :class="boardAnimateClass" :style="toSizeStyle(displayBoard)" @click="playerJump">
            <!-- 游戏界面将显示在这里 -->
            <BaseComponent class="player" :class="playerClass" ref="player" :config="playerData" @click="playerJump">
                <!-- <el-image :src="playerImg" type="fill" :style="toSizeStyle(playerData)"></el-image> -->
                <div :style="toStyle(playerData)"></div>

            </BaseComponent>
            <BaseComponent ref="enemy" :config="enemyData" v-if="!(enemyData.left >= displayBoard.width)">
                <!-- <el-image :src="enemyImg" ></el-image> -->
                <div class="fire_loop" :style="toStyle(enemyData)"></div>
            </BaseComponent>
        </div>
    </div>

    <el-button type="primary" @click="gameStart">开始</el-button>
    <h2 v-if="isGameover"> GameOver</h2>
    <h2>score:{{ score }}</h2>
</template>
<script lang='ts'>
    export default
        {
            name: 'GoogleGame'
        }
</script>
<script lang='ts' setup>
    import { onMounted, ref, watch, type Ref, reactive } from 'vue';
    import BaseComponent from '@/components/BaseComponent.vue';
    import { ElMessage } from 'element-plus';
    import { useComponentRef } from '@/hooks/useComponentRef';
    import type { BaseCom, Enemy, HitBox, Player } from '@/types';
    import { initBaseCom, initEnemy, initPlayer, toSizeStyle, toStyle } from '@/hooks/useBaseCom';
    import { cloneDeep } from 'lodash';

    let isGameover: Ref<boolean> = ref(false);
    let score: Ref<number> = ref(0);
    let displayBoard: Ref<BaseCom> = ref(initBaseCom(600, 300, 0, 0))
    let boardAnimateClass=ref({
        // border_background: true,
        border_background_move: false,
    })
    let ground = 270
    let player = useComponentRef(BaseComponent);
    let playerData: Ref<Player> = ref(initPlayer(40, 40, 50, ground - 40, 25, 25, 800, 'img/charactors/dino/walk.gif'))
    console.log(toStyle(playerData.value));
    let hurt_animation = [
        'img/charactors/dino/hurt_1.png',
        // 'img/charactors/dino/hurt_2.png',
        'img/charactors/dino/hurt_3.png'
    ]
    let playerImg = ref('img/charactors/dino/walk.gif')
    let playerClass = ref({
        player_gameover: isGameover.value,
    })

    let playerDataDefault: Player = initPlayer(40, 40, 50, ground - 40, 25, 25, 800, 'img/charactors/dino/walk.gif')
    let enemy = useComponentRef(BaseComponent);
    let enemyData: Ref<Enemy> = ref(initEnemy(48, 64, 400, ground - 64, 30, 40, 200, 10, 'img/charactors/fire/burning_loop_1.png'))
    let enemyDataDefault: Enemy = initEnemy(48, 64, 800, ground - 64, 30, 40, 200, 10, 'img/charactors/fire/burning_loop_1.png')


    //游戏初始化/重置方法
    function gameInit() {
        isGameover.value = false;
        score.value = 0;
        Object.assign(playerData.value, playerDataDefault);
        Object.assign(enemyData.value, enemyDataDefault);
        playerImg.value = 'img/charactors/dino/walk.gif';
        Object.assign(playerClass.value, {
            player_gameover: isGameover.value,
        })
        Object.assign(boardAnimateClass.value, {
            border_background_move: isGameover.value,
        })
    }
    function gameStart() {
        gameInit();
        enemyMove();
        boardMove();
        gameOverCheck();
    }
    //背景开始移动
    function boardMove() {
        boardAnimateClass.value.border_background_move = true;
    }
    //玩家角色跳跃方法
    function playerJump() {
        const intervalTime = 20; // 每0.05秒修改一次位置
        const totalTime = 800; // 跳跃总耗时
        let currentTime = 0;
        //加速度
        let gravity = (playerData.value.speed) as number / (totalTime / 1000 / 2);
        console.log('gravity', gravity)
        //当前速度
        let s: number = playerData.value.speed as number;
        if (!playerData.value.isActive && !isGameover.value) {
            //isPause=true：禁止操作
            playerData.value.isActive = true
            let id = setInterval(() => {
                //如果gameover则保持玩家当前位置，并结束定时任务
                if (isGameover.value) {
                    clearInterval(id);
                    return;
                }
                let s1 = s - intervalTime * gravity / 1000;
                let avgSpeed = (s1 + s) / 2
                // 显示和受击框位置变化
                playerData.value.top -= avgSpeed * intervalTime / 1000;
                playerData.value.hitbox_top -= avgSpeed * intervalTime / 1000;
                currentTime += intervalTime;
                // console.log("top", playerData.value.top)
                s = s1;
                if (currentTime >= (totalTime - intervalTime) || playerData.value.hitbox_top > playerDataDefault.hitbox_top) {
                    //还原玩家角色位置
                    Object.assign(playerData.value, playerDataDefault);
                    // playerData.value=playerDataDefault;
                    //解除禁止操作
                    playerData.value.isActive = false;
                    clearInterval(id);
                    return;
                }
            }, intervalTime)
        }
    }
    //障碍角色移动方法
    function enemyMove() {
        console.log("enemyMove")
        const intervalTime = 20; // 每0.05秒执行一次
        //当前速度
        let s: number = enemyData.value.speed as number;

        enemyData.value.isActive = true;
        if (enemyData.value.isActive && !isGameover.value) {

            let id = setInterval(() => {
                if (isGameover.value) {
                    clearInterval(id);
                    return;
                }
                if (enemyData.value.left + enemyData.value.width >= 0) {
                    enemyData.value.left -= s * intervalTime / 1000
                    enemyData.value.hitbox_left -= s * intervalTime / 1000
                    // console.log('enemyHit',enemyData.value.hitbox_left)

                } else {
                    Object.assign(enemyData.value, enemyDataDefault);
                    // enemyData.value=enemyDataDefault;
                    score.value += 10
                    // clearInterval(id);
                    // return;
                }
            }, intervalTime)
        }
    }
    //障碍角色刷新方法
    function enemyInit() {

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
            if (!isGameover.value) {
                isGameover.value = isCollision(playerData.value, enemyData.value)
            } else {
                isGameover.value = true;
                clearInterval(id);
                //播放玩家受伤动画
                playerDead();
                boardAnimateClass.value.border_background_move=false;
                console.log("isgameover", isGameover)
                console.log("gameover")
                return;
            }
        }, 10)
    }
    // 玩家阵亡动画
    function playerDead() {
        console.log('playerDead')
        playerClass.value.player_gameover = true;
        // setTimeout(() => {
        //     playerClass.value.player_gameover = false;
        // }, 2000);
        let index = 0
        let id = setInterval(() => {
            playerData.value.display_img = hurt_animation[index]
            index += 1;
            if (index >= hurt_animation.length) {
                clearInterval(id);
                return;
            }
        }, 100)

    }
    //生成一定范围内随机整数



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