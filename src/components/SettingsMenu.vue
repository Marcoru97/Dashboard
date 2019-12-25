<template>
  <transition name="settings-menu__menu-animation">
    <div
      class="settings-menu__wrapper"
      v-show="settingsVisible"
      v-shortkey.push="['esc']"
      @shortkey="changeSettingsVisible(false)"
    >
      <div
        class="settings-menu__background"
        @click="changeSettingsVisible(false)"
      ></div>
      <div class="settings-menu__menu">
        <section class="settings-menu__header-wrapper">
          <h1 class="settings-menu__header">Settings</h1>
          <icon-button
            icon="arrow_right"
            class="settings-menu__toggle-button"
            @click="changeSettingsVisible(false)"
          />
        </section>
        <!-- dev test -->
        <button
          @click="
            changeItemEditMode(!itemEditMode);
            changeSettingsVisible(false);
          "
          style="margin: 20px;"
        >
          Item Edit Mode
        </button>
        <hr class="settings-menu-line" />
      </div>
    </div>
  </transition>
</template>
<script>
import { mapMutations, mapState } from "vuex";

import IconButton from "@/components/IconButton";
import types from "@/store/types";

export default {
  name: "settings",

  components: { IconButton },

  computed: {
    ...mapState(["itemEditMode", "settingsVisible"])
  },

  methods: {
    ...mapMutations({
      changeItemEditMode: types.mutations.ITEM_EDIT_MODE_CHANGE,
      changeSettingsVisible: types.mutations.CHANGE_SETTINGS_VISIBLE_CHANGE
    })
  }
};
</script>
<style lang="scss" scoped>
.settings-menu__wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.settings-menu__menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 600px;
  height: 100%;
  background: $background-window-frame;
}

.settings-menu__header-wrapper {
  display: flex;
  align-items: center;
  border-top: 2px solid $menu-horizontal-line;
}

.settings-menu__header {
  margin: 0;
  padding: 10px;
  font-weight: 400;
  font-size: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: $head-line;
  flex-grow: 1;
}

.settings-menu__toggle-button {
  width: 50px;
  height: 30px;
}

.settings-menu-line {
  width: 100%;
  height: 2px;
  border: 0px;
  background: $menu-horizontal-line;
  border-radius: 50px;
  margin: 0;
  padding: 0;
}

.settings-menu__background {
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.45;
}

.settings-menu__menu-animation {
  /* Vue needs this to calculate the animation time */
  &-enter-active {
    transition: none $animationTimeFast;
  }
  &-leave-active {
    transition: none $animationTimeFast;
  }

  &-enter-active .settings-menu__background {
    transition: opacity $animationTimeFast $easeOutCubic;
  }
  &-leave-active .settings-menu__background {
    transition: opacity $animationTimeFast $easeInCubic;
  }
  &-enter .settings-menu__background,
  &-leave-to .settings-menu__background {
    opacity: 0;
  }

  &-enter-active .settings-menu__menu {
    transition: transform $animationTimeFast $easeOutCubic;
  }
  &-leave-active .settings-menu__menu {
    transition: transform $animationTimeFast $easeInCubic;
  }
  &-enter .settings-menu__menu,
  &-leave-to .settings-menu__menu {
    transform: translateX(100%);
  }
}
</style>
