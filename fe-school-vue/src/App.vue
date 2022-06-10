<template>
  <div class="app">
    <Header></Header>
    <!-- <header class="header">
      <div>
        <svg width="120" height="20">
          <use :xlink:href="logoLink"/>
        </svg>
      </div>
      <nav class="nav">
        <router-link :to="pathToTasks" class="nav__link" active-class="active">Задачи</router-link>
        <router-link :to="pathToUsers" class="nav__link" active-class="active">Пользователи</router-link>
    </nav>
      <UserWidget></UserWidget>
    </header> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header,
  },

  mounted() {
    // this.$api.Events.getEvents()
    // .then((data) => {
    //   console.log(data);
    // })
  },
}
</script>

<style lang="scss" scoped>
</style>
