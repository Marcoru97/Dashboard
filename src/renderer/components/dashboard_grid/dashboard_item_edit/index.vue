<template>
  <div class="dashboard-grid-item__edit">
    <div class="dashboard-grid-item-edit__row dashboard-grid-item-edit__row--grow">
      <div class="dashboard-grid-item-edit__content" ref="itemEditMove" data-action="MOVE">
        <icon-button
          icon="settings"
          icon-color="light-gray"
          class="dashboard-grid-item-edit__settings-button"
        ></icon-button>
      </div>
      <div
        class="dashboard-grid-item-edit__resize-east-bar"
        ref="itemEditWidth"
        data-action="WIDTH"
      ></div>
    </div>
    <div class="dashboard-grid-item-edit__row">
      <div
        class="dashboard-grid-item-edit__resize-north-bar"
        ref="itemEditHeight"
        data-action="HEIGHT"
      ></div>
      <div
        class="dashboard-grid-item-edit__resize-south-east-bar"
        ref="itemEditBoth"
        data-action="WIDTH_HEIGHT"
      ></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

import IconButton from './../../dashboard_button';
import types from '../../../store/types';

export default {
  name: 'item-edit',

  data() {
    return {
      mouseDownMode: null,
      itemPosition: { x: 0, y: 0 },

      cursorOffsetPosition: { x: 0, y: 0 },
      clonedItem: null,
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
    this.$refs.itemEditMove.addEventListener('mousedown', this.itemMouseDownListener);

    document.addEventListener('mouseup', this.itemMouseUpListener);
    document.addEventListener('mousemove', this.itemMouseMoveListener);
  },

  beforeDestroy() {
    this.$refs.itemEditWidth.removeEventListener('mousedown', this.itemMouseDownListener);
    this.$refs.itemEditHeight.removeEventListener('mousedown', this.itemMouseDownListener);
    this.$refs.itemEditBoth.removeEventListener('mousedown', this.itemMouseDownListener);
    this.$refs.itemEditMove.removeEventListener('mousedown', this.itemMouseDownListener);

    document.removeEventListener('mouseup', this.itemMouseUpListener);
    document.removeEventListener('mousemove', this.itemMouseMoveListener);
  },

  methods: {
    ...mapMutations({
      updateItemSize: types.mutations.UPDATE_ITEM_SIZE_FROM_CURRENT_TAB,
    }),

    itemMouseDownListener(event) {
      this.mouseDownMode = event.target.dataset.action;
      this.recalculateItemPosition();

      this.cursorOffsetPosition = {
        x: event.clientX - this.itemPosition.x,
        y: event.clientY - this.itemPosition.y,
      };

      switch (this.mouseDownMode) {
        case 'WIDTH':
          document.body.style.cursor = 'e-resize';
          break;
        case 'HEIGHT':
          document.body.style.cursor = 'n-resize';
          break;
        case 'WIDTH_HEIGHT':
          document.body.style.cursor = 'se-resize';
          break;
        case 'MOVE': {
          document.body.style.cursor = 'all-scroll';
          const itemElement = this.$el.parentElement;
          this.clonedItem = itemElement.cloneNode(true);
          this.clonedItem.classList.add('dashboard-grid-item--drag');
          this.$root.$el.appendChild(this.clonedItem);

          const xPos = event.clientX - this.cursorOffsetPosition.x;
          const yPos = event.clientY - this.cursorOffsetPosition.y;

          this.clonedItem.style.transform = `translate(${xPos}px, ${yPos}px)`;
          break;
        }
        default:
      }

      document.body.style['user-select'] = 'none';
    },

    itemMouseMoveListener(event) {
      if (this.mouseDownMode !== null) {
        if (this.mouseDownMode === 'WIDTH' || this.mouseDownMode === 'WIDTH_HEIGHT') {
          const currentWidth = this.item.size.width * this.itemSize;
          const relativeMouseX = event.clientX - this.itemPosition.x - currentWidth;

          if (
            Math.abs(relativeMouseX) >= this.itemSize &&
            !(this.item.size.width === 1 && relativeMouseX < 0)
          ) {
            this.changeItemWidth(Math.ceil(relativeMouseX / this.itemSize));
          }
        }

        if (this.mouseDownMode === 'HEIGHT' || this.mouseDownMode === 'WIDTH_HEIGHT') {
          const currentHeight = this.item.size.height * this.itemSize;
          const relativeMouseY = event.clientY - this.itemPosition.y - currentHeight;
          if (
            Math.abs(relativeMouseY) >= this.itemSize &&
            !(this.item.size.height === 1 && relativeMouseY < 0)
          ) {
            this.changeItemHeight(Math.ceil(relativeMouseY / this.itemSize));
          }
        }

        if (this.mouseDownMode === 'MOVE') {
          const xPos = event.clientX - this.cursorOffsetPosition.x;
          const yPos = event.clientY - this.cursorOffsetPosition.y;

          this.clonedItem.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
      }
    },

    itemMouseUpListener() {
      this.mouseDownMode = null;
      document.body.style.cursor = null;
      document.body.style['user-select'] = null;

      if (this.clonedItem !== null) {
        this.$root.$el.removeChild(this.clonedItem);
      }
    },

    recalculateItemPosition() {
      // Really heavy methode... Maybe a better solution?
      const itemBounding = this.$el.getBoundingClientRect();
      this.itemPosition.x = itemBounding.left;
      this.itemPosition.y = itemBounding.top;
    },

    changeItemWidth(ammount) {
      this.changeItemSize(ammount, 0);
    },

    changeItemHeight(ammount) {
      this.changeItemSize(0, ammount);
    },

    changeItemSize(width, height) {
      const currentWidth = this.item.size.width;
      const currentHeight = this.item.size.height;
      this.updateItemSize({
        itemId: this.itemId,
        width: currentWidth + width,
        height: currentHeight + height,
      });
      this.recalculateItemPosition();
    },
  },

  computed: {
    ...mapState(['itemData', 'itemSize']),
    ...mapGetters(['getModuleFromCurrentTab']),

    item() {
      return this.getModuleFromCurrentTab(this.itemId);
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped>
</style>
<style lang="scss">
.dashboard-grid-item--drag {
  position: absolute !important;
}
</style>
