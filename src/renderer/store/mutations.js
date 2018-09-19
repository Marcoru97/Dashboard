import types from './types';

export default {
  [types.mutations.ITEM_DATA_ADD](state, data) {
    state.itemData.push({
      ...{
        position: state.itemId,
        name: '',
        size: { width: 1, height: 1 },
      },
      ...data,
    });
    state.itemId++;
  },

  [types.mutations.ITEM_DATA_SIZE_WIDTH_CHANGE](state, { id, width }) {
    state.itemData[id].size.width = Math.max(width, 1);
  },

  [types.mutations.ITEM_DATA_SIZE_HEIGHT_CHANGE](state, { id, height }) {
    state.itemData[id].size.height = Math.max(height, 1);
  },

  [types.mutations.SETTINGS_ICON_VISIBLE_CHANGE](state, visible) {
    state.settingsIconVisible = visible;
  },

  [types.mutations.ITEM_EDIT_MODE_CHANGE](state, visible) {
    state.itemEditMode = visible;
  },

  [types.mutations.CONFIG_DIR_SET](state, dir) {
    state.appDir = dir;
  },
};
