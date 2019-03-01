<template>
  <div>
    <grid>
      <grid-item
        v-for="(extension, key) in extensions"
        :key="key"
        :size="extension.size"
        :max-size="maxItemSize"
        :position="extension.position"
        :editable="true"
      >
        <extension :name="extension.module" :size="extension.size"/>
      </grid-item>
    </grid>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import { listen } from 'popmotion';
import throttle from 'lodash.throttle';

import Grid from '../dashboard_grid';
import GridItem from '../dashboard_grid_item';
import Extension from '../dashboard_extension';

export default {
  name: 'overview',

  components: {
    Grid,
    GridItem,
    Extension,
  },

  data() {
    return {
      windowWidth: 0,
      resizeListener: null,
    };
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    this.resizeListener = listen(window, 'resize').start(
      throttle(() => {
        this.windowWidth = window.innerWidth;
      }, 66),
    );
  },

  destroyed() {
    this.resizeListener.stop();
  },

  computed: {
    ...mapGetters({
      extensions: 'getModulesFromCurrentTab',
    }),

    ...mapState({
      itemMargin: state => state.settings.itemMargin,
      itemSize: 'itemSize',
    }),

    maxItemSize() {
      const maxSize = Math.floor(
        (this.windowWidth - this.itemMargin) / (this.itemMargin + this.itemSize),
      );

      return Math.max(maxSize, 1);
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
