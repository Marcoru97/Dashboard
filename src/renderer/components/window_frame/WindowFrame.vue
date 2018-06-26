<template>
    <div class="window-frame__frame">
        <div class="window-frame__control">
            <icon-button icon="minus" icon-color="light-gray" class="window-frame__min-icon" />
            <icon-button icon="box" icon-color="light-gray" class="window-frame__max-icon" />
            <icon-button icon="close" icon-color="light-gray" class="window-frame__close-icon" />
        </div>
        <div style="clear: both;"></div>
    </div>
</template>
<script>
import IconButton from './../dashboard_button/IconButton';

export default {
  name: 'window-frame',
  components: { IconButton },
};
</script>
<style lang="scss" src="./style.scss" scoped />