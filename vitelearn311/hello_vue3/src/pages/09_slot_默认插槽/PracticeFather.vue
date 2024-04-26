<template>
    <div class="father">
        <h3>父组件</h3>
        <div class="content">
            <PracticeCom>
                <div>父组件通过slot传递的div</div>
            </PracticeCom>

        </div>
    </div>
</template>
<script lang='ts'>
export default
    {
        name: "PracticeFather"
    }
</script>
<script lang='ts' setup>
import PracticeCom from './PracticeCom.vue';

</script>
<style scoped>
.father {
    /* background-color: rgb(165, 164, 164); */
    padding: 20px;
    border-radius: 10px;
}

.content {
    display: flex;
    justify-content: space-evenly;
}

img,
video {
    width: 100%;
}

h2 {
    background-color: orange;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
}
</style>