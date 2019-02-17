import Vue from 'vue';
import types from './types';

export default {
  // WARNING: Changes are not always reactive!
  [types.mutations.UPDATE_ITEM_FROM_CURRENT_TAB](state, { itemId, newItemData }) {
    const currentTab = state.tabs[state.activeTabId];

    currentTab.modules[itemId] = {
      ...currentTab.modules[itemId],
      ...newItemData,
    };
  },

  [types.mutations.UPDATE_ITEM_SIZE_FROM_CURRENT_TAB](state, { itemId, width, height }) {
    const currentTab = state.tabs[state.activeTabId];

    currentTab.modules[itemId].size.width = width;
    currentTab.modules[itemId].size.height = height;
  },

  [types.mutations.ADD_ITEM_TO_CURRENT_TAB](state, item) {
    const currentTab = state.tabs[state.activeTabId];

    currentTab.modules.push({
      name: '',
      size: { width: 1, height: 1 },
      ...item,
      position: currentTab.modules.length,
    });
  },

  [types.mutations.REMOVE_ITEM_FROM_CURRENT_TAB](state, itemId) {
    const currentTab = state.tabs[state.activeTabId];

    currentTab.modules.splice(itemId, 1);
  },

  [types.mutations.ADD_TAB](state, tab) {
    state.tabs.push({
      display_name: 'Tab',
      version: 0.1,
      last_update: 0,
      modules: [],
      position: state.tabs.length,
      ...tab,
    });
  },

  [types.mutations.SET_SETTINGS](state, settings) {
    Vue.set(state.settings, 'itemMargin', settings.itemMargin || 5);
    Vue.set(state.settings, 'showSettingsIcon', settings.showSettingsIcon || true);
  },

  [types.mutations.CONFIG_DIR_SET](state, dir) {
    state.appDir = dir;
  },

  [types.mutations.ITEM_EDIT_MODE_CHANGE](state, visible) {
    state.itemEditMode = visible;
  },

  [types.mutations.CHANGE_SETTINGS_VISIBLE_CHANGE](state, visibility) {
    state.settingsVisible = visibility;
  },
};
