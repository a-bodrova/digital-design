<template>
  <input
    class="my-input"
    type="text"
    :placeholder="placeholder"
    v-model="text"
    @input="handleInput"
  />
</template>

<script>

export default {
  props: {
    'placeholder': String,
  },

  data() {
    return {
      text: '',
    }
  },
  
  methods: {
    handleInput() {
      this.$emit('input', this.text);
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-input {
    padding: 5px 10px;
    margin: 0;
    @include common-text($size: 14px, $height: 14px);
    color: $color-text;
  
    &::placeholder {
      @include common-text;
      color: $color-label-text;
    }
  }
</style>