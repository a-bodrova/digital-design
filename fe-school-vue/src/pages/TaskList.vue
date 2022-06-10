<template>
  <Main>
    <template v-slot:page-title>
      <h1 class="page-title">Задачи</h1>
      <Button text="Добавить задачу" view="primary"></Button>
    </template>
  </Main>
</template>

<script>
import Main from '@/components/Main.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    Main,
    Button,
  }

}
</script>

<style lang="scss" scoped>
  
</style>