<template>
  <div class="my-select">
    <div class="my-select__title" @click="handleOpen" :class="{ active: isOpenSelect }">
      <span>{{ placeholder }}</span>
      <svg class="my-select__arrow" width="8" height="6" :class="{ rotate: isOpenSelect }">
        <use :xlink:href="'#v'" />
      </svg>
    </div>
    <div :placeholder="placeholder" class="my-select__wrapper" :class="{ open: isOpenSelect }">
      <label
        :for="`my-${map[0]}`"
        class="my-select__label"
        v-for="(map, index) in options"
        v-bind:key="index">
        
        <my-checkbox
          v-model="checkedValues"
          :name="map[0]"
          @change="handleCheckbox"
        />
  
        {{ map[1] }}
  
      </label>
    </div>
  </div>
</template>

<script>
import MyCheckbox from '@/components/MyCheckbox.vue';

export default {
  model: {
    prop: 'filter',
    event: 'change',
  },
  props: {
    'filter': Array,
    'options': Array,
    'placeholder': String,
  },
  components: {
    MyCheckbox,
  },
  data() {
    return {
      checkedValues: [],
      isOpenSelect: false,
    }
  },
  methods: {
    handleCheckbox() {
      this.$emit('change', this.checkedValues);
    },
    handleOpen() {
      this.isOpenSelect = !this.isOpenSelect;
    },
  },
}
</script>

<style lang="scss" scoped>
  .my-select {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__wrapper {
      position: absolute;
      top: -5px;
      left: -5px;
      width: calc(100% + 10px);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 31px;
      background-color: $color-light;
      border: 1px solid $color-primary;
      border-radius: 5px;
      display: none;

      &.open {
        display: flex;
        @extend %box-shadow;
      }
    }

    &__title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 5px 10px;
      @include common-text($size: 14px, $height: 14px);
      color: $color-label-text;
      border-radius: 3px;
      border: none;
      @extend %inner-shadow;
      z-index: 20;
      cursor: pointer;

      &.active {
        border: 1px solid $color-primary;
      }
    }

    &__arrow.rotate {
      transform: rotate(180deg);
    }

    &__label {
      width: 100%;
      display: flex;
      align-self: flex-start;
      align-items: center;
      gap: 10px;
      flex-wrap: nowrap;
      padding: 5px;
      @include common-text;
      color: $color-text;

      &:hover {
        background-color: $color-hover;
      }
  
      &.active {
        background-color: $color-primary-hover;
        color: $color-light;
      }
    }
  }
</style>