<template>
  <div id="app">
    <overview></overview>
  </div>
</template>

<script>
import Overview from './components/dashboard_grid/Grid';

export default {
  name: 'dashboard',
  components: {
    Overview,
  },
};
</script>

<style lang="scss">
html {
  background: #424242;
}
</style>
