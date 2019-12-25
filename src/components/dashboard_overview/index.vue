<template>
  <div>
    <grid>
      <grid-item
        v-for="(extension, key) in extensions"
        :key="key"
        :size="extension.size"
        :max-size="maxItemSize"
        :position="extension.position"
        :editable="itemEditMode"
        @update:size="updateItemSize({ itemId: key, ...$event })"
      >
        <extension :name="extension.name" :size="extension.size" />
      </grid-item>
      <grid-item
        v-show="itemEditMode"
        class="overview__add-extension"
        :size="{ width: 1, height: 1 }"
        :max-size="1"
        :position="{ x: 0, y: 4 }"
        :editable="false"
      >
        <icon-button
          icon="plus"
          class="dashboard-overview__add-extension-button"
          icon-color="gray"
          @click="addNewExtension"
        />
      </grid-item>
    </grid>
  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { listen } from "popmotion";
import throttle from "lodash.throttle";

import Grid from "../dashboard_grid";
import GridItem from "../dashboard_grid_item";
import Extension from "../dashboard_extension";
import IconButton from "../dashboard_button";

import types from "../../store/types";

export default {
  name: "overview",

  components: {
    Grid,
    GridItem,
    Extension,
    IconButton
  },

  data() {
    return {
      windowWidth: 0,
      resizeListener: null
    };
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    this.resizeListener = listen(window, "resize").start(
      throttle(() => {
        this.windowWidth = window.innerWidth;
      }, 66)
    );
  },

  destroyed() {
    this.resizeListener.stop();
  },

  methods: {
    ...mapMutations({
      updateItemSize: types.mutations.UPDATE_ITEM_SIZE_FROM_CURRENT_TAB,
      addExtension: types.mutations.ADD_ITEM_TO_CURRENT_TAB
    }),

    addNewExtension() {
      this.addExtension();
    }
  },

  computed: {
    ...mapGetters({
      extensions: "getModulesFromCurrentTab"
    }),

    ...mapState({
      itemMargin: state => state.settings.itemMargin,
      itemSize: "itemSize",
      itemEditMode: "itemEditMode"
    }),

    maxItemSize() {
      const maxSize = Math.floor(
        (this.windowWidth - this.itemMargin) / (this.itemMargin + this.itemSize)
      );

      return Math.max(maxSize, 1);
    }
  }
};
</script>
<style lang="scss" src="./styles.scss" scoped />
