<template>
    <div class="dashboard-settings__wrapper">
        <icon-button
            icon="settings"
            icon-color="light-gray"
            animation="hover-rotate"
            class="dashboard-settings__toggle-button"
            @click="settingsVisible = !settingsVisible"
        />
        <transition name="dashboard-settings__menu-animation">
        <div class="dashboard-settings__menu" v-show="settingsVisible">
            test
        </div>
        </transition>
    </div>
</template>
<script>
import IconButton from './../dashboard_button';

export default {
  name: 'settings',
  components: { IconButton },
  data() {
    return {
      settingsVisible: false,
    };
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
