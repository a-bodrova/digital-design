<template>
  <section class="filter__wrapper">
    <MyCheckbox />
    <MyInput />
  </section>
</template>

<script>
import MyCheckbox from '@/components/MyCheckbox.vue';
import MyInput from '@/components/MyInput.vue';

export default {
  components: {
    MyCheckbox,
    MyInput,
  }
}
</script>

<style lang="scss" scoped>
  .filter__wrapper {
    display: flex;
    gap: 10px;
  }

</style>