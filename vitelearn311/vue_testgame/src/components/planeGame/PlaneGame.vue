<template>
    <div class="game" :style="toSizeStyle(displayBoard)">
        <div :style="toSizeStyle(displayBoard)" class="border_background" :class="boardAnimateClass"
            @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @mousedown="onMouseDown"
            @mousemove="onMouseMove" @mouseup="onMouseUp">
            <!-- 自机组件 -->
            <Plane :baseCom="playerData" ref="playerPlane" @click="bulletShoot"></Plane>
            <!-- 陨石组件 -->
            <template v-for="(asteroidData, index) in asteroidDatas">
                <Asteroid :baseCom="asteroidData" ref="asteroids"></Asteroid>
            </template>
            <!-- 自机子弹组件 -->
            <template v-for="(bulletData, index) in bulletDatas" :key="bulletData">
                <!-- {{ index }} -->
                <Bullet_1 :base-com="bulletData" ref='bullets1'></Bullet_1>
            </template>
            <!-- 小型敌机组件 -->
            <template v-for="(enemySmallPlaneData, index) in enemySmallPlaneDatas" :key="enemySmallPlaneData">
                <!-- {{ index }} -->
                <EnemyPlane :base-com="enemySmallPlaneData" ref="enemySmallPlanes"></EnemyPlane>
            </template>
            <!-- 大型敌机组件 -->
            <template v-for="(enemyBigPlaneData, index) in enemyBigPlaneDatas" :key="enemyBigPlaneData">
                <!-- {{ index }} -->
                <EnemyPlaneBig :base-com="enemyBigPlaneData" ref="enemyBigPlanes"></EnemyPlaneBig>
            </template>

            <template v-for="(enemyBulletData, index) in enemyBulletDatas" :key="enemyBulletData">
                <!-- {{ index }} -->
                <EnemyBullet_1 :base-com="enemyBulletData" ref='enemyBullets1'></EnemyBullet_1>
            </template>

            <!-- 其他组件 -->
            <BaseComponent :base-com="initBaseCom(30, 30, 0, displayBoard.height - 30)">
                <b>Life:</b>
            </BaseComponent>
            <template v-for="(playerLife, index) in playerLifes">
                <BaseComponent :base-com="playerLife" v-if="index < gameConfig.lifeRemain!"></BaseComponent>
            </template>
            <div>
                Life:{{ gameConfig.lifeRemain }}
            </div>
            <!-- <div v-if="!gameConfig.isGameover" class="gameover_board">
                <b>Game Over</b><br>
                <b>scoure:{{ gameConfig.score }}</b>
            </div> -->
            <BaseComponent :base-com="initBaseCom(200, 100, 50, 150)" v-if="!gameConfig.isGameStart">
                <div style="text-align: center;">
                    <h1><b>飞机大战</b></h1>
                </div>
            </BaseComponent>
            <BaseComponent :base-com="initBaseCom(200, 100, 50, 350)" v-if="!gameConfig.isGameStart"
                @click="gameInit()">
                <div style="text-align: center;">
                    <h3>开始游戏</h3>
                </div>
            </BaseComponent>
            <BaseComponent :base-com="createBaseComAtMiddle(displayBoard, 150, 100)" v-if="gameConfig.isGameover"
                @click="gameInit()">
                <div class="gameover_board">
                    <b>Game Over</b><br>
                    <b>Score:{{ gameConfig.score }}</b><br>
                    <b>重新开始</b>
                </div>
            </BaseComponent>
        </div>
    </div>

    <!-- <el-button type="primary" @click="playerPlane?.weapon?.weapon_shoot">开始</el-button> -->
    <el-button type="primary" @click="gameStart()">开始</el-button>
    <el-button type="primary" @click="() => { gameConfig.isGameover = true }">游戏结束</el-button>
    <h2 v-if="gameConfig.isGameover"> GameOver</h2>
    <h2>score:{{ gameConfig.score }}</h2>
</template>
<script lang='ts'>
    export default
        {
            name: 'PlaneGame'
        }
