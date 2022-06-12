<template>
  <Main pageTitle="Задачи">
    <template v-slot:page-title__buttons>
      <my-button
        type="button"
        text="Добавить задачу"
        view="primary"
        :handler="handleAddTask"
      >
      </my-button>
    </template>
    <template v-slot:filter>
      <task-filter />
    </template>
    <template v-slot:list>
      <task-item></task-item>
    </template>
    
  </Main>
</template>

<script>
import Main from '@/components/Main.vue';
import MyButton from '@/components/MyButton.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import TaskItem from '@/components/TaskItem.vue';

export default {
  components: {
    Main,
    MyButton,
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