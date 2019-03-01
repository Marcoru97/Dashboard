<template>
  <div class="dashboard-item__container" :style="style">
    <div class="dashboard-item__editable-wrapper" ref="itemEdit">
      <div class="dashboard-item__editable-row dashboard-item__editable-row--growed">
        <div data-mode="MOVE" class="dashboard-item__editable-move"></div>
        <div data-mode="X-SCALE" class="dashboard-item__editable-scale-x"></div>
      </div>
      <div class="dashboard-item__editable-row">
        <div data-mode="Y-SCALE" class="dashboard-item__editable-scale-y"></div>
        <div data-mode="XY-SCALE" class="dashboard-item__editable-scale-xy"></div>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { listen, pointer, tween, easing } from 'popmotion';

export default {
  name: 'grid_item',

  props: {
    size: {
      type: Object,
      required: true,
    },
    maxSize: {
      type: Number,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      mouseDownListener: null,
      mouseMoveListener: null,
      mouseUpListener: null,
      pointer: null,
      pixelPosition: { x: 0, y: 0 },
      editMode: '',
    };
  },

  mounted() {
    this.mouseDownListener = listen(this.$refs.itemEdit, 'mousedown').start(e => {
      this.editMode = e.target.dataset.mode || '';
    });
    this.mouseMoveListener = listen(window, 'mousemove').start(() => {});
    this.mouseUpListener = listen(window, 'mouseup').start(() => {
      this.editMode = '';
    });
  },

  destroyed() {
    this.mouseDownListener.stop();
    this.mouseMoveListener.stop();
    this.mouseUpListener.stop();
  },

  watch: {
    editMode(newMode, oldMode) {
      if (newMode !== '') {
        switch (newMode) {
          case 'MOVE':
            document.body.style.cursor = 'move';
            this.pointer = pointer(this.pixelPosition).start(({ x, y }) => {
              this.pixelPosition.x = x;
              this.pixelPosition.y = y;
            });
            break;

          case 'X-SCALE':
            document.body.style.cursor = 'ew-resize';
            break;

          case 'Y-SCALE':
            document.body.style.cursor = 'ns-resize';
            break;

          case 'XY-SCALE':
            document.body.style.cursor = 'nw-resize';
            break;

          default:
        }

        document.body.style['user-select'] = 'none';
      } else {
        switch (oldMode) {
          case 'MOVE':
            this.pointer.stop();
            this.pointer = null;

            tween({
              from: this.pixelPosition,
              to: this.calculatePixelPosition(this.position),
              duration: 200,
              ease: easing.easeIn,
            }).start(({ x, y }) => {
              this.pixelPosition.x = x;
              this.pixelPosition.y = y;
            });
            break;

          case 'X-SCALE':
            document.body.style.cursor = 'ew-resize';
            break;

          case 'Y-SCALE':
            document.body.style.cursor = 'ns-resize';
            break;

          case 'XY-SCALE':
            document.body.style.cursor = 'nw-resize';
            break;

          default:
        }

        // Reset all styles to the default value
        document.body.style.cursor = null;
        document.body.style['user-select'] = null;
      }
    },

    position: {
      immediate: true,

      handler(newPosition) {
        this.pixelPosition = this.calculatePixelPosition(newPosition);
      },
    },
  },

  methods: {
    calculatePixelPosition(position) {
      return {
        x: this.margin * (position.x + 1) + this.itemSize * position.x,
        y: this.margin * (position.y + 1) + this.itemSize * position.y,
      };
    },
  },

  computed: {
    ...mapState({
      margin: state => state.settings.itemMargin,
      itemSize: 'itemSize',
    }),

    style() {
      return {
        top: `${this.pixelPosition.y}px`,
        left: `${this.pixelPosition.x}px`,
        width: `${this.sizeWidth * this.itemSize}px`,
        height: `${this.sizeHeight * this.itemSize}px`,
      };
    },

    sizeWidth() {
      return Math.min(this.size.width, this.maxSize);
    },

    sizeHeight() {
      return Math.min(this.size.height, this.maxSize);
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
