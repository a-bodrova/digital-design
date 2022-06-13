<template>
  <div class="rank_wrapper">
    <span class="common" :class="rank">
      <img class="rank_image" :src="`static/icons/${rank}_rank.svg`" alt='' />
      {{text[rank]}}
    </span>
  </div>
</template>

<script>
import { rankSelect } from '@/common/constants.js';
export default {
  props: {
    'rank': String,
  },

  data() {
    return {
      text: rankSelect,
    }
  }
}
</script>

<style lang="scss" scoped>
  .rank_wrapper {
    width: 120px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .common {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 18px;
    @include common-text($size: 14px, $height: 16px);
  
    & .rank_image {
      position: absolute;
      display: inline-block;
      left: -18px;
      top: 4px;
      width: 14px;
      height: auto;
    }
  
    &.medium {
      color: $color-rank-med;
    }
  
    &.low {
      color: $color-rank-low;
    }
  
    &.high {
      color: $color-rank-high;
    }
  }
</style>