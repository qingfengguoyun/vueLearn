<template>
    <div :id="`${type}_${value}`" class="card" @mousedown="startDrag" @mouseup="stopDrag" @mousemove="drag">
        <p>type:{{ type }}</p>
        <p>value:{{ value }}</p>
    </div>
</template>
<script>
export default {
    name: "Card",
    data() {
        return {
            type: "黑桃",
            value: 1,
            isDragging: false,
            offsetX: 0,
            offsetY: 0
        };
    },
    mounted() {
        this.cardId = `${this.type}_${this.value}`;
    },
    methods: {
        startDrag(event) {
            this.isDragging = true;
            this.offsetX = event.clientX - event.target.getBoundingClientRect().left;
            this.offsetY = event.clientY - event.target.getBoundingClientRect().top;
        },
        stopDrag() {
            this.isDragging = false;
        },
        drag(event) {
            if (this.isDragging) {
                const card = this.$el; // 获取当前组件的元素
                card.style.position = 'absolute';
                card.style.left = event.clientX - this.offsetX + 'px';
                card.style.top = event.clientY - this.offsetY + 'px';
            }
        }
    }
};
</script>
<style>
    .card{
        width: 40px;
        height: 50px;
        background-color: aquamarine;
    }

</style>

