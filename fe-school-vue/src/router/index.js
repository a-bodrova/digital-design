import VueRouter from "vue-router";

import { appRoutes } from "../common/constants";
import Auth from '../pages/Auth.vue';
import UserList from '../pages/UserList.vue';
import TaskList from '../pages/TaskList.vue';
import NotFound from '../pages/NotFound.vue';
import TaskOverview from '../pages/TaskOverview.vue';
import UserOverview from '../pages/UserOverview.vue';
import TaskEdit from '@/pages/TaskEdit.vue';
import UserEdit from '@/pages/UserEdit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: appRoutes.AUTH,
    components: {
      default: Auth,
    },
  },
  {
    path: appRoutes.TASKS_LIST,
    props: true,
    components: {
      main: TaskList,
    },
  },
  {
    path: appRoutes.TASK_OVERVIEW,
    props: true,
    components: {
      main: TaskOverview,
    },
  },
  {
    path: appRoutes.TASK_EDIT,
    props: true,
    components: {
      main: TaskEdit,
    },
  },
  {
    path: appRoutes.NEW_TASK,
    props: true,
    components: {
      main: TaskEdit,
    }
  },
  {
    path: appRoutes.USERS_LIST,
    props: true,
    components: {
      main: UserList,
    },
  },
  {
    path: appRoutes.USER_OVERVIEW,
    props: true,
    components: {
      main: UserOverview,
    },
  },
  {
    path: appRoutes.USER_EDIT,
    props: true,
    components: {
      main: UserEdit,
    }
  },
  {
    path: appRoutes.NOT_FOUND,
    components: {
      main: NotFound,
    },
  },
];

const router = new VueRouter({
    routes,
    mode: 'hash',
  });

export default router;