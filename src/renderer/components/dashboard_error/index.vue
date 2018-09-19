<template>
  <div  class="dashboard-error__box">
    <div class="dashboard-error_wrapper" @click="toggleTooltip()">
      <div
        class="dashboard-error_message-simple"
        v-text="errorMessageSimple"
      >
      </div>
      <icon-button
        :icon="tooltipButtonIcon"
        class="dashboard-error__button"
        icon-color="white"
      />
    </div>
    <div class="dashboard-error__animation-wrapper">
      <transition name="dashboard-error__tooltip-animation">
        <div class="dashboard-error__tooltip" v-text="stringErrorMessage" v-show="!errorMessageTooltipCollapsed"></div>
      </transition>
    </div>
  </div>
</template>
<script>
import IconButton from './../dashboard_button';

export default {
  name: 'error-box',

  props: {
    errorMessageSimple: {
      type: String,
      required: true,
    },
    errorMessage: {
      required: true,
    },
  },

  components: {
    IconButton,
  },

  data() {
    return {
      errorMessageTooltipCollapsed: true,
    };
  },

  computed: {
    tooltipButtonIcon() {
      if (this.errorMessageTooltipCollapsed) {
        return 'arrow_drop_down';
      } else {
        return 'arrow_drop_up';
      }
    },

    stringErrorMessage() {
      if (this.errorMessage instanceof Error) {
        return `${this.errorMessage.toString()}`;
      } else {
        return this.errorMessage;
      }
    },
  },

  methods: {
    toggleTooltip() {
      this.errorMessageTooltipCollapsed = !this.errorMessageTooltipCollapsed;
    },
  },
};
</script>
<style lang="scss" src="./styles.scss" scoped />
