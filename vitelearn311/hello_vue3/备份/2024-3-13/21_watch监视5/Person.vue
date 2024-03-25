<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <!-- <h1>1, watch监视【ref】定义的【基本类型】数据</h1>
        <h2>当前求和为：{{ sum }}</h2>
        <button @click="changeSum">点击+1</button> -->
        <h1>5, watch监视【ref】定义的对象的多个数据</h1>
        <h2> 姓名：{{ person.name }}</h2>
        <h2> 年龄：{{ person.age }}</h2>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="changeObj">修改obj</button>
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
    let person=ref(new PersonClass("zhang",18,[1,2,3]))
    // let {name,age}=toRefs(person.value);

    function changeName(){
        person.value.name+="~"
    }
    function changeAge(){
        person.value.age+=1
    }
    function changePerson(){
        person.value=new PersonClass("lisi",90,1);
        // Object.assign(person,new PersonClass("lisi",90,['q','w','e']));
        
    }
    function changeObj(){
        person.value.changeObj();
    }

    //监视 仅想监视ref定义的对象的某一个【基本属性】，需将该属性转化为【函数式】（getter函数）
    //watch函数的目标对象只能为：1，返回一个值的函数，2，ref对象，3，reactive对象，4，由以上类型的值组成的数组
    watch(()=>{
        return person.value.name
    },function(newValue,oldValue){
        console.log("person.name变化了",newValue,oldValue)
    })

    // watch(()=>{
    //     return person.value.obj},(a,b)=>{
    //     console.log("person.datas变化了",a,b)
    // })


    //监视 监视ref定义的对象的多个对象，可以将需要监视的对象置于一个数组
    //（）函数简写形式：()=>对象
    watch([()=>person.value.obj,()=>person.value.age],(newIns,oldIns)=>{
        console.log("person.多个对象变化了",newIns,oldIns)
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