import Vue from "vue";
import App from "./App.vue";

import VueResource from "vue-resource";
import VueCookies from "vue-cookies";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.use(VueResource);
// set default config
VueCookies.config("7d");
// set global cookie
VueCookies.set("theme", "default");
VueCookies.set("hover-time", "1s");

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
