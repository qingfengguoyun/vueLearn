import { defineStore } from "pinia";

//官方文档推荐的命名规范：仓库对象：useXXXStore（类似hook命名）
//defineStore('仓库名'，{配置})，其中仓库名建议与文件名相同
export const useCountStore =defineStore('count',{

    //真正存储数据的地方
    state() {
        return{
            sum:0
        }
    },
})