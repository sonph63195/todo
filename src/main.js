import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import 'es6-promise/auto'

Vue.use(Vuex);

const store = new Vuex();

Vue.config.productionTip = false;
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
