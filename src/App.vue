<template>
  <v-app>
    <v-app-bar v-if="!publicPages" app clipped-left :dark="dark">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>MYJOB</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <app-bar-content :dark="dark" v-on:setTheme="setThemeStore"></app-bar-content>
    </v-app-bar>
    <v-navigation-drawer v-if="!publicPages" app clipped v-model="drawer" :dark="dark">
      <nav-drawer-content></nav-drawer-content>
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/layout/AppBar.vue';
import NavDrawer from './components/layout/NavDrawer.vue';
import { ThemeMixin } from './components/mixins';

export default {
  name: 'App',
  components: {
    'nav-drawer-content': NavDrawer,
    'app-bar-content': AppBar,
  },
  mixins: [ThemeMixin],
  computed: {
    publicPages() {
      return this.$route.path.includes('sign');
    },
  },
  methods: {
    //
  },

  data: () => ({
    drawer: true,
  }),
};
</script>
