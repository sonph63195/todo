import Vue from "vue";
import App from "./App.vue";

import VueResource from "vue-resource";
import VueCookies from "vue-cookies";
import BootstrapVue from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.use(VueResource);
// set default config
VueCookies.config("7d");
// set global cookie
VueCookies.set("theme", "default");
VueCookies.set("hover-time", "1s");

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
