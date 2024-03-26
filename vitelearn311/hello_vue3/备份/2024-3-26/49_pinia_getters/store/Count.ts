import { defineStore } from "pinia";

//官方文档推荐的命名规范：仓库对象：useXXXStore（类似hook命名）
//defineStore('仓库名'，{配置})，其中仓库名建议与文件名相同
export const useCountStore =defineStore('count',{


    //actions：后为对象而非方法，且对象为函数，但不能写function（函数可作为对象属性，但不能添加function关键字）
    actions:{
        addSum(value:number){
            //action方法的好处，可以添加自定义逻辑
            console.log("addSum is operated")
            this.sum+=value
        },
        minusSum(value:number){
            console.log("minusSum is operated")
            this.sum-=value
        }
    },
    //真正存储数据的地方
    state() {
        return{
            sum:1,
            game:"blhx" as string
        }
    },
    //getters，和state类似，但getters是一个对象，其内部的对象为函数形式，state中的内容可作为函数的参数
    //作用类似vue的computed
    getters:{
        bigSum( state ){
            return state.sum*10;
        },
        upperCaseGame( state){
            return state.game.toUpperCase();
        }
    }
})