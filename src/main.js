import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import message from './until/RewriteMessage.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入svg组件
import './icons'
Vue.use(ElementUI);
Vue.prototype.$axios=axios;
Vue.prototype.$message=message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
