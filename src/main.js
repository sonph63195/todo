import Vue from "vue";
import { store } from "./_store";
import { router } from "./_helpers";
import App from "./App.vue";
import VueBootstrap from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.use(VueBootstrap);
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
