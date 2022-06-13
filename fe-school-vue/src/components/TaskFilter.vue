<template>
  <form class="filter__wrapper">
    <my-select :options="Object.entries(type)" placeholder="Тип" v-model="filterType" />
    <my-input placeholder="Название задачи" v-model="filterQuery" />
    <my-select :options="Object.entries(status)" placeholder="Статус" v-model="filterStatus" />
    <my-select :options="Object.entries(rank)" placeholder="Приоритет" v-model="filterRank" />
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
import { mapGetters, mapActions } from 'vuex';
import { typeSelect, statusSelect, rankSelect } from '@/common/constants';

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
  },

  data() {
    return {
      type: typeSelect,
      status: statusSelect,
      rank: rankSelect,
    }
  },

  computed: {
    ...mapGetters('storeTasks', ['filter']),

    filterType: {
      get() {
        return this.filter.type;
      },
      set(value) {
        this.setFilter({ ...this.filter, type: value });
      },
    },
    filterQuery: {
      get() {
        return this.filter.query;
      },
      set(value) {
        this.setFilter({ ...this.filter, query: value });
      },
    },
    filterStatus: {
      get() {
        return this.filter.status;
      },
      set(value) {
        this.setFilter({ ...this.filter, status: value });
      },
    },
    filterRank: {
      get() {
        return this.filter.rank;
      },
      set(value) {
        this.setFilter({ ...this.filter, rank: value });
      },
    },
  },

  methods: {
    ...mapActions('storeTasks', ['setFilter']),

    handleSubmit() {
      this.$emit('change', this.filter);
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