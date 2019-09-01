import Vue from 'vue';
import Vuex from 'vuex';

import { settings } from './_store/settings-store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
  },
});
