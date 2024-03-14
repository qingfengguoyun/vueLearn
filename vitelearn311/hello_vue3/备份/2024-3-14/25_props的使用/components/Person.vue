<template>
    <!-- html -->
    <div class="person">
        <!-- <h2> {{ x }}</h2> -->
        <ul v-for="p in list" :key="p.id">
            <li>{{ p.name }}-{{ p.age }}</li>
        </ul>
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
    import { defineProps,withDefaults } from 'vue';
    import { MyPerson, type MyPersons } from './types';

    //仅接收list
    // defineProps(["list"])

    //接收list + 限制类型
    // let x=defineProps<{list:MyPersons}>()

    //接收list + 限制类型 + 限制必要性
    // let x=defineProps<{list?:MyPersons}>()

    //接收list + 限制类型 + 限制必要性 +设置默认值
    //withDefaults的默认值需要以函数式返回
    let x=withDefaults(defineProps<{list?:MyPersons}>(),{
        list:()=>[
            new MyPerson("123","asd",16)
        ]
    })

    console.log(x)


</script>

<style>
    /* 样式 */
    .person {
        background-color: #ddd;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px; 
    }
</style>@/components/utils/person.js./utils/person.js