import { ref,reactive,onUpdated} from 'vue'
import axios from 'axios'

export default function(){
    let sum=ref(0);
    let bigSum=ref(0);

    function addSum(){
        sum.value+=1;
    }

    onUpdated(()=>{
        bigSum.value=sum.value*10;
    })


    return {
        sum,
        addSum,
        bigSum
    }
}

