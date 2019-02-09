<template>
  <div class="menu-bar__frame">
    <div class="menu-bar__control">
      <!-- TODO: Do it better, pls dude -->
      <icon-button
        icon="settings"
        :inline-icon-style="{width: '50%', height: '50%'}"
        icon-color="light-gray"
        class="menu-bar__settings-icon"
        @click="$emit('toggleSettings')"
        v-show="this.settings.showSettingsIcon"
      />
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
import { mapState } from 'vuex';

import IconButton from './../dashboard_button';

export default {
  name: 'menu-bar',

  data() {
    return {
      mainWindow: remote.getCurrentWindow(),
    };
  },

  components: { IconButton },

  computed: {
    ...mapState(['settings']),
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
