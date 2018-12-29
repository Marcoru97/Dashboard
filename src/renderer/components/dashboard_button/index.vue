<template>
  <button class="icon-button__button" @click="click">
    <svg :style="inlineIconStyle" :class="`icon-button--color-${iconColor} icon-button--animation-${animation}`">
      <use :xlink:href="`#${icon}`"/>
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
      default: 'white',
    },
    animation: {
      type: String,
      required: false,
      default: 'none',
    },
    inlineIconStyle: {
      type: Object,
      required: false,
      default: () => ({ width: '100%', height: '100%' }),
    },
  },

  methods: {
    click(e) {
      // Pass the event one layer up
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
