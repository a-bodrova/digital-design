<template>
  <div class="type_wrapper">
      <span class="task_type" :class="type"></span>
  </div>
</template>

<script>
export default {
  props: {
    'type': String,
  },

  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .type_wrapper {
    width: 68px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  
  .task_type {
    position: relative;
    @include sizes(24px);
    border-radius: 5px;
  
    &.bug {
      background-color: $color-bug;
    }
  
    &.task {
      background-color: $color-task;
    }
  
    &::after {
      position: absolute;
      content: '';
      top: 6px;
      left: 6px;
      @include sizes(12px);
      background-color: $color-light;
      border-radius: 50%;
    }
  }
</style>