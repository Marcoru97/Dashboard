export default {
  getCurrentTab: state => {
    return state.tabs[state.currentTabId];
  },

  getModule: state => id => {
    return state.tabs[state.currentTabId].modules[id];
  },

  getModulesOfCurrentTab: state => {
    return state.tabs[state.currentTabId].modules;
  },
};
