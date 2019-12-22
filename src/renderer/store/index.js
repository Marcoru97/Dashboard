import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import getters from './getter';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Currently a const value
    itemSize: 250,

    availableExtensions: new Set(),

    tabs: [],
    activeTabId: 0,

    settings: {},

    appDir: '',

    itemEditMode: false,
    settingsVisible: false,
  },

  mutations,
  getters,
  actions,
});
