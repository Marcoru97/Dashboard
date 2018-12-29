<template>
  <div class="dashboard-grid__grid" ref="dashboardGrid">
    <div
      v-for="(item, key) in modules"
      class="dashboard-grid-item__wrapper"
      :key="item.position"
      :style="item.style"
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
    window.addEventListener('resize', this.resizeEventListener);
  },

  destroyed() {
    window.removeEventListener('resize', this.resizeEventListener);
  },

  methods: {
    ...mapMutations({
      addItemData: types.mutations.ADD_ITEM_TO_CURRENT_TAB,
    }),

    resizeEventListener() {
      throttle(() => {
        this.windowWidth = this.$refs.dashboardGrid.clientWidth;
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
    ...mapState(['itemSize', 'settings', 'tabs', 'itemEditMode']),
    ...mapGetters(['getCurrentTab', 'getModuleFromCurrentTab', 'getModulesFromCurrentTab']),

    modules() {
      // Copy the module array so we don't mess up the store.
      const modules = [...this.getModulesFromCurrentTab];
      const margin = this.settings.itemMargin;

      modules.forEach(itemModul => {
        const newWidth = Math.min(this.maxWidthUnits, itemModul.size.width);
        const resultWidth = newWidth * this.itemSize + (newWidth - 1) * margin;
        const resultHeight =
          itemModul.size.height * this.itemSize + (itemModul.size.height - 1) * margin;

        itemModul.style = {
          width: `${resultWidth}px`,
          height: `${resultHeight}px`,
        };
      });

      return modules;
    },

    maxWidthUnits() {
      return Math.floor(this.windowWidth / (250 + 10));
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
