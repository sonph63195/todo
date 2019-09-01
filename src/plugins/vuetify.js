import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.lightGreen.base,
        secondary: colors.blueGrey.base,
        accent: colors.teal.base,
        error: colors.red.base,
        warning: colors.amber.base,
        info: colors.lightBlue.base,
        success: colors.green.base,
      },
      dark: {
        primary: colors.lightGreen.base,
        secondary: colors.blueGrey.base,
        accent: colors.teal.base,
        error: colors.red.base,
        warning: colors.amber.base,
        info: colors.lightBlue.base,
        success: colors.green.base,
      },
    },
  },
});
