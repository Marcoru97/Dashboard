export default {
  getCurrentTab: state => {
    return state.tabs[state.activeTabId];
  },

  getModuleFromCurrentTab: state => id => {
    return state.tabs[state.activeTabId].modules[id];
  },

  getModulesFromCurrentTab: state => {
    return state.tabs[state.activeTabId].modules;
  },
};
