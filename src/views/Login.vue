<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="3">
        <v-card flat>
          <div class="text-center py-3">
            <div class="text-right px-3">
              <v-btn icon @click="setTheme">
                <v-icon>mdi-theme-light-dark</v-icon>
              </v-btn>
            </div>
            <h2 class="display-2">Welcome</h2>
            <h1 class="display-1">Sign in</h1>
          </div>
          <v-form @submit.prevent="login" class="mx-3">
            <v-alert v-if="error.message" :dismissible="true" type="error" v-text="error.message" />
            <div>
              <v-text-field label="Username" v-model="username" required outlined></v-text-field>
            </div>
            <div>
              <v-text-field type="password" label="Password" v-model="password" outlined />
            </div>
            <div class="d-flex pb-3 justify-end">
              <v-btn
                :loading="loading"
                :disabled="loading"
                type="submit"
                block
                color="primary"
              >Login</v-btn>
            </div>
          </v-form>
          <div class="text-center py-1">
            <p>
              Not a member?
              <router-link to="sign-up">Sign up</router-link>&nbsp;now
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ThemeMixin } from '../components/mixins';

export default {
  mixins: [ThemeMixin],
  computed: {
    loading() {
      return this.$store.state.authorize.state.loading;
    },
    error() {
      return this.$store.state.authorize.error;
    },
  },
  methods: {
    setTheme() {
      this.dark = !this.dark;
      this.setThemeStore(this.dark);
    },
    login() {
      const { username, password } = this;
      const { dispatch } = this.$store;
      dispatch('login', { username, password });
    },
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
};
</script>
