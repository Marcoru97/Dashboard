import Vue from 'vue';
import store from './store';

import App from './App';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

const vueInstance = new Vue({
  el: '#app',
  render: h => h(App),
  store,
});
