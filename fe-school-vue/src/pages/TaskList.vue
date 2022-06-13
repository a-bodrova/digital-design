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
      <task-filter v-model="filledFilter" />
    </template>
    <template v-slot:list>
      <task-item v-for="(task) in tasksList.data" :key="task.id" :task="task"></task-item>
    </template>
  </Main>
</template>

<script>
import Main from '@/components/Main.vue';
import MyButton from '@/components/MyButton.vue';
import TaskFilter from '@/components/TaskFilter.vue';
import TaskItem from '@/components/TaskItem.vue';
import { mapGetters, mapActions } from 'vuex';
import { appRoutes } from '@/common/constants';

export default {
  data() {
    return {
      filledFilter: {},
    }
  },

  components: {
    Main,
    MyButton,
    TaskFilter,
    TaskItem,
  },

  methods: {
    ...mapActions('storeTasks', ['fetchTasks']),

    handleAddTask() {
      this.$router.push(appRoutes.NEW_TASK);
    },
  },

  computed: {
    ...mapGetters('storeTasks', ['tasks']),

    tasksList: {
      get() {
        return this.tasks || null;
      },

      set(val) {
        this.setTasks([...this.tasks, val]);
      }
    }
  },
  mounted() {
    this.fetchTasks();
  }
}
</script>

<style lang="scss" scoped>

</style>