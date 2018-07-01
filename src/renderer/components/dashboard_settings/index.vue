<template>
    <div class="dashboard-settings__wrapper">
        <icon-button
            :icon="buttonIcon"
            icon-color="light-gray"
            class="dashboard-settings__toggle-button"
            @click="settingsVisible = !settingsVisible"
        />
        <transition name="dashboard-settings__menu-animation">
        <div class="dashboard-settings__menu" v-show="settingsVisible">
            <section>
                <hr class="dashboard-settings-menu-line" />
                <h1 class="dashbpard-settings-menu__header">Settings</h1>
                <hr class="dashboard-settings-menu-line" />
            </section>
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

  computed: {
    buttonIcon() {
      return this.settingsVisible ? 'arrow_right' : 'settings';
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
