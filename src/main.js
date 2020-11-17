import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icons';
import VueI18n from 'vue-i18n';
import Lang_Zh from '../public/static/lang/zh-cn'
import Lang_En from '../public/static/lang/en-us'
import Cookie from 'js-cookie'
Vue.use(Cookie);

Vue.prototype.$cookie = Cookie;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.config.productionTip = false
Vue.config.devtools = true;

const i18n = new VueI18n({
    locale: 'en-us',
    messages: {
        'en-us': Lang_En,
        'zh-cn': Lang_Zh
    }
});
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
