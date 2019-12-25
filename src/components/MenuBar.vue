<template>
  <div class="menu-bar__frame">
    <div class="menu-bar__control">
      <icon-button
        icon="menu"
        :inline-icon-style="{ width: '70%', height: '70%' }"
        icon-color="light-gray"
        class="menu-bar__settings-icon"
        @click="changeSettingsVisible(!settingsVisible)"
        v-show="this.settings.showSettingsIcon"
      />
      <span class="menu-bar__vertical_line"></span>
      <icon-button
        icon="minus"
        :inline-icon-style="{
          width: '65%',
          height: '65%',
          'margin-top': '5px'
        }"
        icon-color="light-gray"
        class="menu-bar__min-icon"
        @click="mainWindow.minimize()"
      />
      <icon-button
        icon="box"
        :inline-icon-style="{ width: '50%', height: '50%' }"
        icon-color="light-gray"
        class="menu-bar__max-icon"
        @click="
          mainWindow.isMaximized()
            ? mainWindow.unmaximize()
            : mainWindow.maximize()
        "
      />
      <icon-button
        icon="close"
        :inline-icon-style="{ width: '65%', height: '65%' }"
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
import { mapState, mapMutations } from "vuex";

import types from "@/store/types";

import IconButton from "@/components/IconButton";

export default {
  name: "menu-bar",

  data() {
    return {
      mainWindow: remote.getCurrentWindow()
    };
  },

  methods: {
    ...mapMutations({
      changeSettingsVisible: types.mutations.CHANGE_SETTINGS_VISIBLE_CHANGE
    })
  },

  components: { IconButton },

  computed: {
    ...mapState(["settings", "settingsVisible"])
  }
};
</script>
<style lang="scss" scoped>
.menu-bar__frame {
  width: 100%;
  height: 30px;
  background: $background-window-frame;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.menu-bar__control {
  display: flex;
  float: right;
  margin: 0 3px 0 0;
  -webkit-app-region: no-drag;
}

.menu-bar__vertical_line {
  width: 2px;
  height: 30px;
  margin-left: 7px;
  margin-right: 7px;
  background: $foreground;
}

.menu-bar__max-icon,
.menu-bar__min-icon,
.menu-bar__close-icon,
.menu-bar__settings-icon {
  width: 40px;
  height: 30px;
}

.menu-bar__close-icon:hover > svg {
  color: #ffffff !important;
  fill: #ffffff !important;
}

.menu-bar__close-icon {
  &:hover {
    background: $background-window-frame-hover-red !important;
    fill: #ffffff !important;
  }
}

.menu-bar__max-icon,
.menu-bar__min-icon,
.menu-bar__settings-icon {
  &:hover {
    background: $background-window-frame-hover !important;
  }
}
</style>
