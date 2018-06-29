<template>
    <div class="dashboard-settings__wrapper">
        <icon-button
            icon="settings"
            icon-color="light-gray"
            animation="hover-rotate"
            class="dashboard-settings__toggle-button"
            @click="settingsVisible = !settingsVisible"
        />
        <div class="dashboard-settings__content" v-show="settingsVisible">
            test
        </div>
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
