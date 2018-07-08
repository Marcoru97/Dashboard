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
};
