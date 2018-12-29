import Vue from 'vue';
import axios from 'axios';
import VueShortcut from 'vue-shortkey';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import store from './store';
import types from './store/types';

import App from './App';

import FileReader from './src/files';

Vue.use(VueShortcut);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

ipcRenderer.on('configDir', (event, message) => {
  store.commit(types.mutations.CONFIG_DIR_SET, message);

  const fr = new FileReader(message);

  store.commit(types.mutations.SET_SETTINGS, fr.readConfigFile());

  fr.getTabFileNames().forEach((element) => {
    store.commit(types.mutations.ADD_TAB, fr.readTabFile(element));
  });

  // TODO: Loading animation?
  // eslint-disable-next-line no-unused-vars
  const vueInstance = new Vue({
    el: '#app',
    render: h => h(App),
    store,
  });
});
