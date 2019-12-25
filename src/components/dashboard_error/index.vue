<template>
  <div class="dashboard-error__box">
    <div class="dashboard-error_wrapper" @click="toggleTooltip()">
      <div
        class="dashboard-error_message-header"
        v-text="errorMessageHeader"
      ></div>
      <icon-button
        :icon="tooltipButtonIcon"
        class="dashboard-error__collapse-button"
        icon-color="white"
      />
    </div>
    <div class="dashboard-error__animation-wrapper">
      <transition name="dashboard-error__tooltip-animation">
        <div
          class="dashboard-error__tooltip"
          v-show="!errorMessageTooltipCollapsed"
        >
          <simplebar style="width: 100%">
            <div class="dashboard-error__tooltip-text">
              {{ stringErrorMessage }}
            </div>
            <div class="dashboard-error__tooltip-menu">
              <transition name="dashboard-error__copy-animation">
                <div
                  class="dashboard-error__copy-message-box"
                  v-show="showCopyMessage"
                >
                  Copied!
                </div>
              </transition>
              <icon-button
                @click="copyToClipboard"
                icon="content_copy"
                class="dashboard-error__copy-button"
                icon-color="white"
              />
            </div>
          </simplebar>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Simplebar from "simplebar-vue";

import IconButton from "./../dashboard_button";

export default {
  name: "error-box",

  props: {
    errorMessageHeader: {
      type: String,
      required: true
    },
    errorMessage: {
      required: true
    }
  },

  components: {
    IconButton,
    Simplebar
  },

  data() {
    return {
      errorMessageTooltipCollapsed: true,
      showCopyMessage: false
    };
  },

  computed: {
    tooltipButtonIcon() {
      if (this.errorMessageTooltipCollapsed) {
        return "arrow_drop_down";
      }
      return "arrow_drop_up";
    },

    stringErrorMessage() {
      if (this.errorMessage instanceof Error) {
        return `${this.errorMessage.toString()}`;
      }
      return this.errorMessage;
    }
  },

  methods: {
    toggleTooltip() {
      this.errorMessageTooltipCollapsed = !this.errorMessageTooltipCollapsed;
    },

    copyToClipboard() {
      const textarea = document.createElement("textarea");
      textarea.value = this.errorMessage;
      textarea.setAttribute("readonly", "");
      // Hide the element
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      this.showCopyMessage = true;

      window.setTimeout(() => {
        this.showCopyMessage = false;
      }, 500);
    }
  }
};
</script>
<style lang="scss" src="./styles.scss" scoped />
