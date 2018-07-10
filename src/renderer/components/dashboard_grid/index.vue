<template>
    <div class="dashboard-grid__grid" ref="dashboardGrid">
      <div v-for="(item, key) in itemData" class="dashboard-grid-item__wrapper" :style="calculateSize(item.size)" :key="item.position">
        <transition name="dashboard-grid-item--animation">
          <item-edit v-show="!settingsVisible" :item-id="key"/>
        </transition>
        <async-example>({{item.position}}) {{item.name}}</async-example>
      </div>
      <div class="dashboard-grid__new-item">
        <icon-button @click="addItemOnClick" icon="plus" class="dashboard-grid-new-item__plus-button" icon-color="dark-gray" />
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

import IconButton from './../dashboard_button';
import ItemEdit from './dashboard_item_edit';

import types from '../../store/types';

import { throttle } from './../../helpers';

Vue.component('async-example', function(resolve, reject) {
  setTimeout(function() {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div><slot></slot></div>',
    });
  }, 1000);
});

export default {
  name: 'grid',

  data() {
    return {
      windowWidth: 0,
    };
  },

  props: {
    settingsVisible: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    IconButton,
    ItemEdit,
  },

  mounted() {
    this.windowWidth = this.$refs.dashboardGrid.clientWidth;
    window.addEventListener(
      'resize',
      throttle(() => {
        this.windowWidth = this.$refs.dashboardGrid.clientWidth;
      }),
    );
  },

  destroyed() {
    window.removeEventListener(
      'resize',
      throttle(() => {
        this.windowWidth = this.$refs.dashboardGrid.clientWidth;
      }),
    );
  },

  methods: {
    ...mapMutations({
      addItemData: types.mutations.ITEM_DATA_ADD,
    }),

    calculateSize({ width, height }) {
      const margin = 10;
      const boxSize = 250;
      const newWidth = Math.min(this.getMaxWidthUnits, width);
      const resultWidth = newWidth * boxSize + (newWidth - 1) * margin;
      const resultHeight = height * boxSize + (height - 1) * margin;

      return {
        width: `${resultWidth}px`,
        height: `${resultHeight}px`,
      };
    },

    addItemOnClick() {
      this.addItemData({
        name: 'New Item',
        size: { width: 1, height: 1 },
      });
    },
  },

  computed: {
    ...mapState(['itemData']),

    getMaxWidthUnits() {
      return Math.floor(this.windowWidth / (250 + 10));
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
