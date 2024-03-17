import { ref,reactive} from 'vue'
import axios from 'axios'

export default function(){
    let sum=ref(0);

    function addSum(){
        sum.value+=1;
    }

    return {
        sum,
        addSum
    }
}

