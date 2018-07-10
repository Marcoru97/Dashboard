import Vue from 'vue';
import store from './store';
import types from './store/types';
import { ipcRenderer } from 'electron';

import App from './App';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

ipcRenderer.on('mainConfiguration', (event, message) => {
  store.commit(types.mutations.SETTINGS_ICON_VISIBLE_CHANGE, message.showSettingsIcon);
});

ipcRenderer.on('itemDataConfiguration', (event, message) => {
  for (let i = 0; i < message.length; i++) {
    store.commit(types.mutations.ITEM_DATA_ADD, message[i]);
  }
});

const vueInstance = new Vue({
  el: '#app',
  render: h => h(App),
  store,
});
