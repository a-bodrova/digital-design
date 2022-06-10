<template>
  <input class="my-input" type="text" />
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
  .my-input {
    height: 29px;
    padding: 5px 10px;
    margin: 0;
    @include common-text;
    color: $color-text;
  
    &::placeholder {
      @include common-text;
      color: $color-label-text;
    }
  }
</style>