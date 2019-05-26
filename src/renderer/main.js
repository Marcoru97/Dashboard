import Vue from 'vue';
import axios from 'axios';
import VueShortcut from 'vue-shortkey';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-extraneous-dependencies

import store from './store';

import App from './App';

import FileManager from './src/FileManager';

// Load svg data
import './assets/arrow_down.svg';
import './assets/arrow_drop_up.svg';
import './assets/arrow_left.svg';
import './assets/arrow_right.svg';
import './assets/arrow_drop_down.svg';
import './assets/arrow_up.svg';
import './assets/box.svg';
import './assets/close.svg';
import './assets/copy.svg';
import './assets/menu.svg';
import './assets/minus.svg';
import './assets/move.svg';
import './assets/plus.svg';
import './assets/settings.svg';

Vue.use(VueShortcut);

// TODO: Extract as a vuex module?
const DEFAULT_STORE_STATE = {
  itemSize: 250,
  tabs: [
    {
      display_name: 'Tab',
      version: 0.1,
      last_update: 0,
      modules: [{ name: 'welcome', size: { width: 1, height: 1 }, position: { x: 0, y: 0 } }],
      position: 0,
    },
  ],
  activeTabId: 0,
  settings: { itemMargin: 5, showSettingsIcon: true },
  itemEditMode: false,
  settingsVisible: false,
};

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

ipcRenderer.on('configDir', (event, message) => {
  const fr = new FileManager(message);

  const userState = fr.readStateFile();

  store.replaceState({
    ...DEFAULT_STORE_STATE,
    ...userState,
    appDir: message,
  });

  store.subscribe((mutation, state) => fr.writeStateFile(state));

  // TODO: Loading animation?
  // eslint-disable-next-line no-unused-vars
  const vueInstance = new Vue({
    el: '#app',
    render: h => h(App),
    store,
  });
});
