<template>
    <div class="ibox rightBottomWindow animated" ref="rbw" v-show="show">

        <div class="ibox-title .h-300 ">
            <h5>Blockquotes</h5>
            <div class="ibox-tools">
                <a class="collapse-link">
                    <i class="fa fa-chevron-up"></i>
                </a>
                <a class="dropdown-toggle" data-toggle="dropdown" href="typography.html#">
                    <i class="fa fa-wrench"></i>
                </a>
                <ul class="dropdown-menu dropdown-user">
                    <li><a href="typography.html#" class="dropdown-item">Config option 1</a>
                    </li>
                    <li><a href="typography.html#" class="dropdown-item">Config option 2</a>
                    </li>
                </ul>
                <a class="close-link">
                    <i class="fa fa-times"></i>
                </a>
            </div>
        </div>
        <div class="ibox-content">
            <div class="well">
                <h3>
                    The quick, brown fox jumps over a lazy dog.
                </h3>
                I feel the presence of the Almighty, who formed us in his own image, and the breath
            </div>
           
        </div>
    </div>
</template>
<script lang='ts'>
export default
    {
        name: "rightBottomWindow"
    }
</script>
<script lang='ts' setup>
    import { ref,type Ref } from 'vue';
    let rbw:Ref<HTMLElement>=ref() as Ref<HTMLElement>
    let show=ref(false)
    function startAnimation(){
        console.log("startAni",rbw.value)
        // 此处的rbw.value即为dom元素本身，常用对象包括
        // setAttribute(name, value): 设置指定名称的属性值。
        // getAttribute(name): 获取指定名称的属性值。
        // removeAttribute(name): 移除指定名称的属性。
        // style: 可以直接访问元素的内联样式，例如 rbw.value.style.color = 'red'。
        // parentNode: 获取父节点。
        // childNodes: 获取子节点列表。
        // querySelector(selector): 使用 CSS 选择器获取匹配的第一个子元素。
        // querySelectorAll(selector): 使用 CSS 选择器获取匹配的所有子元素。
        show.value=!show.value
        rbw.value.classList.add('bounce')
        setTimeout(()=>{
            rbw.value.classList.remove('bounce')
            show.value=false
        },2000)
    }
    defineExpose({startAnimation})

</script>
<style scoped>
.rightBottomWindow {
    position: fixed;
    bottom: 20px;
    /* 距离底部的距离 */
    right: 20px;
    /* 距离右侧的距离 */
    width: 400px;
    z-index: 999;
    /* 设置z-index使其浮于界面上层 */
}
</style>