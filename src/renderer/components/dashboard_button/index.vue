<template>
  <button class="icon-button__button" @click="click">
    <svg class="icon-button__button-icon" :class="`icon-button--color-${iconColor} icon-button--animation-${animation}`">
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

  methods: {
    click: function(e) {
      // Pass the event one layer up
      this.$emit('click', e);
    },
  },
};
</script>

<style lang="scss" src="./styles.scss" scoped />
