<template>
  <div class="dashboard-grid-item__edit">
    <div class="dashboard-grid-item-edit__row dashboard-grid-item-edit__row--grow">
      <div class="dashboard-grid-item-edit__content"></div>
      <div class="dashboard-grid-item-edit__resize-east-bar" ref="itemEditWidth"></div>
    </div>
    <div class="dashboard-grid-item-edit__row">
      <div class="dashboard-grid-item-edit__resize-north-bar" ref="itemEditHeight"></div>
      <div class="dashboard-grid-item-edit__resize-south-east-bar" ref="itemEditBoth"></div>
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
    return {
      bodyElement: null,

      mouseDownMode: null,
    };
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

  mounted() {
    this.bodyElement = document.getElementsByTagName('body')[0];
    this.$refs.itemEditWidth.addEventListener('mousedown', this.itemWidthMouseDownListener);
    this.$refs.itemEditHeight.addEventListener('mousedown', this.itemHeightMouseDownListener);
    this.$refs.itemEditBoth.addEventListener('mousedown', this.itemBothMouseDownListener);

    document.addEventListener('mouseup', this.itemMouseUpListener);
    document.addEventListener('mousemove', this.itemMouseMoveListener);
  },

  beforeDestroy() {
    this.$refs.itemEditWidth.removeEventListener('mousedown', this.itemWidthMouseDownListener);
    this.$refs.itemEditHeight.removeEventListener('mousedown', this.itemHeightMouseDownListener);
    this.$refs.itemEditBoth.removeEventListener('mousedown', this.itemBothMouseDownListener);

    document.removeEventListener('mouseup', this.itemMouseUpListener);
    document.removeEventListener('mousemove', this.itemMouseMoveListener);
  },

  methods: {
    ...mapMutations({
      changeItemDataSizeWidth: types.mutations.ITEM_DATA_SIZE_WIDTH_CHANGE,
      changeItemDataSizeHeight: types.mutations.ITEM_DATA_SIZE_HEIGHT_CHANGE,
    }),

    itemMouseMoveListener(event) {
      if (this.mouseDownMode !== null) {
        switch (this.mouseDownMode) {
          case 'ITEM_WIDTH':
            {
              const currentWidth = this.itemData[this.itemId].size.width * this.itemSize;
              if (Math.abs(event.clientX - currentWidth) >= 250) {
                this.changeItemWidth(Math.ceil((event.clientX - currentWidth) / 250));
              }
            }
            break;
          case 'ITEM_HEIGHT':
            {
              const currentHeight = this.itemData[this.itemId].size.height * this.itemSize;
              if (Math.abs(event.clientY - currentHeight) >= 250) {
                this.changeItemHeight(Math.ceil((event.clientY - currentHeight) / 250));
              }
            }
            break;
          case 'ITEM_BOTH':
            {
              const currentWidth = this.itemData[this.itemId].size.width * this.itemSize;
              const currentHeight = this.itemData[this.itemId].size.height * this.itemSize;
              if (Math.abs(event.clientY - currentHeight) >= 250) {
                this.changeItemHeight(Math.ceil((event.clientY - currentHeight) / 250));
              }
              if (Math.abs(event.clientX - currentWidth) >= 250) {
                this.changeItemWidth(Math.ceil((event.clientX - currentWidth) / 250));
              }
            }
            break;
        }
      }
    },

    itemWidthMouseDownListener() {
      this.mouseDownMode = 'ITEM_WIDTH';
      this.bodyElement.style.cursor = 'e-resize';
      this.bodyElement.style['user-select'] = 'none';
    },

    itemHeightMouseDownListener() {
      this.mouseDownMode = 'ITEM_HEIGHT';
      this.bodyElement.style.cursor = 'n-resize';
      this.bodyElement.style['user-select'] = 'none';
    },

    itemBothMouseDownListener() {
      this.mouseDownMode = 'ITEM_BOTH';
      this.bodyElement.style.cursor = 'se-resize';
      this.bodyElement.style['user-select'] = 'none';
    },

    itemMouseUpListener() {
      this.mouseDownMode = null;
      this.bodyElement.style.cursor = null;
      this.bodyElement.style['user-select'] = null;
    },

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
    ...mapState(['itemData', 'itemSize', 'itemMargin']),
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
