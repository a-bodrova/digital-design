<template>
  <div class="app">
    <Header>
      <template v-if="isUser" v-slot:header> 
        <NavList></NavList>
        <UserWidget></UserWidget>
      </template>
    </Header>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import NavList from '@/components/NavList.vue';
import UserWidget from '@/components/UserWidget.vue';
import Main from '@/components/Main.vue';

export default {
  components: {
    Header,
    Main,
    UserWidget,
    NavList,
  },

  data() {
    return {
      isUser: true,
    };
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
.app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: $color-bg;
}
</style>
