import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from "./common"

// Vue.config.productionTip = false
Vue.use(common);

//非父子组件传值中间件
Vue.prototype.$center=new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
