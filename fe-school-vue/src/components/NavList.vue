<template>
  <div>
    <nav class="nav">
      <!-- <slot></slot> -->
        <router-link :to="{ name: 'TaskList' }" class="nav__link" active-class="active"><span>Задачи</span></router-link>
        <router-link :to="{ name: 'UserList' }" class="nav__link" active-class="active"><span>Пользователи</span></router-link>
    </nav>
  </div>
</template>

<script>
  import router from '../router/index.js';
  import TaskList from '../pages/TaskList.vue';
  import UserList from '../pages/UserList.vue';

export default {
  components: {
    TaskList,
    UserList,
  },
  data() {
    return {
      pathToTasks: {
        path: '/tasks',
        name: 'TaskList',
        // params: {
        //   page: 'TaskList',
        // },
      },
      pathToUsers: {
        path: '/users',
        name: 'UserList',
        // params: {
        //   page: 'UserLIst',
        // },
      },
      // toTasks: router.routes[0].path,
    }
  }
}
</script>

<style lang="scss" scoped>

  .nav {
    display: flex;
    gap: 10px;
  
    &__link {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 33px;
      color: $color-text;
      cursor: pointer;
  
      &.active {
        position: relative;
  
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -13px;
          width: 100%;
          height: 2px;
          background-color: $color-primary;
        }
      }
  
      &:hover {
        color: $color-primary;
      }
    }
  }
</style>