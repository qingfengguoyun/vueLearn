<template>
    <div class="card" ref="tempImg" @mouseenter="mouseEnterAction" @mouseleave="mouseLeaveAction">
        <img :src="getImage(card.img)" >
    </div>

</template>
<script lang="ts">
    export default {
        name:"MyCard"
    }

</script>
<script lang="ts" setup>

    import {ref,reactive} from 'vue'
    import {type Card } from '@/types/index'    

    let card=ref<Card>({
        color: 1,
        num:1,
        img: "cardImg/0x0a.png"
    })

    function getImage(imgSrc:any){
        return new URL('./'+imgSrc, import.meta.url).href;
    }
    
    let tempImg=ref()
    function mouseEnterAction(){
        console.log(tempImg.value)
        if (tempImg.value) {
            tempImg.value.style.transform = "translateY(-20px)";
        }
    }

    function mouseLeaveAction() {
    //   isHovered.value = false;
      if (tempImg.value) {
        tempImg.value.style.transform = "";
      }
    }

</script>
<style scoped>
    .card {
        width: 100px;
        border: 3px saddlebrown solid;
    }
</style>