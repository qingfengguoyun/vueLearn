<template>
    <!-- html -->
    <div class="person">
        <!-- 模板中自动调用name.value -->
        <h2> 姓： <input type="text " v-model="person.firstName" ></h2><br>
        <h2> 名： <input type="text " v-model="person.lastName"></h2><br>
        <h2> 全名：{{ fullName }}</h2><br>
        <button @click="changeFullName">changeFullName</button>
        
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
    import { ref, toRef ,toRefs,computed} from 'vue';

    let person=ref({
        firstName:"张",
        lastName:"三"
    })
    //这种方式的计算属性是不可修改的（只能由计算元素的修改而被动修改）
    // let fullName=computed(()=>{
    //     console.log(person.value.firstName)
    //     let f=person.value.firstName+person.value.lastName
    //     return f;       
    // })


    let fullName=computed({
        get(){
            return person.value.firstName+person.value.lastName;
        },
        set(val){
            console.log('set',val)
            let str1=val.slice(0,1)
            let str2=val.slice(1)
            person.value.firstName=str1;
            person.value.lastName=str2;
        }
    })
    function changeFullName(){
        // console.log(fullName.value)
        fullName.value="李四";
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