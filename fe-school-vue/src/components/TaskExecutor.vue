<template>
  <div class="executor_wrapper">
    <span class="executor">{{username}}</span>
  </div>
</template>

<script>
export default {
  props: {
    'username': String,
  }
}
</script>

<style lang="scss" scoped>
  .executor_wrapper {
    width: 180px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  
  .executor {
    @include common-text;
  }
</style>