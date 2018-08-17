<template>
  <div class="dashboard-grid-item__edit">
    <div class="dashboard-grid-item-edit__row dashboard-grid-item-edit__row--grow">
      <div class="dashboard-grid-item-edit__content"></div>
      <div class="dashboard-grid-item-edit__resize-east-bar" ref="itemEditWidth" data-resize-mode="ITEM_WIDTH"></div>
    </div>
    <div class="dashboard-grid-item-edit__row">
      <div class="dashboard-grid-item-edit__resize-north-bar" ref="itemEditHeight" data-resize-mode="ITEM_HEIGHT"></div>
      <div class="dashboard-grid-item-edit__resize-south-east-bar" ref="itemEditBoth" data-resize-mode="ITEM_BOTH"></div>
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
      mouseDownMode: null,
      itemPosition: { x: 0, y: 0 },
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
    this.$refs.itemEditWidth.addEventListener('mousedown', this.itemMouseDownListener);
    this.$refs.itemEditHeight.addEventListener('mousedown', this.itemMouseDownListener);
    this.$refs.itemEditBoth.addEventListener('mousedown', this.itemMouseDownListener);

    document.addEventListener('mouseup', this.itemMouseUpListener);
    document.addEventListener('mousemove', this.itemMouseMoveListener);
  },

  beforeDestroy() {
    this.$refs.itemEditWidth.removeEventListener('mousedown', this.itemMouseDownListener);
    this.$refs.itemEditHeight.removeEventListener('mousedown', this.itemMouseDownListener);
    this.$refs.itemEditBoth.removeEventListener('mousedown', this.itemMouseDownListener);

    document.removeEventListener('mouseup', this.itemMouseUpListener);
    document.removeEventListener('mousemove', this.itemMouseMoveListener);
  },

  methods: {
    ...mapMutations({
      changeItemDataSizeWidth: types.mutations.ITEM_DATA_SIZE_WIDTH_CHANGE,
      changeItemDataSizeHeight: types.mutations.ITEM_DATA_SIZE_HEIGHT_CHANGE,
    }),

    itemMouseDownListener(event) {
      this.mouseDownMode = event.target.dataset.resizeMode;
      this.recalculateItemPosition();

      switch (this.mouseDownMode) {
        case 'ITEM_WIDTH':
          document.body.style.cursor = 'e-resize';
          break;
        case 'ITEM_HEIGHT':
          document.body.style.cursor = 'n-resize';
          break;
        case 'ITEM_BOTH':
          document.body.style.cursor = 'se-resize';
          break;
      }

      document.body.style['user-select'] = 'none';
    },

    itemMouseMoveListener(event) {
      if (this.mouseDownMode !== null) {
        if (this.mouseDownMode === 'ITEM_WIDTH' || this.mouseDownMode === 'ITEM_BOTH') {
          const currentWidth = this.item.size.width * this.itemSize;
          const relativeMouseX = event.clientX - this.itemPosition.x - currentWidth;
          if (
            Math.abs(relativeMouseX) >= this.itemSize &&
            !(this.item.size.width == 1 && relativeMouseX < 0)
          ) {
            this.changeItemWidth(Math.ceil(relativeMouseX / this.itemSize));
          }
        }

        if (this.mouseDownMode === 'ITEM_HEIGHT' || this.mouseDownMode === 'ITEM_BOTH') {
          const currentHeight = this.item.size.height * this.itemSize;
          const relativeMouseY = event.clientY - this.itemPosition.y - currentHeight;
          if (
            Math.abs(relativeMouseY) >= this.itemSize &&
            !(this.item.size.height == 1 && relativeMouseY < 0)
          ) {
            this.changeItemHeight(Math.ceil(relativeMouseY / this.itemSize));
          }
        }
      }
    },

    itemMouseUpListener() {
      this.mouseDownMode = null;
      document.body.style.cursor = null;
      document.body.style['user-select'] = null;
    },

    recalculateItemPosition() {
      // Really heavy methode... Maybe a better solution?
      const itemBounding = this.$el.getBoundingClientRect();
      this.itemPosition.x = itemBounding.left;
      this.itemPosition.y = itemBounding.top;
      console.log(this.itemPosition.x);
    },

    changeItemWidth(ammount) {
      const currentWidth = this.item.size.width;
      this.changeItemDataSizeWidth({ id: this.itemId, width: currentWidth + ammount });
      this.recalculateItemPosition();
    },

    changeItemHeight(ammount) {
      const currentHeight = this.item.size.height;
      this.changeItemDataSizeHeight({ id: this.itemId, height: currentHeight + ammount });
      this.recalculateItemPosition();
    },
  },

  computed: {
    ...mapState(['itemData', 'itemSize', 'itemMargin']),

    item() {
      return this.itemData[this.itemId];
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
