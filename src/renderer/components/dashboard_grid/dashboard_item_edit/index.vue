<template>
  <div class="dashboard-grid-item__edit">
    <div class="dashboard-grid-item-edit__container">
      <div class="dashboard-grid-item-edit__content">
      </div>
      <div class="dashboard-grid-item-edit__width">
        <icon-button
          icon="arrow_left"
          class="dashboard-grid-item-edit__left-icon"
          icon-color="dark-gray"
          @click="changeItemWidth(-1)"
        />
        <icon-button
          icon="arrow_right"
          class="dashboard-grid-item-edit__rigth-icon"
          icon-color="dark-gray"
          @click="changeItemWidth(1)"
        />
      </div>
    </div>
    <div class="dashboard-grid-item-edit__height">
      <div class="dashboard-grid-item-edit-height__buttons">
        <icon-button
          icon="arrow_up"
          class="dashboard-grid-item-edit__up-icon"
          icon-color="dark-gray"
          @click="changeItemHeight(-1)"
        />
        <icon-button
          icon="arrow_down"
          class="dashboard-grid-item-edit__down-icon"
          icon-color="dark-gray"
          @click="changeItemHeight(1)"
        />
      </div>
      <div class="dashboard-grid-item-edit-heigth__spacer"></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import IconButton from './../../dashboard_button';

import types from '../../../store/types';

export default {
  name: 'item-edit',

  data() {
    return {};
  },

  props: {
    itemId: {
      type: Number,
      required: true,
    },
  },

  components: {
    IconButton,
  },

  methods: {
    ...mapMutations({
      changeItemDataSizeWidth: types.mutations.ITEM_DATA_SIZE_WIDTH_CHANGE,
      changeItemDataSizeHeight: types.mutations.ITEM_DATA_SIZE_HEIGHT_CHANGE,
    }),
    changeItemWidth(ammount) {
      const currentWidth = this.itemData[this.itemId].size.width;
      this.changeItemDataSizeWidth({ id: this.itemId, width: currentWidth + ammount });
    },

    changeItemHeight(ammount) {
      const currentHeight = this.itemData[this.itemId].size.height;
      this.changeItemDataSizeHeight({ id: this.itemId, height: currentHeight + ammount });
    },
  },

  computed: {
    ...mapState(['itemData']),
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
