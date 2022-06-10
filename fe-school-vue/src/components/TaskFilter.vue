<template>
  <section class="filter__wrapper">
    <MyCheckbox />
    <MyInput />
    <MyTextarea />
  </section>
</template>

<script>
import MyCheckbox from '@/components/MyCheckbox.vue';
import MyInput from '@/components/MyInput.vue';
import MyTextarea from '@/components/MyTextarea.vue';

export default {
  components: {
    MyCheckbox,
    MyInput,
    MyTextarea,
  }
}
</script>

<style lang="scss" scoped>
  .filter__wrapper {
    display: flex;
    gap: 10px;
  }

</style>