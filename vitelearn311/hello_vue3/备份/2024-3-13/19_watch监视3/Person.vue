<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <!-- <h1>1, watch监视【ref】定义的【基本类型】数据</h1>
        <h2>当前求和为：{{ sum }}</h2>
        <button @click="changeSum">点击+1</button> -->
        <h1>3, watch监视【reactive】定义的【对象类型】数据</h1>
        <h2> 姓名：{{ person.name }}</h2>
        <h2> 年龄：{{ person.age }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="changePerson">替换人</button>
        

        
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
    import { ref, toRefs, watch,reactive} from 'vue';
    import PersonClass from './utils/person.ts';
    let person=reactive(new PersonClass("zhang",18))
    // let {name,age}=toRefs(person.value);

    function changeName(){
        person.name+="~"
    }
    function changeAge(){
        person.age+=1
    }
    function changePerson(){
        // person=new PersonClass("lisi",90);
        Object.assign(person,new PersonClass("lisi",90));
        
    }

    //监视 监视【reactive】定义的【对象类型】数据，默认开启深度监视
    watch(person,function(newValue,oldValue){
        console.log("person变化了",newValue,oldValue)
        // console.log(name.value,age.value)
    })



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