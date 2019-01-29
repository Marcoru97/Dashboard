<template>
  <transition name="dashboard-settings__menu-animation">
    <div
      class="dashboard-settings__wrapper"
      v-show="settingsVisible"
      v-shortkey.push="['esc']"
      @shortkey="$emit('closeSettings')"
    >
      <div class="dashboard-settings__background"></div>
      <div class="dashboard-settings__menu">
        <section class="dasboard-settings-menu__header">
          <h1 class="dashboard-settings-menu__header">Settings</h1>
          <icon-button
            icon="arrow_right"
            class="dashboard-settings-menu__toggle-button"
            @click="$emit('closeSettings')"
          />
        </section>
        <!-- dev test -->
        <button
          @click="changeItemEditMode(!itemEditMode); $emit('closeSettings')"
          style="margin: 20px;"
        >Item Edit Mode</button>
        <hr class="dashboard-settings-menu-line">
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapState } from 'vuex';

import IconButton from './../dashboard_button';
import types from './../../store/types';

export default {
  name: 'settings',

  components: { IconButton },

  props: {
    settingsVisible: {
      required: true,
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState(['itemEditMode']),
  },

  methods: {
    ...mapMutations({
      changeItemEditMode: types.mutations.ITEM_EDIT_MODE_CHANGE,
    }),
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped></style>
