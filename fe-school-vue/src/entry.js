import './scss/inject.scss';
import App from './App.vue';
import router from "./router/router";

// import Api from '@/api'

// Vue.use(Api)

// Register local assets & components globally
require('@/utils/register-assets')
require('@/utils/register-components')

new Vue({
  router,
  el: '#app',
  render: h => h(App),
})