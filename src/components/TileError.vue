<template>
  <div class="tile-error__box">
    <div
      class="tile-error_wrapper"
      @click="tooltipCollapsed = !tooltipCollapsed"
    >
      <div class="tile-error_message-header" v-text="errorMessageHeader"></div>
      <icon-button
        :icon="tooltipButtonIcon"
        class="tile-error__collapse-button"
        icon-color="white"
      />
    </div>
    <div class="tile-error__animation-wrapper">
      <transition name="tile-error__tooltip-animation">
        <div class="tile-error__tooltip" v-show="!tooltipCollapsed">
          <div class="tile-error__tooltip-text" v-text="stringErrorMessage" />
          <div class="tile-error__tooltip-menu">
            <transition name="tile-error__copy-animation">
              <div
                class="tile-error__copy-message-box"
                v-show="showCopyMessage"
              >
                Copied!
              </div>
            </transition>
            <icon-button
              @click="copyToClipboard"
              icon="content_copy"
              class="tile-error__copy-button"
              icon-color="white"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import IconButton from "@/components/IconButton";

export default {
  name: "tile-error",

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
    IconButton
  },

  data() {
    return {
      tooltipCollapsed: true,
      showCopyMessage: false
    };
  },

  computed: {
    tooltipButtonIcon() {
      if (this.tooltipCollapsed) {
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
<style lang="scss" scoped>
.tile-error__box {
  width: 100%;
  position: absolute;
  text-align: center;
}

.tile-error_message-header {
  flex-grow: 1;
  user-select: none;
  padding: 10px 0 10px 0;
}

.tile-error_wrapper {
  display: flex;
  align-items: center;
  background: #c0392b;
  cursor: pointer;
}

.tile-error__collapse-button {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.tile-error__copy-button {
  width: 15px;
  height: 15px;
  margin-left: 2px;
}

.tile-error__animation-wrapper {
  overflow: hidden;
  margin-top: 2px;
}

.tile-error__tooltip {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c0392b;
  padding: 20px 0 20px 0;
}

.tile-error__tooltip-text {
  max-width: 80%;
  word-break: break-all;
}

.tile-error__tooltip-menu {
  position: relative;
  margin-left: 3px;
  margin-right: 5px;
}

.tile-error__copy-message-box {
  position: absolute;
  top: -5px;
  left: 15px;
  margin-left: 10px;
  background: #ffffff;
  color: #000000;
  padding: 5px;
  border-radius: 5px;
}

.tile-error__copy-animation {
  &-enter-active {
    transition: transform $animationTimeFast $easeOutCubic,
      opacity $animationTimeFast $easeOutCubic;
  }
  &-leave-active {
    transition: transform $animationTimeFast $easeInCubic,
      opacity $animationTimeFast $easeOutCubic;
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }
  &-enter {
    opacity: 0;
  }
}

.tile-error__tooltip-animation {
  &-enter-active {
    transition: transform $animationTimeFast $easeOutCubic;
  }
  &-leave-active {
    transition: transform $animationTimeFast $easeInCubic;
  }
  &-enter,
  &-leave-to {
    transform: translateY(-100%) scaleY(0);
  }
}
</style>
