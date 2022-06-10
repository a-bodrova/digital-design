<template>
  <header class="header">
      <div>
        <svg width="120" height="20">
          <use :xlink:href="logoLink"/>
        </svg>
      </div>
      <button @click="toTasks">To tasks</button>
      <NavList>
        <!-- <router-link :to="pathToTasks" class="nav__link" active-class="active">Задачи</router-link>
        <router-link :to="pathToUsers" class="nav__link" active-class="active">Пользователи</router-link> -->
      </NavList>
      <UserWidget></UserWidget>
    </header>
</template>

<script>
import NavList from '@/components/NavList.vue';
import UserWidget from '@/components/UserWidget.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    NavList,
    UserWidget,
    Button,
  },
  data() {
    return {
      // pathToTasks: {
      //   name: 'TaskList',
      //   params: {
      //     page: 'TaskList',
      //   },
      // },
      // pathToUsers: {
      //   name: 'UserList',
      //   params: {
      //     page: 'UserLIst',
      //   },
      // },
    }
  },
  computed: {
    logoLink() {
      return 'static/images/Logo.svg';
    }
  },

  
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: auto;
  padding: 9px 20px;
  background-color: $color-light;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>