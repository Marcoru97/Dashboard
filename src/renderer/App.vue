<template>
  <div id="app">
    <section class="app__frame">
      <menu-bar @toggleSettings="showSettings=!showSettings"></menu-bar>
    </section>
    <section class="app__body">
      <settings :settingsVisible="showSettings" @closeSettings="showSettings=false"/>
      <overview :settingsVisible="showSettings"></overview>
    </section>
  </div>
</template>

<script>
import Overview from './components/dashboard_grid';
import Settings from './components/dashboard_settings';
import IconButton from './components/dashboard_button';
import MenuBar from './components/menu_bar';

export default {
  name: 'dashboard',
  components: {
    Overview,
    Settings,
    IconButton,

    MenuBar,
  },

  data() {
    return {
      showSettings: false,
    };
  },
};
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
@import './variables/colors';

html,
body {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;

  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  color: $text;
  background: $background;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background: $scroll-bar-foreground;
  border-radius: 50px;
  box-shadow: 1px;

  &:hover {
    background: $scroll-bar-foreground-hover;
  }
}
</style>
<style src="./styles.scss" lang="scss" scoped />