</script>
<script lang='ts' setup>
    import { onMounted, ref, watch, type Ref, reactive, provide } from 'vue';
    import { ElMessage } from 'element-plus';
    import { useComponentArrayRef, useComponentRef } from '@/hooks/useComponentRef';
    import type { BaseCom, Enemy, GameConfig, HitBox, Player } from '@/types';
    import { createBaseComAtMiddle, getBaseComCenter, initBaseCom, initEnemy, initPlayer, isCollision, toSizeStyle, toStyle, validateHitbox, } from '@/hooks/useBaseCom';
    import { cloneDeep } from 'lodash';
    import BaseComponent from '@/components/BaseComponent.vue';
    import Plane from '@/components/planeGame/Plane.vue';
    import EnemyPlane from '@/components/planeGame/enemies/EnemyPlane.vue';
    import EnemyPlaneBig from '@/components/planeGame/enemies/EnemyPlaneBig.vue';
    import Asteroid from '@/components/planeGame/Asteroid.vue';
    import Bullet_1 from './bullets/Bullet_1.vue';
    import EnemyBullet_1 from './enemies/EnemyBullet_1.vue';

    // 游戏整体配置
    let gameConfig: Ref<GameConfig> = ref({
        isGameStart: false,
        isGameover: false,
        isPaused: false,
        score: 0,
        lifeRemain: 4,
    })
    provide('gameConfig', gameConfig)

    let displayBoard: Ref<BaseCom> = ref(initBaseCom(300, 500, 0, 0))
    provide('displayBoard', displayBoard.value)

    let boardAnimateClass = ref({
        // border_background: true,
        border_background_move: false,
    })
    let boardAnimateClassDefault = cloneDeep(boardAnimateClass.value);

    //额外配置
    let maxLife = 4;


    // 自机配置
    let playerData: Player = initPlayer(40, 40, 130, 400, 25, 25, 800, 'img/charactors/plane/plane_1.png')
    let playerPlane = useComponentRef(Plane)

    // 剩余血量图标配置
    let playerLifes: Ref<BaseCom[]> = ref([])
    for (let i = 0; i < 4; i++) {
        playerLifes.value.push(initBaseCom(20, 20, 30 + 20 * i, displayBoard.value.height - 30, 0, 0, 'img/charactors/plane/plane_1.png'))
    }


    // 陨石相关配置
    let asteroidDatas: Ref<Enemy[]> = ref([]);
    asteroidDatas.value.push(initEnemy(40, 40, 30, 100, 25, 25, 100, 10, 'img/charactors/asteroid/Asteroid_1.png'),
        initEnemy(40, 40, 130, 100, 25, 25, 100, 10, 'img/charactors/asteroid/Asteroid_1.png'),
        initEnemy(40, 40, 230, 100, 25, 25, 100, 10, 'img/charactors/asteroid/Asteroid_1.png'))
    let asteroids = useComponentArrayRef(Asteroid);

    // 自机子弹相关配置
    let bullets1 = useComponentArrayRef(Bullet_1);
    let bulletDatas: Ref<BaseCom[]> = ref([]);
    //子弹总数
    let bulletCount = 15;
    for (let i = 0; i < bulletCount; i++) {
        bulletDatas.value.push(initBaseCom(playerData.width!,
            playerData.height!,
            -100,
            displayBoard.value.height,
            playerData.width! / 3,
            playerData.height! / 3,
            'img/charactors/weapon/bullet/bullet_1.png'));
    }
    // 当前子弹id
    let currentBullet = 0;
    // 子弹发射冷却时间(默认250毫秒)
    let bulletCD = 250;

    // 敌机相关配置
    let enemySmallPlaneDatas: Ref<Enemy[]> = ref([]);
    let enemySmallPlanes = useComponentArrayRef(EnemyPlane);
    let enemySmallPlaneCount = 3;
    for (let i = 0; i < enemySmallPlaneCount; i++) {
        enemySmallPlaneDatas.value.push(initEnemy(40,
            40,
            30 + 100 * i,
            50,
            25,
            25,
            100,
            10,
            'img/charactors/enemy/nautolan/Nautolan_1.png'
        ))
    }

    //大型敌机相关配置
    let enemyBigPlaneDatas: Ref<Enemy[]> = ref([]);
    let enemyBigPlanes = useComponentArrayRef(EnemyPlaneBig);
    let enemyBigPlaneCount = 2;
    for (let i = 0; i < enemyBigPlaneCount; i++) {
        enemyBigPlaneDatas.value.push(initEnemy(80,
            80,
            30 + 100 * i,
            -100,
            50,
            50,
            50,
            30,
            'img/charactors/enemy/nautolan/Nautolan_2.png'
        ))
    }

    // 敌机子弹配置
    let enemyBulletDatas: Ref<BaseCom[]> = ref([]);
    let enemyBullets1 = useComponentRef(EnemyBullet_1);
    // enemyBulletDatas.value.push(initBaseCom(40,40,50,300,20,20))



    //游戏初始化/重置方法
    function gameInit() {
        // isGameover.value = false;
        // score.value = 0;
        // 游戏总配置重置
        Object.assign(gameConfig.value, {
            isGameStart: true,
            isGameover: false,
            isPaused: false,
            score: 0,
            lifeRemain: 4,
        })
        boardMove()

        //重置自机
        playerPlane.value?.resetDefault();

        //重置子弹
        for (let i = bullets1.value!.length - 1; i >= 0; i--) {
            bullets1.value![i].resetDefault();
        }
        //重置子弹指针
        currentBullet = 0;

        //重置所有陨石
        for (let i = asteroids.value!.length - 1; i >= 0; i--) {
            asteroids.value![i].resetDefault();
            console.log(asteroids.value![i])
            asteroids.value![i].randomReset()
            asteroids.value![i].comData.isActive = true;
            asteroids.value![i].asteroidMove()
        }
        // 重置所有敌机
        for (let i = enemySmallPlanes.value!.length - 1; i >= 0; i--) {
            enemySmallPlanes.value![i].resetDefault();
            enemySmallPlanes.value![i].randomReset();
            enemySmallPlanes.value![i].comData.isActive = true;
            enemySmallPlanes.value![i].moveStyle1();
        }
        // 重置所有大型敌机
        for (let i = enemyBigPlanes.value!.length - 1; i >= 0; i--) {
            enemyBigPlanes.value![i].resetDefault();
            enemyBigPlanes.value![i].randomReset();
            enemyBigPlanes.value![i].comData.isActive = true;
            // enemyBigPlanes.value![i].moveStyle2();
        }
        // 检测子弹与陨石,敌机碰撞
        checkBulletsAndEnemys()
        // 检测自机和敌人是否碰撞
        checkPlayerPlaneAndEnemys()
        // 陨石，敌机等超出边界检测
        checkOutBoardEnemys()
        // 检测并移除失效子弹
        checkBullets();
        // 检查游戏是否结束
        gameOverCheck();
        // 拖拽过程中子弹自动射击
        autoShotBullet()
        // 分数检测
        checkScore()
    }
    function gameStart() {
        gameInit();
        // obstacle.value.enemyMove();
        // boardMove();
        // gameOverCheck();
    }
    //背景开始移动
    function boardMove() {
        boardAnimateClass.value.border_background_move = true;
    }
    // 自机移动
    const isDragging = ref(false)
    const mouseX = ref(0);
    const mouseY = ref(0);

    function onTouchStart(event: TouchEvent) {
        if (gameConfig.value.isGameStart && !gameConfig.value.isGameover) {
            isDragging.value = true;
            mouseX.value = event.touches[0].clientX;
            mouseY.value = event.touches[0].clientY;
            playerPlane.value?.changePositionByCenter(mouseX.value, mouseY.value)
            event.preventDefault()
        }
    };
    function onTouchMove(event: TouchEvent) {
        if (gameConfig.value.isGameStart && !gameConfig.value.isGameover) {
            if (isDragging.value) {
                mouseX.value = event.touches[0].clientX;
                mouseY.value = event.touches[0].clientY;
                playerPlane.value?.changePositionByCenter(mouseX.value, mouseY.value)
            }
        }
    };
    function onTouchEnd() {
        isDragging.value = false;
    }

    function onMouseDown(event: MouseEvent) {
        if (gameConfig.value.isGameStart && !gameConfig.value.isGameover) {
            isDragging.value = true;
            mouseX.value = event.pageX;
            mouseY.value = event.pageY;
            playerPlane.value?.changePositionByCenter(mouseX.value, mouseY.value)
            event.preventDefault()
        }
    };
    function onMouseMove(event: MouseEvent) {
        if (gameConfig.value.isGameStart && !gameConfig.value.isGameover) {
            if (isDragging.value) {
                mouseX.value = event.pageX;
                mouseY.value = event.pageY;
                playerPlane.value?.changePositionByCenter(mouseX.value, mouseY.value)
            }
        }

    };
    function onMouseUp() {
        isDragging.value = false;
    }
    // 拖拽过程中子弹自动射击
    function autoShotBullet() {
        console.log("autoshot start")
        let id = setInterval(() => {
            if (gameConfig.value.isGameover) {
                console.log("autoShot stop")
                clearInterval(id);
                return;
            }
            if (gameConfig.value.isGameStart && !gameConfig.value.isGameover) {
                if (isDragging.value) {
                    bulletShoot();
                }
            }
        }, bulletCD)
    }
    // 自机跟随鼠标位置移动
    // const handleMouseMove = function (event: MouseEvent) {
    //     if (gameConfig.value.isGameStart && !gameConfig.value.isGameover) {
    //         mouseX.value = event.pageX;
    //         mouseY.value = event.pageY;
    //         playerPlane.value?.changePositionByCenter(mouseX.value, mouseY.value)
    //     }

    // };

    // 判断子弹和敌人是否碰撞
    function checkBulletsAndEnemys() {
        console.log("checkBulletsAndEnemy")
        // console.log(asteroids.value)
        let id = setInterval(() => {
            if (gameConfig.value.isGameover) {
                console.log("checkBulletsAndEnemy stop")
                clearInterval(id);
            }
            for (let bd of bulletDatas.value) {
                for (let asteroid_index = asteroids.value!.length - 1; asteroid_index >= 0; asteroid_index--) {
                    // console.log("@@@",asteroids.value![asteroid_index].comData)
                    if (bd.isActive && asteroids.value![asteroid_index].comData.isActive) {
                        if (isCollision(bd, asteroids.value![asteroid_index].comData)) {
                            console.log("isCollision")
                            bd.isActive = false;
                            // console.log(asteroids.value![asteroid_index])
                            asteroids.value![asteroid_index].asteroidExplode();
                            gameConfig.value.score += asteroids.value![asteroid_index].comData.score!;
                        }
                    }

                }
                for (let enemyPlane of enemySmallPlanes.value!) {
                    if (bd.isActive && enemyPlane.comData.isActive) {
                        if (isCollision(bd, enemyPlane.comData)) {
                            console.log("isCollision")
                            bd.isActive = false;
                            enemyPlane.enemyExplode();
                            gameConfig.value.score += enemyPlane.comData.score!;
                        }
                    }
                }
                // 大型敌人与自机子弹检测               
                for (let enemyPlane of enemyBigPlanes.value!) {
                    // 优先检测敌机与子弹是否均有效
                    if (bd.isActive && enemyPlane.comData.isActive) {
                        // 再检测子弹与敌机是否碰撞
                        if (isCollision(bd, enemyPlane.comData)) {
                            // 根据情况执行不同逻辑
                            if (enemyPlane.comData.hp! > 0) {
                                bd.isActive = false;
                                enemyPlane.comData.hp! -= 1;
                            } else {
                                console.log("big enemy destory")
                                bd.isActive = false;
                                enemyPlane.enemyExplode();
                                gameConfig.value.score += enemyPlane.comData.score!;
                            }
                        }
                    }
                }
            }
        }, 20)
    }

    // 判断自机和敌人是否碰撞
    function checkPlayerPlaneAndEnemys() {
        console.log("checkPlayerPlaneAndEnemys")
        // console.log(asteroids.value)
        let id = setInterval(() => {
            if (gameConfig.value.isGameover) {
                console.log("checkPlayerPlaneAndEnemys stop")
                clearInterval(id);
                //需要return,否则最后一次循环会完整执行一遍
                return;
            }
            //如果角色处于保护状态则不检测
            if (playerPlane.value!.comData.isProtected) {

            } else {
                for (let asteroid of asteroids.value!) {
                    // console.log("@@@",asteroids.value![asteroid_index].comData)
                    // 陨石有效且自机与陨石相撞（先检测陨石是否有效，因为需要播放摧毁动画，此时位置未重置但陨石已失效）
                    if (asteroid.comData.isActive && isCollision(playerPlane.value!.comData, asteroid.comData)) {
                        console.log("asteroid isCollision")
                        //自机处于护盾状态
                        if (playerPlane.value!.shieldData.isActive) {
                            console.log("shield protect")
                            asteroid.comData.isActive = false;
                            asteroid.asteroidExplode()
                        } else {
                            gameConfig.value.lifeRemain! -= 1;
                            if (gameConfig.value.lifeRemain! > 0) {
                                playerPlane.value!.hurt(maxLife - gameConfig.value.lifeRemain!)
                                // playerPlane.value!.getShield()
                                asteroid.comData.isActive = false;
                                asteroid.asteroidExplode()
                            }
                        }
                    }
                }
                for (let enemyPlane of enemySmallPlanes.value!) {
                    // 同理检测敌机有效且与自机相撞
                    if (enemyPlane.comData.isActive && isCollision(playerPlane.value!.comData, enemyPlane.comData)) {
                        console.log("enemyPlane isCollision")
                        //自机处于护盾状态
                        if (playerPlane.value!.shieldData.isActive) {
                            console.log("shield protect")
                            enemyPlane.comData.isActive = false;
                            enemyPlane.enemyExplode();
                        } else {
                            gameConfig.value.lifeRemain! -= 1;
                            if (gameConfig.value.lifeRemain! > 0) {
                                playerPlane.value!.hurt(maxLife - gameConfig.value.lifeRemain!)
                                // playerPlane.value!.getShield()
                                enemyPlane.comData.isActive = false;
                                enemyPlane.enemyExplode();
                            }
                        }

                    }
                }
                for (let enemyPlane of enemyBigPlanes.value!) {
                    // 同理检测敌机有效且与自机相撞
                    if (enemyPlane.comData.isActive && isCollision(playerPlane.value!.comData, enemyPlane.comData)) {
                        console.log("enemyBigPlane isCollision")
                        //自机处于护盾状态
                        if (playerPlane.value!.shieldData.isActive) {
                            console.log("shield protect")
                            enemyPlane.comData.isActive = false;
                            enemyPlane.enemyExplode();
                        } else {
                            gameConfig.value.lifeRemain! -= 1;
                            if (gameConfig.value.lifeRemain! > 0) {
                                playerPlane.value!.hurt(maxLife - gameConfig.value.lifeRemain!)
                                // playerPlane.value!.getShield()
                                enemyPlane.comData.isActive = false;
                                enemyPlane.enemyExplode();
                            }
                        }

                    }
                }
            }
        }, 20)
    }

    // 发射子弹
    function bulletShoot() {
        // console.log('bulletShoot')
        currentBullet = (currentBullet + 1) % bulletCount;
        bullets1.value![currentBullet].reset()
        // 延迟0.02秒执行，保证子弹的移动线程结束   
        setTimeout(() => {
            // console.log("bullet id", currentBullet)
            bullets1.value![currentBullet].comData.left = getBaseComCenter(playerPlane.value?.comData!).center_x - playerPlane.value?.comData.width! / 2,
                bullets1.value![currentBullet].comData.top = getBaseComCenter(playerPlane.value?.comData!).center_y - playerPlane.value?.comData.height!,
                validateHitbox(bullets1.value![currentBullet].comData)
            bullets1.value![currentBullet].move()
        }, 20)
    }
    //检测子弹数量上限
    // watch(bulletDatas.value, () => {
    //     // console.log("watch")
    //     if (bulletDatas.value.length > 12) {
    //         // console.log("shift")
    //         bulletDatas.value.shift()
    //         // console.log(bulletDatas.value)
    //         return;
    //     }
    // }, { deep: false })

    // 检测并移除失效子弹
    function checkBullets() {
        console.log("checkBullet")
        let id = setInterval(() => {
            if (gameConfig.value.isGameover) {
                console.log("checkBullet stop")
                clearInterval(id);
                return;
            }
            // for (let i = bulletDatas.value.length - 1; i >= 0; i--) {
            //     if (bulletDatas.value[i].isActive == false) {
            //         // console.log("splice")
            //         // 数组的splice移除
            //         // bulletDatas.value.splice(i, 1);
            //         bulletDatas.value[i].left = -100;
            //         bulletDatas.value[i].top = displayBoard.value.height
            //     }

            // }
            for (let bullet of bullets1.value!) {
                if (bullet.comData.isActive == false) {
                    bullet.reset();
                }
            }
        }, 20)
    }



    // 越界敌人重置
    function checkOutBoardEnemys() {
        console.log("checkOutBoardEnemys")
        let id = setInterval(() => {
            if (gameConfig.value.isGameover) {
                clearInterval(id);
                return;
            }
            for (let i = asteroids.value!.length - 1; i >= 0; i--) {
                if (asteroids.value![i].comData.top > displayBoard.value.height) {
                    asteroids.value![i].randomReset();
                }
            }
            for (let enemySmallPlane of enemySmallPlanes.value!) {
                if (enemySmallPlane.comData.top > displayBoard.value.height) {
                    enemySmallPlane.randomReset();
                }
            }
            for (let enemyBigPlane of enemySmallPlanes.value!) {
                if (enemyBigPlane.comData.top > displayBoard.value.height) {
                    enemyBigPlane.randomReset();
                }
            }
        }, 20)
    }

    function checkScore() {
        // 监听游戏系统分数
        // 设置定时任务，若分数大于一定值后执行逻辑，并移除定时任务
        let id1 = setInterval(() => {
            if (gameConfig.value.score >= 100) {
                // 分数大于100，大型敌机开始移动
                console.log("enemyBigPlane Start Moving")
                for (let i = enemyBigPlanes.value!.length - 1; i >= 0; i--) {
                    enemyBigPlanes.value![i].moveStyle2();
                }
                clearInterval(id1);
                return;
            }
        })
    }

    // 大型敌机发射子弹
    function enemyBulletShot() {
        console.log("big enemy Plane start shoting")
        let interval=20;
        let id = setInterval(() => {
            if (gameConfig.value.isGameover) {
                console.log("big enemy Plane stop shot")
                clearInterval(id);
                return;
            }
            if (gameConfig.value.isGameStart && !gameConfig.value.isGameover) {
                for (let enemyBigPlane of enemyBigPlanes.value!) {
                    if(enemyBigPlane.comData.isActive){
                        if(enemyBigPlane.comData.shot_cd!>0){
                            enemyBigPlane.comData.shot_cd!-=interval;
                        }else{
                            // 在敌机中心生成一个敌方子弹并移动
                            createBaseComAtMiddle(enemyBigPlane.comData,40,40)
                        }
                    }
                }
            }
        }, interval)

    }

    // 监听游戏是否结束
    function gameOverCheck() {
        let id = setInterval(() => {
            if (gameConfig.value.isGameover) {
                console.log("stop gameOverCheck");
                clearInterval(id);
                return;
            } else {
                if (gameConfig.value.lifeRemain! <= 0) {
                    gameConfig.value.isGameover = true;
                }

            }
        }, 10)
    }






    onMounted(() => {


    })



</script>
<style scoped>
    .game {
        text-align: left;
        /* width: 600px;
        height: 300px; */
        /* border: 2px solid black; */
        position: relative;
        display: flex;
        overflow: hidden;
        border: 2px solid black;
        justify-content: center;
        /* background-image: url('/img/background/background_1.png'); */
        /* background-repeat: repeat-x; */

    }

    .border_background {
        /* background-image: url('/img/background/background_1.png'); */
        /* background-color: aquamarine */
        background-image: url('/img/background/space_1.png');
        background-size: auto 100%;
        background-repeat: repeat;

    }

    .border_background_move {
        animation-name: border_background_move;
        animation-duration: 8s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
    }

    @keyframes border_background_move {
        from {
            background-position: 0% 0px;
        }

        to {
            background-position: 0% 500px
        }
    }

    .gameover_board {
        /* width: 200px;
        height: 100px; */
        /* display: flex;
        justify-content: center;
        align-items: center; */
        text-align: center;
        /* margin: auto;
        margin-top: 50%; */
    }


    /* .player_gameover {
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

    } */

</style>