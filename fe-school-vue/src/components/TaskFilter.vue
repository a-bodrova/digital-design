<template>
  <section class="filter__wrapper">
    <MyCheckbox />
  </section>
</template>

<script>
import MyCheckbox from '@/components/MyCheckbox.vue';

export default {
  components: {
    MyCheckbox,
  }
}
</script>

<style lang="scss" scoped>
  .filter__wrapper {
    display: flex;
  }

</style>