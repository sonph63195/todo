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
            <h1 class="display-1">Create new account</h1>
          </div>
          <v-form @submit.prevent="register" class="mx-3">
            <div>
              <v-text-field label="Username" v-model="user.username" required outlined />
            </div>
            <div>
              <v-text-field type="email" label="Email" v-model="user.email" outlined />
            </div>
            <div>
              <v-text-field label="Avatar" outlined v-model="user.avatar"></v-text-field>
            </div>
            <div>
              <v-text-field
                type="password"
                label="Password"
                v-model="user.password"
                required
                outlined
              ></v-text-field>
            </div>
            <div>
              <v-text-field
                type="password"
                label="Confirm Password"
                v-model="user.repassword"
                outlined
              ></v-text-field>
            </div>
            <div class="d-flex pb-3 justify-end">
              <v-btn
                :loading="loading"
                :disabled="loading"
                type="submit"
                color="primary"
              >Create Account</v-btn>
            </div>
          </v-form>
          <div class="text-center py-1">
            <p>
              Have an account?
              <router-link to="sign-in">Sign in</router-link>&nbsp;now
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
  methods: {
    setTheme() {
      this.dark = !this.dark;
      this.setThemeStore(this.dark);
    },
    register() {
      this.loading = !this.loading;
    },
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
        email: '',
        avatar: 'http://avatar.com/avatar.jpg',
        biography: '',
      },
      loading: false,
    };
  },
};
</script>
