// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'

Vue.use(ElementUI);
Vue.use(VueResource);
Vue.use(VueI18n);
Vue.config.productionTip = false;

import _global_ from "./Global";
const i18n = new VueI18n({
  locale: 'zh',  // 语言标识
  messages: _global_.messages
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
});
