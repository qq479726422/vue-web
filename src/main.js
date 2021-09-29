import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import { GoodsAction, GoodsActionIcon, GoodsActionButton,Toast,Popup,Button,Stepper,Tabbar, TabbarItem } from 'vant';

import '@/assets/reset.css'
import 'vant/lib/index.css';


Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(Toast);
Vue.use(Popup);
Vue.use(Button);
Vue.use(Stepper);
Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
