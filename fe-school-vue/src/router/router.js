import Vue from "vue";
import VueRouter from "vue-router";

import Main from '../pages/Main.vue';
import UserList from '../pages/UserList.vue';
import TaskList from '../pages/TaskList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/users',
        name: 'UserList',
        component: UserList,
      },
      {
        path: '/tasks',
        name: 'TaskList',
        component: TaskList,
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;