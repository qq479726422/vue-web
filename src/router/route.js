// 引入组件
import car from "../views/car";
import home from "../views/home";
import login from "../views/login";
import my from "../views/my";
import register from "../views/register";
import details from "../views/details";

//requiresAuth 是否需要验证登录
//showBar 是否需要底部导航栏
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path:"/home",
        component: home,
        // meta: { requiresAuth: true }
    },
    {
        path:"/details",
        component: details,
         meta: { showBar: false }
    },
    {
        path:"/car",
        component: car,
        meta: { auth: true }
    },
    {
        path:"/login",
        component: login,
        meta: { showBar: false }
    },
     {
        path:"/my",
        component: my,
        meta: { auth: true }
    },
     {
        path:"/register",
        component: register,
        meta: { showBar: false }
    },
]

export default routes;

