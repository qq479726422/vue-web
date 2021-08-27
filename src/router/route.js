// 引入组件
import car from "../views/car";
import home from "../views/home";

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path:"/home",
        component: home
    },
    {
        path:"/car",
        component: car
    },
]

export default routes;

