<template>
    <div class="window-frame__frame">
        <div class="window-frame__control">
            <!-- TODO: Do it better, pls dude -->
            <icon-button
                icon="settings"
                :inline-icon-style="{width: '50%', height: '50%'}"
                icon-color="light-gray"
                class="window-frame__settings-icon"
                @click="$emit('toggleSettings')"
                v-show="this.settingsIconVisible"
            />
            <icon-button
                icon="minus"
                :inline-icon-style="{width: '65%', height: '65%', 'margin-top': '5px'}"
                icon-color="light-gray"
                class="window-frame__min-icon"
                @click="mainWindow.minimize()"
            />
            <icon-button
                icon="box"
                :inline-icon-style="{width: '50%', height: '50%'}"
                icon-color="light-gray"
                class="window-frame__max-icon"
                @click="mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()"
            />
            <icon-button
                icon="close"
                :inline-icon-style="{width: '65%', height: '65%'}"
                icon-color="light-gray"
                class="window-frame__close-icon"
                @click="mainWindow.close()"
            />
        </div>
        <div style="clear: both;"></div>
    </div>
</template>
<script>
import IconButton from './../dashboard_button';

import { remote } from 'electron';
import { mapState } from 'vuex';

export default {
  name: 'window-frame',

  data() {
    return {
      mainWindow: remote.getCurrentWindow(),
    };
  },

  components: { IconButton },

  computed: {
    ...mapState(['settingsIconVisible']),
  },
};
</script>
<style lang="scss" src="./style.scss" scoped />
