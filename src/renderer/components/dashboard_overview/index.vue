<template>
  <div>
    <grid>
      <grid-item
        v-for="(itemModule, key) in getModulesFromCurrentTab()"
        :key="key"
        :extension="itemModule.module"
        :extensionSize="itemModule.size"
      />
    </grid>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import Grid from '../dashboard_grid';
import GridItem from '../dashboard_grid_item';

export default {
  name: 'overview',

  components: {
    Grid,
    GridItem,
  },

  data() {
    return {};
  },

  methods: {
    ...mapGetters(['getModulesFromCurrentTab']),
  },

  computed: {},
};
</script>
<style lang="scss" src="./styles.scss" scoped />
