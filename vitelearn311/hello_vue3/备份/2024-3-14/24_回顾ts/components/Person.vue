<template>
    <!-- html -->
    <div class="person">
        <div v-for="person in personList">
            <li> {{ person.name }}</li>
        </div>

    </div>
    <div> {{ cage.temp }}</div>
</template>



<script lang="ts" >
    // js/ts
    export default
    {
        name:'Person'
    }
</script>


<script lang="ts" setup>
    // @符指代src
    import {type PersonInter,type Persons} from '@/components/types/index'
    import {WaterCage,WaterCage2} from '@/components/utils/WaterCage'
    let person:PersonInter={id:'1',name:'zhangsan',age:18};

    // let personList : Array<PersonInter> =[
    //     {id:'1',name:'zhangsan',age:18},
    //     {id:'1',name:'zhangsan',age:18},
    //     {id:'1',name:'zhangsan',age:18}
    // ]

    let personList : Persons =[
        {id:'1',name:'zhangsan',age:18},
        {id:'1',name:'zhangsan',age:18},
        {id:'1',name:'zhangsan',age:18}
    ]

    let cage=new WaterCage(110,10);



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