import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

var axios = require('axios')
// 后台地址
axios.defaults.baseURL = 'http://localhost:8080'
// 允许跨域携带数据
axios.defaults.withCredentials = true
// 全局注册，这样在其他组件中就能通过 this.$axios 来调用http服务
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
