<template>
  <input
    :id="`my-${name}`"
    type="checkbox"
    class="my-checkbox"
    :checked="isChecked"
    @change="changeInput"
  />
</template>

<script>
export default {
  model: {
    prop: 'checkedValues',
    event: 'change',
  },

  props: {
    'checkedValues': Array,
    'name': String,
  },

  data() {
    return {
      isChecked: '',
    }
  },

  // mounted() {
  //   this.isChecked = this.checkedValues[this.name] || false;
  // },

  methods: {
    changeInput() {
      this.isChecked = !this.isChecked;
      if (this.isChecked) {
        if (!this.checkedValues.includes(this.name)) {
          this.$emit('change', [...this.checkedValues, this.name]);
        }
      } else {
        if (this.checkedValues.includes(this.name)) {
          this.$emit('change', [...this.checkedValues.filter(item => item !== this.name)]);
        }
      }
      
      
      // console.log(Object.assign(this.checkedValue, {[this.name]: this.isChecked}));
    }
  },
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