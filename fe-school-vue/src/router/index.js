import VueRouter from "vue-router";

import Main from '../pages/Main.vue';
import Auth from '../pages/Auth.vue';
import UserList from '../pages/UserList.vue';
import TaskList from '../pages/TaskList.vue';
import NotFound from '../pages/NotFound.vue';
import TaskOverview from '../pages/TaskOverview.vue';
import UserOverview from '../pages/UserOverview.vue';


// const routes = [
//   {
//     path: '/',
//     name: 'Main',
//     component: Main,
//     children: [
//       {
//         path: '/auth',
//         name: 'Auth',
//         component: Auth,
//       },
//       {
//         path: '/users',
//         name: 'UserList',
//         component: UserList,
//         children: [
//           {
//             path: ':userId',
//             name: 'UserOverview',
//             component: UserOverview,
//             children: [
//               {
//                 path: '/edit',
//                 name: 'UserEdit',
//                 component: UserOverview,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         path: '/tasks',
//         name: 'TaskList',
//         component: TaskList,
//         children: [
//           {
//             path: ':taskId',
//             name: 'TaskOverview',
//             component: TaskOverview,
//             children: [
//               {
//                 path: '/edit',
//                 name: 'TaskEdit',
//                 component: TaskOverview,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: '*',
//     redirect: {
//       name: 'NotFound',
//       component: NotFound,
//     },
//   },
// ];

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/users',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/tasks/:taskId',
    name: 'TaskOverview',
    component: TaskOverview,
  },
  {
    path: '/users/:userId',
    name: 'UserOverview',
    component: UserOverview,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = () => {
  return new VueRouter({
    routes,
    mode: 'abstract',
  });
}

export default router;