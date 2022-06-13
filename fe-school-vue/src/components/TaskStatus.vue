<template>
  <div class="status_wrapper">
    <span class="common" :class="status">{{text[status]}}</span>
  </div>
</template>

<script>
import { statusSelect } from '@/common/constants.js';

export default {
  props: {
    'status': String,
  },

  data() {
    return {
      text: statusSelect,
    }
  }
}
</script>

<style lang="scss" scoped>
  .status_wrapper {
    width: 120px;
    display: flex;
    justify-content: flex-start;
  }
  
  .common {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 10px;
    @include common-text($size: 14px, $height: 16px);
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
  
    &.opened {
      background-color: $color-opened-bg;
      color: $color-opened-text;
      border-color: $color-opened-text;
    }
  
    &.testing,
    &.inProgress {
      background-color: $color-testing-bg;
      color: $color-testing-text;
      border-color: $color-testing-text;
    }
  
    &.complete {
      background-color: $color-complete-bg;
      color: $color-complete-text;
      border-color: $color-complete-text;
    }
  }
</style>