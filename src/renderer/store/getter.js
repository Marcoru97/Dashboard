export default {
  getCurrentTab: state => {
    return state.tabs[state.activeTabId];
  },

  getModule: state => id => {
    return state.tabs[state.activeTabId].modules[id];
  },

  getModulesOfCurrentTab: state => {
    return state.tabs[state.activeTabId].modules;
  },
};
