import GoogleGame from '@/components/GoogleGame.vue';
<template>
    <div class="googleGame">
        <div id="game">
            <!-- 游戏界面将显示在这里 -->
        </div>

    </div>
</template>
<script lang='ts'>
    export default
        {
            name: 'GoogleGame'
        }
</script>
<script lang='ts' setup>
import { onMounted, ref } from 'vue';
 
 const game = ref(null);

</script>
<style scoped>
    .googleGame {
        text-align: left
    }

</style>