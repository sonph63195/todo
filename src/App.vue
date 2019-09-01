<template>
  <v-app>
    <v-app-bar app clipped-left :dark="dark" :light="!dark">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>MYJOB</span>
        <span class="font-weight-light">.NETLIFY.COM</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <app-bar-content :dark="dark" v-on:setTheme="setThemeStore"></app-bar-content>
    </v-app-bar>
    <v-navigation-drawer app clipped v-model="drawer" :dark="dark" :light="!dark">
      <nav-drawer-content></nav-drawer-content>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
    <!-- <v-footer app :dark="dark" :light="!dark">
      Huangshan
    </v-footer>-->
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

  methods: {
    //
  },

  data: () => ({
    drawer: true,
  }),
};
</script>
