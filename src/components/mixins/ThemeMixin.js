// import Vue from 'vue';
/* eslint-disable import/prefer-default-export */

export const ThemeMixin = {
  methods: {
    setThemeStore(theme) {
      const val = theme;
      this.$store.dispatch('setDarkTheme', { val });
    },
  },
  computed: {
    darkTheme() {
      return this.$store.state.settings.dark;
    },
  },
  watch: {
    darkTheme: {
      immediate: true,
      handler() {
        this.$vuetify.theme.dark = this.darkTheme;
        this.dark = this.darkTheme;
      },
    },
  },
  mounted() {
    if (localStorage.getItem('theme')) {
      try {
        const theme = JSON.parse(localStorage.getItem('theme'));
        this.dark = theme;
        this.setThemeStore(theme);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  },
  data() {
    return {
      dark: false,
    };
  },
};
