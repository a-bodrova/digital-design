<template>
  <div class="app">
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Main from './pages/Main.vue'
export default {
  components: { Main, Header },
  data() {
    return {
      
    }
  },

  computed: {

  },
  mounted() {
    // this.$api.Events.getEvents()
    // .then((data) => {
    //   console.log(data);
    // })
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
  .btn {
    @include common-text;
    padding: 2.5px 7.5px;
  }

  .counter {
    @include common-text;
    color: $color-text;
  }

  .app2 {
    background: green;
  }
</style>
