export default {
  getCurrentTab: state => state.tabs[state.activeTabId],

  getModuleFromCurrentTab: state => id => state.tabs[state.activeTabId].modules[id],

  getModulesFromCurrentTab: state => state.tabs[state.activeTabId].modules,
};
