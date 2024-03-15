import { ref,reactive} from 'vue'
import axios from 'axios'

export default function(){
    // 数据
    let dogList=reactive([
        'https://images.dog.ceo/breeds/pembroke/n02113023_1823.jpg',
    ])
    // 方法
    async function anotherDog(){

        try{
            let response= await axios.get("https://dog.ceo/api/breed/pembroke/images/random")
            console.log(response.data)
            dogList.push(response.data.message)
        }catch(error){
            alert(error)
        }
    }
    //向外部提供内容
    return{
        dogList,
        anotherDog
    }
}


