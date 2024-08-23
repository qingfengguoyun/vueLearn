import { createRouter ,createWebHistory} from "vue-router";


// 第二步:创建路由器
let router = createRouter(  
    {
        history:createWebHistory(), //指定路由器工作模式
        //路由规则
        routes:[

        ]
    }
)

//暴露路由
export default router