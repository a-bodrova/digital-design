import Vuex from "vuex";

import storeTasks from './storeTasks';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    storeTasks,
  },
});

export default store;