<template>
    <p>
        <h2> 花色： </h2><input v-model="card.color">
        <h2> 牌号： </h2><input v-model="card.num">
    </p>
    <p>
        
    </p>
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

    import {ref,reactive,computed} from 'vue'
    import {type Card } from '@/types/index'    

    let card=ref<Card>({
        color: 1,
        num:2,
        img: computed(()=>{
            let src:string="./cardImg/"+card.value.color+"_"+card.value.num+".png"
            return src;
        })
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