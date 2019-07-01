import Vue from "vue";
import App from "./App.vue";

import VueResource from "vue-resource";

require("../node_modules/jquery");
require("../node_modules/bootstrap");

Vue.use(VueResource);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
