<template>
  <textarea rows="4" class="my-textarea"></textarea>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.my-textarea {
  width: 100%;
  padding: 5px 10px;
  margin-top: 5px;
  @include dropdown-text;
  font-size: 14px;
  line-height: 17px;
  color: $color-text;
  box-shadow: inset 0px 0px 2px 1px $color-disabled;
  border-radius: 3px;
  resize: none;

  &:hover {
    border: 1px solid $color-primary;
    box-shadow: inset 0px 0px 2px 1px $color-disabled;
  }

  &:focus {
    border: 1px solid $color-primary;
    box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
    outline: none;
  }
}
</style>