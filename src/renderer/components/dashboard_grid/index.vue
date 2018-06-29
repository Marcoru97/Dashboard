<template>
    <div class="dashboard-grid__grid">
        <async-example class="dashboard-grid__item"  v-for="(item, key) in itemData" :key="key">{{item.name}}</async-example>
    </div>
</template>

<script>
import Vue from 'vue';

Vue.component('async-example', function(resolve, reject) {
  setTimeout(function() {
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>',
    });
  }, 1000);
});

export default {
  name: 'grid',
  props: {
    itemData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
