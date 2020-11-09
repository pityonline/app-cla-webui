import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icons';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import XHR from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
Vue.prototype.$axios=axios;
Vue.use(ElementUI);
Vue.use(VueI18Next);
Vue.config.productionTip = false
Vue.config.devtools = true;
i18next.use(XHR).use(LngDetector).init({
  // lng: 'zh',
  fallbackLng: 'en',
  ns: ['signType', 'signPage'],
  defaultNS: 'signType',
  backend: {
    loadPath: 'locales/{{lng}}/{{ns}}.json'
  },
  detection: {
    order: ['querystring', 'navigator'],
    caches: ['localStorage', 'cookie']
  }
});
const i18n = new VueI18Next(i18next);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
