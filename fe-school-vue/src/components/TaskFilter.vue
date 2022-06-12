<template>
  <form class="filter__wrapper">
    <my-select :options="Object.entries(typeSelect)" placeholder="Тип" v-model="filter.type" />
    <my-input placeholder="Название задачи" v-model="filter.query" />
    <my-select :options="Object.entries(statusSelect)" placeholder="Статус" v-model="filter.status" />
    <my-select :options="Object.entries(rankSelect)" placeholder="Приоритет" v-model="filter.rank" />
    <my-button
      type="submit"
      text="Применить"
      view="primary"
      :handler="handleSubmit"
    >
    </my-button>
  </form>
</template>

<script>
import MyInput from '@/components/MyInput.vue';
import MySelect from '@/components/MySelect.vue';
import MyButton from '@/components/MyButton.vue';

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
  },

  data() {
    return {
      filter: {
        query: '',
        assignedUsers: [],
        userIds: [],
        type: [],
        status: [],
        rank: [],
      },
      searchText: '',
      typeSelect: {
        bug: 'Ошибка',
        task: 'Задача',
      },
      statusSelect: {
        opened: 'Открыто',
        inProgress: 'В работе',
        testing: 'Тестирование',
        complete: 'Сделано',
      },
      rankSelect: {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
      },
    }
  },
  methods: {
    handleSubmit() {
      console.log('submit', this.filter);
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter__wrapper {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

</style>