// 创建一个路由器并暴露

// 第一步，引入createRouter
import { createRouter ,createWebHistory} from "vue-router";
//引入路由组件
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";

// 第二步:创建路由器
let router = createRouter(  
    {
        history:createWebHistory(), //指定路由器工作模式
        //路由规则
        routes:[
            {
                path:'/home',
                component:Home
            },
            {
                path:'/news',
                component:News
            },
            {
                path:'/about',
                component:About
            }
        ]
    }
)

//暴露路由
export default router