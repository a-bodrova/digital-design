import '@/scss/inject.scss';
import App from '@/App.vue';
import router from "@/router/index";
import store from "@/store/index";
import api from '@/api';

Vue.use(api);
Vue.use(store);

// Register local assets & components globally
require('@/utils/register-assets');
require('@/utils/register-components');

new Vue({
  api,
  store,
  router,
  el: '#app',
  render: h => h(App),
});
