import { createRouter , createWebHistory} from "vue-router";// 第二步:创建路由器
import LoginPage from "@/pages/LoginPage.vue";
import FrontPage from "@/pages/FrontPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
import TestPage from "@/pages/Test.vue"
import TestPage2 from "@/pages/Test2.vue"
import AdminPage from "@/pages/AdminPage.vue"
const router = createRouter(  
    {
        history:createWebHistory(), //指定路由器工作模式
        //路由规则
        routes:[
            
            {
                name:"FrontPage",
                path:"/front",
                component: FrontPage
            },
            {
                name:"SignUpPage",
                path:"/signUp",
                component: SignUpPage
            },
            {
                name:"LoginPage",
                path:"/login",
                component: LoginPage
            },
            {
                path:"/",
                // component:LoginPage,
                redirect:'/login'
            },
            {
                name:"TestPage",
                path:"/test",
                component: TestPage
            },
            {
                name:"TestPage2",
                path:"/test2",
                component: TestPage2
            },
            {
                name:"AdminPage",
                path:"/admin",
                component: AdminPage
            }
        ]
    }
)

//暴露路由
export default router