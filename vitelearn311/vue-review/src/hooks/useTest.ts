import { ref, type Ref } from 'vue';


export default function(){
    
    let sum=ref(0);

    let number=ref(1)

    let testArray:Ref<number[]>=ref([])
    
    function add() {
        sum.value+=number.value    
    }
    function insert(){
        testArray.value.push(number.value);
    }
    return {
        sum,
        number,
        add,
        testArray,
        insert
    }
}