import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import getter from './mutations';
import actions from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemData: [],
    itemId: 0,
  },

  mutations,
  getter,
  actions,
});
