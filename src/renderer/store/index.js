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

    tabs: [],
    activeTabId: 0,

    settings: {},
    appDir: '',

    itemEditMode: false,
  },

  mutations,
  getters,
  actions,
});
