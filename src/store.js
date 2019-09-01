import Vue from 'vue';
import Vuex from 'vuex';

import { authorize, settings } from './_store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authorize,
    settings,
  },
});
