<template>
  <Main pageTitle="Задачи">
    <template v-slot:page-title__buttons>
      <Button
        type="button"
        text="Добавить задачу"
        view="primary"
        :handler="handleAddTask"
      >
      </Button>
    </template>
    <template v-slot:filter>
      <TaskFilter />
    </template>
    <template v-slot:list></template>
    
  </Main>
</template>

<script>
import Main from '@/components/Main.vue';
import Button from '@/components/Button.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import TaskItem from '@/components/TaskItem.vue';

export default {
  components: {
    Main,
    Button,
    TaskFilter,
    TaskItem,
  },
  methods: {
    handleAddTask() {}
  },

}
</script>

<style lang="scss" scoped>
  
</style>