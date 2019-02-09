<template>
  <div id="app">
    <menu-bar/>
    <div class="app__content">
      <settings/>
      <view/>
    </div>
  </div>
</template>

<script>
import DashboardView from './components/dashboard_view';
import Settings from './components/dashboard_settings';
import IconButton from './components/dashboard_button';
import MenuBar from './components/menu_bar';

export default {
  name: 'dashboard',
  components: {
    DashboardView,
    Settings,
    IconButton,

    MenuBar,
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
<style lang="scss" scoped>
#app {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.app__content {
  position: relative;
  flex-grow: 1;
}
</style>
