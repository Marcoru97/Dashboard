<template>
    <div class="window-frame__frame">
        <div class="window-frame__control">
            <!-- TODO: Do it better, pls dude -->
            <icon-button
                icon="settings"
                :inline-icon-style="{width: '50%', height: '50%'}"
                icon-color="light-gray"
                class="window-frame__settings-icon"
                @click="$emit('toggleSettings')"
            />
            <icon-button
                icon="minus"
                :inline-icon-style="{width: '65%', height: '65%', 'margin-top': '5px'}"
                icon-color="light-gray"
                class="window-frame__min-icon"
            />
            <icon-button
                icon="box"
                :inline-icon-style="{width: '50%', height: '50%'}"
                icon-color="light-gray"
                class="window-frame__max-icon"
            />
            <icon-button
                icon="close"
                :inline-icon-style="{width: '65%', height: '65%'}"
                icon-color="light-gray"
                class="window-frame__close-icon"
            />
        </div>
        <div style="clear: both;"></div>
    </div>
</template>
<script>
import IconButton from './../dashboard_button';

export default {
  name: 'window-frame',
  components: { IconButton },
};
</script>
<style lang="scss" src="./style.scss" scoped />
