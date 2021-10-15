// 引入组件
import car from "../views/car";
import home from "../views/home";
import login from "../views/login";
import my from "../views/my";
import register from "../views/register";
import details from "../views/details";
import orderDetail from "../views/orderDetail";
import addressList from "../views/addressList";
import addressEdit from "../views/addressEdit";
import success from "../views/success";

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
        path:"/details/:id",
        component: details,
         meta: { showBar: false }
    },
    {
        path:"/orderDetail",
        component: orderDetail,
         meta: { showBar: false }
    },
    {
        path:"/addressList",
        component: addressList,
         meta: { showBar: false }
    },
    {
        path:"/addressEdit",
        component: addressEdit,
         meta: { showBar: false }
    },
    {
        path:"/success",
        component: success,
         meta: { showBar: false }
    },
    {
        path:"/car",
        component: car,
        // meta: { auth: true }
    },
    {
        path:"/login",
        component: login,
        meta: { showBar: false }
    },
     {
        path:"/my",
        component: my,
        // meta: { auth: true }
    },
     {
        path:"/register",
        component: register,
        meta: { showBar: false }
    },
]

export default routes;

