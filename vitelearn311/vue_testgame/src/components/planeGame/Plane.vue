<template>
    <div class="baseCom" :style="toSizeStyle(comData)" :class="animationClasses">
        <slot>
            <!-- <div :style="toStyle(comData)"></div> -->
            <div :style="toStyle(comData)" :class="animationClasses" style="z-index: 1;" > </div>
            <Weapon :baseCom="weaponData" ref="weapon"></Weapon>
            <Engine :baseCom="engineData">

            </Engine>
            <!-- <template v-for="(bulletData,index) in bulletDatas" :key="index">
                <Bullet_1 :baseCom="bulletData"></Bullet_1>
            </template> -->
        </slot>
    </div>
</template>
<script lang='ts'>
    export default
        {
            name: "Plane"
        }
</script>
<script lang='ts' setup>
    import { ref, inject, type Ref,watch } from "vue";
    import { cloneDeep } from 'lodash';
    import { getBaseComCenter, initBaseCom, toSizeStyle, toStyle, validateHitbox } from "@/hooks/useBaseCom";
    import type { BaseCom, Enemy, GameConfig, Player } from "@/types";
    import { getRamdomInit } from "@/hooks/useUtils";
    import BaseComponent from "../BaseComponent.vue";
    import Engine from "@/components/planeGame/Engine.vue"
    import Weapon from "@/components/planeGame/weapons/Weapon.vue"
    import Bullet_1 from "@/components/planeGame/bullets/Bullet_1.vue";
import { useComponentRef } from "@/hooks/useComponentRef";
    // 组件初始化属性（位置，判定区，显示图片等)
    let { baseCom } = defineProps<{ baseCom: Player }>();
    let comData = ref(baseCom)
    let comDataDefault = cloneDeep(comData.value);

    let engineData = initBaseCom(comData.value.width, comData.value.height, 0, 0, 0, 0, "/img/charactors/plane/engine_1.png")
    let weaponData = initBaseCom(comData.value.width, comData.value.height, 0, 0, 0, 0, "/img/charactors/weapon/weapon_1.png")
    
    //组件动画类
    let animationClasses = ref({
        // fire_loop: true,
        protected: false,
    })
    //组件动画默认配置（重置时使用）
    let animationClassesDefault = cloneDeep(animationClasses.value);
    //游戏总配置项
    let gameConfig = inject<Ref<GameConfig>>("gameConfig") as Ref<GameConfig>;
    let displayBoard =inject<BaseCom>("displayBoard") as BaseCom;
    let weapon= useComponentRef(Weapon)
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

    // 监听组件位置，实时更新受击框位置
    watch(()=>{
       return [comData.value.left,comData.value.top]
    }, () => {
        validateHitbox(comData.value);
    })

    // 实现组件自定义逻辑，封装为方法(例如移动，各种动作,动画等)

    // 改变组件位置
    function changePosition(left: number, top: number) {
        comData.value.left =  left - comData.value.width / 2;
        comData.value.top = top - comData.value.height / 2;
        // validateHitbox(comData.value)
    }
    // 防止组件位置超出边界
    watch(comData.value,(n,o)=>{
        if(comData.value.left<0-(comData.value.width-comData.value.hitbox_width)/2){
            comData.value.left=0-(comData.value.width-comData.value.hitbox_width)/2;
        }
        if(comData.value.left>displayBoard.width-comData.value.width+(comData.value.width-comData.value.hitbox_width)/2){
            console.log("left");
            comData.value.left=displayBoard.width-comData.value.width+(comData.value.width-comData.value.hitbox_width)/2;
        }
        if(comData.value.top<0){
            comData.value.top=0;
        }
        if(comData.value.top>displayBoard.height-comData.value.height){
            console.log("height");
            comData.value.top=displayBoard.height-comData.value.height;
        }
    })

    let planeStatusImg=['img/charactors/plane/plane_1.png',
        'img/charactors/plane/plane_2.png',
        'img/charactors/plane/plane_3.png',
        'img/charactors/plane/plane_4.png',
    ]

    function hurt(planeStatus:number){
        comData.value.isProtected=true;
        comData.value.display_img=planeStatusImg[planeStatus];
        animationClasses.value.protected=true;
        let id=setTimeout(()=>{
            animationClasses.value.protected=false;
            comData.value.isProtected=false;
        },3000)
    }


    // 自定义逻辑结束

    //组件重置
    function reset() {
        Object.assign(animationClasses.value, animationClassesDefault)
        Object.assign(comData.value,comDataDefault)
        // animationClasses.value.player_gameover = false;
    }
    defineExpose({
        comData,
        reset,
        //自定义逻辑
        // move
        changePosition,
        weapon,
        hurt,
    })

</script>
<style scoped>
    .baseCom {
        position: absolute;
        display: flex;
        justify-content: center;
        /* align-items: center; */
    }

    .protected {
        animation: protected 0.5s infinite;
    }

    @keyframes protected {
        0% {
            opacity: 1;
        }

        50% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }

    }



    /* .fire_loop {
        animation-name: fire_loop;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-timing-function: steps(8);
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