// 创建一个路由器并暴露

// 第一步，引入createRouter
import { createRouter ,createWebHistory} from "vue-router";
//引入路由组件
import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";
import Detail from "@/pages/Detail.vue";

// 第二步:创建路由器
let router = createRouter(  
    {
        history:createWebHistory(), //指定路由器工作模式
        //路由规则
        routes:[
            {
                name:'homePage',
                path:'/home',
                component:Home
            },
            {
                name:'newsPage',
                path:'/news',
                component:News,
                children:[
                    {
                        name:'newsDetail',
                        //子路由路径不添加'/'
                        //使用params传参，需提前在路由中进行占位
                        path:'detail/:id/:title/:content',
                        component:Detail
                    }
                ],
            },
            {
                name:'aboutPage',
                path:'/about',
                component:About
            }
        ]
    }
)

//暴露路由
export default router