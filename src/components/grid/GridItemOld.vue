<template>
  <div class="grid-item__container" :style="itemStyle">
    <div class="grid-item__editable-wrapper" v-show="editable" ref="itemEdit">
      <div class="grid-item__editable-row grid-item__editable-row--growed">
        <div data-mode="MOVE" class="grid-item__editable-move"></div>
        <div data-mode="X-SCALE" class="grid-item__editable-scale-x"></div>
      </div>
      <div class="grid-item__editable-row">
        <div data-mode="Y-SCALE" class="grid-item__editable-scale-y"></div>
        <div data-mode="XY-SCALE" class="grid-item__editable-scale-xy"></div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
// TODO: Make it more abstract without extension information.
// Pass them as props
import { mapState } from "vuex";
import { listen, pointer, tween, easing } from "popmotion";

export default {
  name: "grid-item",

  props: {
    size: {
      type: Object,
      required: true
    },
    maxSize: {
      type: Number,
      required: true
    },
    position: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      mouseDownListener: null,
      mouseUpListener: null,
      dragPointer: null,
      scalePointer: null,
      // Actuall position of the div
      pixelPosition: { x: 0, y: 0 },
      editMode: ""
    };
  },

  mounted() {
    this.mouseDownListener = listen(this.$refs.itemEdit, "mousedown").start(
      e => {
        this.editMode = e.target.dataset.mode || "";
      }
    );

    this.mouseUpListener = listen(window, "mouseup").start(() => {
      this.editMode = "";
    });
  },

  destroyed() {
    if (this.mouseDownListener) {
      this.mouseDownListener.stop();
    }
    if (this.mouseUpListener) {
      this.mouseUpListener.stop();
    }
  },

  watch: {
    editMode(newMode, oldMode) {
      if (newMode !== "") {
        switch (newMode) {
          case "MOVE":
            document.body.style.cursor = "move";
            this.dragPointer = pointer(this.pixelPosition).start(({ x, y }) => {
              this.pixelPosition.x = x;
              this.pixelPosition.y = y;
            });
            break;

          case "X-SCALE":
            document.body.style.cursor = "ew-resize";
            this.scalePointer = pointer({ x: this.pixelSize.width }).start(
              ({ x }) => {
                const width = Math.ceil(x / this.itemSize);
                this.$emit("update:size", {
                  width,
                  height: this.size.height || 0
                });
              }
            );
            break;

          case "Y-SCALE":
            document.body.style.cursor = "ns-resize";
            this.scalePointer = pointer({ y: this.pixelSize.height }).start(
              ({ y }) => {
                const height = Math.ceil(y / this.itemSize);
                this.$emit("update:size", {
                  width: this.size.width || 0,
                  height
                });
              }
            );
            break;

          case "XY-SCALE":
            document.body.style.cursor = "nw-resize";
            this.scalePointer = pointer({
              x: this.pixelSize.width,
              y: this.pixelSize.height
            }).start(({ x, y }) => {
              const width = Math.ceil(x / this.itemSize);
              const height = Math.ceil(y / this.itemSize);
              this.$emit("update:size", { width, height });
            });
            break;

          default:
        }

        document.body.style["user-select"] = "none";
      } else {
        // edit action has finished
        switch (oldMode) {
          case "MOVE":
            tween({
              from: this.pixelPosition,
              to: this.calculatePixelPosition(this.position),
              duration: 200,
              ease: easing.easeIn
            }).start(({ x, y }) => {
              this.pixelPosition.x = x;
              this.pixelPosition.y = y;
            });
            break;

          case "X-SCALE":
            document.body.style.cursor = "ew-resize";
            break;

          case "Y-SCALE":
            document.body.style.cursor = "ns-resize";
            break;

          case "XY-SCALE":
            document.body.style.cursor = "nw-resize";
            break;

          default:
        }

        if (this.dragPointer) {
          this.dragPointer.stop();
          this.dragPointer = null;
        }

        if (this.scalePointer) {
          this.scalePointer.stop();
          this.scalePointer = null;
        }

        // Reset all styles to the default value
        document.body.style.cursor = null;
        document.body.style["user-select"] = null;
      }
    },

    position: {
      immediate: true,

      handler(newPosition) {
        this.pixelPosition = this.calculatePixelPosition(newPosition);
      }
    }
  },

  methods: {
    calculatePixelPosition(position) {
      return {
        x: this.margin * (position.x + 1) + this.itemSize * position.x,
        y: this.margin * (position.y + 1) + this.itemSize * position.y
      };
    }
  },

  computed: {
    ...mapState({
      margin: state => state.settings.itemMargin,
      itemSize: "itemSize"
    }),

    itemStyle() {
      return {
        top: `${this.pixelPosition.y}px`,
        left: `${this.pixelPosition.x}px`,
        width: `${this.pixelSize.width}px`,
        height: `${this.pixelSize.height}px`
      };
    },

    pixelSize() {
      const sizeWidth = Math.min(this.size.width, this.maxSize);
      const sizeHeight = Math.min(this.size.height, this.maxSize);

      return {
        width: sizeWidth * this.itemSize,
        height: sizeHeight * this.itemSize
      };
    }
  }
};
</script>
<style lang="scss" scoped>
$editbar-size: 4px;

.grid-item__container {
  position: absolute;
}

.grid-item__editable-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.grid-item__editable-row--growed {
  flex-grow: 1;
}

.grid-item__editable-row {
  display: flex;
  flex-direction: row;
}

.grid-item__editable-move {
  flex-grow: 1;
  cursor: move;
}

.grid-item__editable-scale-x {
  width: $editbar-size;
  background: #000;
  cursor: ew-resize;
}

.grid-item__editable-scale-y {
  flex-grow: 1;
  height: $editbar-size;
  background: #000;
  cursor: ns-resize;
}

.grid-item__editable-scale-xy {
  width: $editbar-size;
  height: $editbar-size;
  background: #000;
  cursor: nw-resize;
}
</style>
