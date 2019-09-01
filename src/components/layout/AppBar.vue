<template>
  <div>
    <v-menu :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar size="36">
            <img src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460" />
          </v-avatar>
        </v-btn>
      </template>

      <v-card :dark="dark" :light="!dark">
        <v-list>
          <v-list-item-group>
            <v-list-item>
              <!-- <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>-->
              <v-list-item-content>
                <v-list-item-title>Huangshan Fan</v-list-item-title>
                <v-list-item-subtitle>sonpham3798@gmail.com</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon class="red--text">
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group>
            <v-list-item @click="switchDarkTheme">
              <v-list-item-icon>
                <v-icon>mdi-theme-light-dark</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <span v-if="!dark">Enable</span>
                  <span v-if="dark">Disable</span>
                  <span>&nbsp;dark theme</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'app-bar-content',
  props: {
    dark: Boolean,
  },
  methods: {
    switchDarkTheme() {
      const val = !this.dark;
      this.$emit('setTheme', val);
    },
  },
  data() {
    return {
      //
    };
  },
};
</script>
