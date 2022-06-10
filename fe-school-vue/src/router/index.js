import VueRouter from "vue-router";

import Auth from '../pages/Auth.vue';
import UserList from '../pages/UserList.vue';
import TaskList from '../pages/TaskList.vue';
import NotFound from '../pages/NotFound.vue';
import TaskOverview from '../pages/TaskOverview.vue';
import UserOverview from '../pages/UserOverview.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth',
    components: {
      default: Auth,
    },
  },
  {
    path: '/tasks',
    props: true,
    components: {
      main: TaskList,
    },
    // children: [
    //   {
    //     path: '/',
    //     props: true,
    //     components: {
    //       main: Main,
    //     },
    //   },
    // ],
  },
  {
    path: '/tasks/:taskId',
    props: true,
    components: {
      main: TaskOverview,
    },
  },
  {
    path: '/tasks/:taskId/edit',
    props: true,
    components: {
      main: TaskOverview,
    },
  },
  {
    path: '/users',
    props: true,
    components: {
      main: UserList,
    },
  },
  {
    path: '/users/:userId',
    props: true,
    components: {
      main: UserOverview,
    },
  },
  {
    path: '*',
    name: 'NotFound',
    components: {
      main: NotFound,
    },
  },
  {
    path: '/',
    redirect: '/tasks',
  }
];

const router = new VueRouter({
    routes,
    mode: 'hash',
  });

export default router;