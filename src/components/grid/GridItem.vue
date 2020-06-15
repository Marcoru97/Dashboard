<template>
  <div class="grid-item" :style="itemSize">
    <div class="grid-item__edit-wrapper" v-show="editable">
      <div class="grid-item__edit-move" />
      <div class="grid-item__edit-scale-x" />
      <div class="grid-item__edit-scale-y" />
      <div class="grid-item__edit-scale-xy" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "grid-item",

  props: {
    size: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    itemSize() {
      return {
        "grid-column-start": `span ${this.size.width}`,
        "grid-row-start": `span ${this.size.height}`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$edit-border-size: 2px;

.grid-item {
  position: relative;
  background-color: gray;
}

.grid-item__edit-wrapper {
  display: grid;
  grid-template-columns: auto $edit-border-size;
  grid-template-rows: auto $edit-border-size;
  position: absolute;
  width: 100%;
  height: 100%;
}

.grid-item__edit-move {
  cursor: move;
}

.grid-item__edit-scale-x {
  background: #fff;
  cursor: ew-resize;
}

.grid-item__edit-scale-y {
  background: #fff;
  cursor: ns-resize;
}

.grid-item__edit-scale-xy {
  background: #fff;
  cursor: nw-resize;
}
</style>
