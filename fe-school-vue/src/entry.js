import '@/scss/inject.scss';
import App from '@/App.vue';
import router from "@/router/index";
// import store from "@/store/index";

// import Api from '@/api';
// import Vue from 'vue';

// Vue.use(Api);
// Vue.use(store);

// Register local assets & components globally
require('@/utils/register-assets');
require('@/utils/register-components');

new Vue({
  // Api,
  // store,
  router,
  el: '#app',
  render: h => h(App),
});
