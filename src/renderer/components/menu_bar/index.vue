<template>
  <div class="menu-bar__frame">
    <div class="menu-bar__control">
      <icon-button
        icon="menu"
        :inline-icon-style="{width: '70%', height: '70%'}"
        icon-color="light-gray"
        class="menu-bar__settings-icon"
        @click="changeSettingsVisible(!settingsVisible)"
        v-show="this.settings.showSettingsIcon"
      />
      <span class="menu-bar__vertical_line"></span>
      <icon-button
        icon="minus"
        :inline-icon-style="{width: '65%', height: '65%', 'margin-top': '5px'}"
        icon-color="light-gray"
        class="menu-bar__min-icon"
        @click="mainWindow.minimize()"
      />
      <icon-button
        icon="box"
        :inline-icon-style="{width: '50%', height: '50%'}"
        icon-color="light-gray"
        class="menu-bar__max-icon"
        @click="mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()"
      />
      <icon-button
        icon="close"
        :inline-icon-style="{width: '65%', height: '65%'}"
        icon-color="light-gray"
        class="menu-bar__close-icon"
        @click="mainWindow.close()"
      />
    </div>
    <div style="clear: both;"></div>
  </div>
</template>
<script>
import { remote } from 'electron'; // eslint-disable-line
import { mapState, mapMutations } from 'vuex';

import types from '../../store/types';

import IconButton from './../dashboard_button';

export default {
  name: 'menu-bar',

  data() {
    return {
      mainWindow: remote.getCurrentWindow(),
    };
  },

  methods: {
    ...mapMutations({
      changeSettingsVisible: types.mutations.CHANGE_SETTINGS_VISIBLE_CHANGE,
    }),
  },

  components: { IconButton },

  computed: {
    ...mapState(['settings', 'settingsVisible']),
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
