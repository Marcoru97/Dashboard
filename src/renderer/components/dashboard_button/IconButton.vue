<template>
  <button>
    <svg>
      <use xlink:href="assets/settings.svg#settings" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'icon-button',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
