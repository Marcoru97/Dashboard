<template>
  <button class="icon-button__button" @click="click">
    <svg
      :style="inlineIconStyle"
      :class="`icon-button--color-${iconColor} icon-button--animation-${animation}`"
    >
      <use v-bind:xlink:href="`#${icon}`"></use>
    </svg>
  </button>
</template>

<script>
export default {
  name: "icon-button",
  props: {
    icon: {
      type: String,
      required: false,
    },
    iconColor: {
      type: String,
      required: false,
      default: "white",
    },
    animation: {
      type: String,
      required: false,
      default: "none",
    },
    inlineIconStyle: {
      type: Object,
      required: false,
      default: () => ({ width: "100%", height: "100%" }),
    },
  },

  methods: {
    click(e) {
      // Pass the event one layer up
      this.$emit("click", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-button__button {
  display: flex;
  justify-content: center;
  background: 0;
  border: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  transition: background-color $animationTimeFaster $easeInOutCubic;

  &:focus {
    outline: 0;
  }

  // Better animation handling?
  &:hover .icon-button--animation-hover-rotate {
    transform: rotateZ(45deg);
  }
}

.icon-button--animation-hover-rotate {
  transition: transform 300ms $easeInOutCubic;
}

.icon-button--color-light-gray {
  fill: $button-light-gray;
}

.icon-button--color-gray {
  fill: $button-gray;
}

.icon-button--color-dark-gray {
  fill: $button-dark-gray;
}

.icon-button--color-white {
  fill: #ffffff;
}
</style>
