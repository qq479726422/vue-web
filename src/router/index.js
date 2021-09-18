import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./route"

Vue.use(VueRouter);
const router =  new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    // console.log('to', to);
    // console.log('from', from);

window.localStorage.setItem('oldUrl',from.path)
if (to.meta.requiresAuth) {
    const flag = window.localStorage.getItem('isLogin') || false
    if (!flag) router.replace({ path: '/login' })
}
next()
   
})
export default router;
