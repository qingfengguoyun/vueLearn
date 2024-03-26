import { createRouter , createWebHistory} from "vue-router";// 第二步:创建路由器
import loginPage from "@/pages/loginPage.vue";
import frontPage from "@/pages/frontPage.vue";
import signUpPage from "@/pages/signUpPage.vue";
const router = createRouter(  
    {
        history:createWebHistory(), //指定路由器工作模式
        //路由规则
        routes:[
            
            {
                name:"frontPage",
                path:"/front",
                component: frontPage
            },
            {
                name:"signUpPage",
                path:"/signUp",
                component: signUpPage
            },
            {
                name:"loginPage",
                path:"/login",
                component: loginPage
            },
            {
                path:"/",
                component:loginPage
            }
        ]
    }
)

//暴露路由
export default router