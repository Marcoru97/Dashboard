<template>
  <div class="grid__wrapper">
    <div class="grid" :style="gridStyle">
      <grid-item
        v-for="(item, index) in items"
        :key="index"
        :size="item.size"
        editable
      >
        test
      </grid-item>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { listen } from "popmotion";
import throttle from "lodash.throttle";
import GridItem from "@/components/grid/GridItem";

export default {
  name: "grid",

  components: {
    GridItem
  },

  props: {
    items: Array
  },

  data() {
    return {
      windowWidth: 0,
      resizeListener: null
    };
  },

  mounted() {
    this.windowWidth = document.body.clientWidth;
    this.resizeListener = listen(window, "resize").start(
      throttle(() => {
        this.windowWidth = document.body.clientWidth;
      }, 66)
    );
  },

  destroyed() {
    this.resizeListener.stop();
  },

  computed: {
    ...mapState({
      itemMargin: state => state.settings.itemMargin,
      itemSize: "itemSize",
      itemEditMode: "itemEditMode"
    }),

    itemLength() {
      return this.items.reduce(
        (acc, value) => acc + value.size.width * value.size.height,
        0
      );
    },

    maxItemsPerRow() {
      const maxSize =
        (this.windowWidth - this.itemMargin) /
        (this.itemMargin + this.itemSize);
      return Math.max(Math.floor(maxSize), 1);
    },

    columnsNeeded() {
      return Math.ceil(this.itemLength / this.maxItemsPerRow);
    },

    gridStyle() {
      return {
        width: `calc(100% - ${this.itemMargin * 2}px)`,
        margin: `${this.itemMargin}px`,
        // "grid-template-columns": `repeat(${this.maxItemsPerRow}, ${this.itemSize}px)`,
        // "grid-template-rows": `repeat(auto-fit, ${this.itemSize}px)`,
        "grid-gap": `${this.itemMargin}px ${this.itemMargin}px`
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.grid__wrapper {
  height: 100%;
}

.grid {
  display: grid;
  grid-auto-columns: 250px;
  grid-auto-rows: 250px;
}
</style>
