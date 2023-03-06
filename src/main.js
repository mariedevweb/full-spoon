/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import axios from 'axios';
import Pagination from 'vue-pagination-2';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('pagination', Pagination);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
