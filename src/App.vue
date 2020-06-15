<template>
  <div id="app">
    <menu-bar />
    <simplebar class="app__wrapper">
      <div class="app__content">
        <settings-menu />
        <grid
          :items="[
            { size: { width: 9, height: 10 } },
            { size: { width: 2, height: 1 } },
            { size: { width: 4, height: 6 } },
            { size: { width: 10, height: 10 } },
            { size: { width: 6, height: 2 } },
            { size: { width: 1, height: 8 } },
            { size: { width: 8, height: 6 } },
            { size: { width: 7, height: 7 } },
            { size: { width: 7, height: 8 } },
            { size: { width: 7, height: 8 } },
            { size: { width: 2, height: 2 } },
            { size: { width: 1, height: 3 } },
            { size: { width: 4, height: 6 } },
            { size: { width: 2, height: 2 } },
            { size: { width: 3, height: 10 } },
            { size: { width: 2, height: 9 } },
            { size: { width: 1, height: 3 } },
            { size: { width: 5, height: 3 } },
            { size: { width: 8, height: 5 } },
            { size: { width: 9, height: 2 } },
            { size: { width: 1, height: 6 } },
            { size: { width: 10, height: 9 } },
            { size: { width: 8, height: 9 } },
            { size: { width: 9, height: 1 } },
            { size: { width: 1, height: 6 } },
            { size: { width: 8, height: 7 } },
            { size: { width: 10, height: 5 } },
            { size: { width: 9, height: 7 } },
            { size: { width: 5, height: 6 } },
            { size: { width: 6, height: 10 } },
            { size: { width: 1, height: 4 } },
            { size: { width: 6, height: 8 } },
            { size: { width: 2, height: 2 } },
            { size: { width: 7, height: 1 } },
            { size: { width: 6, height: 4 } },
            { size: { width: 5, height: 8 } },
            { size: { width: 1, height: 2 } },
            { size: { width: 10, height: 8 } },
            { size: { width: 4, height: 6 } },
            { size: { width: 4, height: 3 } },
            { size: { width: 4, height: 10 } },
            { size: { width: 3, height: 10 } },
            { size: { width: 4, height: 4 } },
            { size: { width: 9, height: 5 } },
            { size: { width: 5, height: 9 } },
            { size: { width: 3, height: 7 } },
            { size: { width: 5, height: 10 } },
            { size: { width: 1, height: 3 } },
            { size: { width: 7, height: 3 } },
            { size: { width: 6, height: 6 } },
            { size: { width: 7, height: 1 } },
            { size: { width: 7, height: 1 } },
            { size: { width: 3, height: 10 } }
          ]"
        />
      </div>
    </simplebar>
  </div>
</template>

<script>
import Simplebar from "simplebar-vue";

import Grid from "@/components/grid/Grid";
import SettingsMenu from "@/components/SettingsMenu";
import MenuBar from "@/components/MenuBar";

export default {
  name: "dashboard",

  components: {
    Simplebar,
    Grid,
    SettingsMenu,
    MenuBar
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");

html,
body {
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;

  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  color: $text;
  background: $background;
}
</style>
<style lang="scss" scoped>
#app {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.app__wrapper {
  width: 100%;
  height: calc(100% - 30px);
}

.app__content {
  position: relative;
  flex-grow: 1;
}
</style>
