import Vue from 'vue';

import App from './App';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App),
});
