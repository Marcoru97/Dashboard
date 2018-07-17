<template>
  <div class="dashboard-settings__wrapper">
    <transition name="dashboard-settings__menu-animation">
      <div class="dashboard-settings__menu" v-show="settingsVisible">
        <section class="dasboard-settings-menu__header">
          <h1 class="dashboard-settings-menu__header">Settings</h1>
          <icon-button
            icon="arrow_right"
            class="dashboard-settings-menu__toggle-button"
            @click="$emit('closeSettings')"
          />
        </section>
        <!-- dev test -->
        <button @click="changeItemEditMode(!itemEditMode); $emit('closeSettings')" style="margin: 20px;">Item Edit Mode</button>
        <hr class="dashboard-settings-menu-line" />
      </div>
    </transition>
  </div>
</template>
<script>
import IconButton from './../dashboard_button';
import { mapMutations, mapState } from 'vuex';
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
<style lang="scss" src="./styles.scss" scoped />
