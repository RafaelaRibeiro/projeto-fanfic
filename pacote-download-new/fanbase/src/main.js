import Vue from "vue";
import App from "./App.vue";
import "./plugins/quasar";
import router from "./config/router";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
