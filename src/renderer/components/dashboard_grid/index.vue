<template>
  <div class="dashboard-grid__grid" ref="dashboardGrid">
    <div
      v-for="(item, key) in getModulesFromCurrentTab"
      class="dashboard-grid-item__wrapper"
      :key="item.position"
      :data-key="key"
      ref="dashboardGridItems"
    >
      <transition name="dashboard-grid-item--animation">
        <item-edit v-show="itemEditMode" :item-id="key"/>
      </transition>
      <item :extension="item.module" :extension-size="item.size"/>
    </div>
    <div v-show="itemEditMode" class="dashboard-grid__new-item">
      <icon-button
        @click="addItemOnClick"
        icon="plus"
        class="dashboard-grid-new-item__plus-button"
        icon-color="dark-gray"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { throttle } from './../../helpers';

import IconButton from './../dashboard_button';
import ItemEdit from './dashboard_item_edit';
import Item from './dashboard_item';

import types from '../../store/types';

export default {
  name: 'grid',

  data() {
    return {
      windowWidth: 0,
      isDirty: false,
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
    Item,
  },

  mounted() {
    this.windowWidth = this.$refs.dashboardGrid.clientWidth;
    this.isDirty = true;
    window.addEventListener('resize', this.resizeEventListener);
  },

  updated() {
    // TODO: Handle it better
    if (this.isDirty) {
      this.updateStyle();
    }
  },

  destroyed() {
    window.removeEventListener('resize', this.resizeEventListener);
  },

  methods: {
    ...mapMutations({
      addItemData: types.mutations.ADD_ITEM_TO_CURRENT_TAB,
    }),

    updateStyle() {
      const items = this.$refs.dashboardGridItems;
      const margin = 10;
      const boxSize = 250;

      if (!items) return;
      items.forEach(item => {
        const itemSize = this.getModule(item.dataset.key).size;
        const newWidth = Math.min(this.getMaxWidthUnits, itemSize.width);
        const resultWidth = newWidth * boxSize + (newWidth - 1) * margin;
        const resultHeight = itemSize.height * boxSize + (itemSize.height - 1) * margin;

        item.style.width = `${resultWidth}px`;
        item.style.height = `${resultHeight}px`;
      });
    },

    resizeEventListener() {
      throttle(() => {
        this.windowWidth = this.$refs.dashboardGrid.clientWidth;
        this.updateStyle();
      })();
    },

    addItemOnClick() {
      this.addItemData({
        name: 'New Item',
        size: { width: 1, height: 1 },
      });
    },
  },

  computed: {
    ...mapState(['tabs', 'itemEditMode']),
    ...mapGetters(['getCurrentTab', 'getModule', 'getModulesFromCurrentTab']),

    getMaxWidthUnits() {
      return Math.floor(this.windowWidth / (250 + 10));
    },
  },

  watch: {
    tabs: {
      handler(oldVal, newVal) {
        this.updateStyle();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
