<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <div>
            <h2>姓名：{{ person.name }}</h2>
            <h2>年龄：{{ person.age }}</h2>
        </div>
        <button @click="change">修改</button>

        
    </div>
</template>



<script lang="ts" >
    // js/ts
    export default
    {
        name:'Person'
    }
</script>

<script lang="ts" setup>
import { ref, toRef ,toRefs} from 'vue';

    let person=ref({
        name:"张三",
        age:18
    })

    //解构创建
    //对解构创建得到的name和age进行修改会同样影响person.name,person.age
    let{name,age}=toRefs(person.value);

    function change(){
        name.value+="*";
        age.value+=1;
    }


</script>

<style>
    /* 样式 */
    .person {
        background-color: #ddd;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px; 
    }
</style>