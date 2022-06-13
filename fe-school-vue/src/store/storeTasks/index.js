import api from '@/api';

export const mutation = {
  SET_TASKS: 'SET_TASKS',
  SET_LOADING: 'SET_LOADING',
  SET_FILTER: 'SET_FILTER',
  SET_PAGE: 'SET_PAGE',
  SET_LIMIT: 'SET_LIMIT',
  SET_TOTAL: 'SET_TOTAL',
}

export default {
  namespaced: true,

  state: {
    _tasks: [],
    _loading: false,
    _filter: {
        query: '',
        assignedUsers: [],
        userIds: [],
        type: [],
        status: [],
        rank: [],
    },
    _page: 0,
    _limit: 10,
    _total: 0,
  },

  getters: {
    tasks: state => state._tasks,
    loading: state => state._loading,
    filter: state => state._filter,
    page: state => state._page,
    limit: state => state._limit,
    total: state => state._total,
  },

  mutations: {
    [mutation.SET_TASKS]: (state, tasks) => {
      state._tasks = tasks;
    },
    [mutation.SET_LOADING]: (state, isLoading) => {
      state._loading = isLoading;
    },
    [mutation.SET_FILTER]: (state, filter) => {
      state._filter = filter;
    },
    [mutation.SET_PAGE]: (state, page) => {
      state._page = page;
    },
    [mutation.SET_LIMIT]: (state, limit) => {
      state._limit = limit;
    },
    [mutation.SET_TOTAL]: (state, total) => {
      state._total = total;
    },
  },

  actions: {
    fetchTasks: ({ dispatch, commit, getters }, value) => {
      api.tasks.getTasks(getters.filter, getters.page, getters.limit)
        .then(({ data }) => {
          dispatch('setTasks', data);
        });
    },

    setTasks: ({ dispatch, commit }, value) => {
      commit(mutation.SET_TASKS, value);
    },

    setLoading: ({ dispatch, commit }, value) => {
      commit(mutation.SET_LOADING, value);
    },

    setFilter: ({ dispatch, commit }, value) => {
      commit(mutation.SET_FILTER, value);
    },

    setPage: ({ dispatch, commit }, value) => {
      commit(mutation.SET_PAGE, value);
    },

    setLimit: ({ dispatch, commit }, value) => {
      commit(mutation.SET_LIMIT, value);
    },

    setTotal: ({ dispatch, commit }, value) => {
      commit(mutation.SET_TOTAL, value);
    },
  },
}