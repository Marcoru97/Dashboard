<template>
  <button class="icon-button__button" :class="`icon-button--animation-${animation}`">
    <svg class="icon-button__button-icon" :class="`icon-button--color-${iconColor}`">
      <use :xlink:href="`#${icon}`" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'icon-button',
  props: {
    icon: {
      type: String,
      required: false,
    },
    iconColor: {
      type: String,
      required: false,
    },
    animation: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
