<template>
  <div class="dashboard-item" :style="style">
    <slot/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'grid_item',

  props: {
    size: {
      type: Object,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {};
  },

  mounted() {},

  computed: {
    ...mapState({
      margin: state => state.settings.itemMargin,
      itemSize: 'itemSize',
    }),

    style() {
      const top = this.margin * (this.position.x + 1) + this.itemSize * this.position.x;
      const left = this.margin * (this.position.y + 1) + this.itemSize * this.position.y;

      return {
        top: `${top}px`,
        left: `${left}px`,
        width: `${this.size.width * this.itemSize}px`,
        height: `${this.size.height * this.itemSize}px`,
      };
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
