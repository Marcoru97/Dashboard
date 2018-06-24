<template>
  <div id="app">
    <icon-button icon="settings"></icon-button>
    <overview></overview>
  </div>
</template>

<script>
import Overview from './components/dashboard_grid/Grid';
import IconButton from './components/dashboard_button/IconButton';

export default {
  name: 'dashboard',
  components: {
    Overview,
    IconButton,
  },
};
</script>

<style lang="scss">
html {
  background: #424242;
}
</style>
