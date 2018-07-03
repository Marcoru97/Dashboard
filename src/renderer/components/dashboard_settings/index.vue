<template>
    <div class="dashboard-settings__wrapper">
        <transition name="dashboard-settings__menu-animation">
        <div class="dashboard-settings__menu" v-show="settingsVisible">
            <section class="dasboard-settings-menu__header">
                <h1 class="dashbpard-settings-menu__header">Settings</h1>
                <icon-button
                  icon="arrow_right"
                  icon-color="light-gray"
                  class="dashboard-settings-menu__toggle-button"
                  @click="$emit('closeSettings')"
                />
            </section>
            <!-- <hr class="dashboard-settings-menu-line" /> -->
        </div>
        </transition>
    </div>
</template>
<script>
import IconButton from './../dashboard_button';

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
};
</script>
<style lang="scss" src="./styles.scss" scoped />
