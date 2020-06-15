export default {
  getCurrentTab: (state) => state.tabs[state.activeTabId],

  getModuleFromCurrentTab(state, id) {
    if (!state.tabs[state.activeTabId]) {
      return {};
    }
    return state.tabs[state.activeTabId].modules[id];
  },

  getModulesFromCurrentTab(state) {
    if (!state.tabs[state.activeTabId]) {
      return [];
    }
    return state.tabs[state.activeTabId].modules;
  },
};
