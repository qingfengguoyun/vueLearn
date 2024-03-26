import { createRouter , createWebHistory} from "vue-router";// 第二步:创建路由器
import loginPage from "@/pages/loginPage.vue";
import frontPage from "@/pages/frontPage.vue";
import signUpPage from "@/pages/signUpPage.vue";
let router = createRouter(  
    {
        history:createWebHistory(), //指定路由器工作模式
        //路由规则
        routes:[
            {
                name:"loginPage",
                path:"/login",
                component: loginPage
            },
            {
                name:"frontPage",
                path:"/front",
                component: frontPage
            },
            {
                name:"signUpPage",
                path:"/signUp",
                component: signUpPage
            }
            
        ]
    }
)

//暴露路由
export default router