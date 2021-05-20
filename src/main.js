// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//import 'default-passive-events'
//引入自定义js
import Base64 from './assets/js/base64.js'
import store from './assets/js/store.js'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import qs from 'qs'
import ol from 'openlayers'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.prototype.$ol=ol
Vue.use(ElementUI)
Vue.use(require('vue-cookies'))
Vue.prototype.HOST = '/'
Vue.config.productionTip = false
Vue.prototype.axios = axios
// 指向后台程序端口
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials=true;
Vue.prototype.qs = qs
Vue.prototype.router = router
Vue.prototype.$cookies= VueCookies
Vue.prototype.$base64 = Base64
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
}).$mount('#app');
