<template>
  <input type="checkbox" class="my-checkbox" />
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.my-checkbox {
  @include sizes(24px);
  position: relative;
  appearance: none;
  box-shadow: none;
  margin-top: 0;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    @include sizes(24px);
    background-color: $color-light;
    border: 1px solid $color-text;
    border-radius: 5px;
  }

  &:hover {
    appearance: none;
    border: none;
    box-shadow: none;

    &::after {
      border-color: $color-primary;
    }
  }

  &:focus {
    appearance: none;
    border: none;
    box-shadow: none;
  }

  &:checked {
    appearance: none;
   
    &::after {
      content: 'X';
      display: flex;
      justify-content: center;
      align-items: center;
      @include common-text;
      font-weight: 700;
      color: $color-light;
      background-color: $color-primary;
      border-color:$color-primary;
    }

    &:disabled {
      background-color: $color-disabled;
      color: $color-label-text;
    }
  }

  &:disabled {
    appearance: none;
    border: none;

    &::after {
      border: none;
      background-color: $color-disabled;
    }
  }
}

</style>