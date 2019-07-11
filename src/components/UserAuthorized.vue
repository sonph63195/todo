<template>
  <b-row>
    <b-col cols="12" md="6">
      <h3 class="display-4">Login</h3>
      <div>
        <b-alert v-if="message != null" variant="danger" show>
          <p class="mb-0" v-text="message"></p>
        </b-alert>
      </div>
      <div class="login-form">
        <b-form>
          <b-form-group id="username-group" label="Username:" label-for="username">
            <b-form-input
              id="username"
              v-model="user.username"
              type="text"
              placeholder="Enter your username"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="password-group" label="Password:" label-for="password">
            <b-form-input
              id="password"
              v-model="user.password"
              type="password"
              placeholder="password"
              required
            ></b-form-input>
          </b-form-group>
          <div class="form-action">
            <b-button type="submit" variant="primary" @click.prevent="login">
              <span v-if="!loading">Login</span>
              <span v-if="loading">Please wait...</span>
            </b-button>
          </div>
        </b-form>
      </div>
    </b-col>
    <b-col cols="12" md="6">
      <UserRegister></UserRegister>
    </b-col>
  </b-row>
</template>

<script>
import UserRegister from "./UserRegister";

// Import Mixins
import { serverAPIsMixin } from "./mixins/serverAPIsMixin";

export default {
  components: {
    UserRegister
  },
  mixins: [serverAPIsMixin],
  data() {
    return {
      user: {
        username: null,
        password: null
      },
      loading: false,
      message: null
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$http.post(this.URL + this.method.userLogin, this.user).then(
        response => {
          let user = {
            username: this.user.username,
            token: response.body.jwtToken
          };
          this.$cookies.set("user", user);
          this.$emit("login"); // call to App.vue
        },
        err => {
          this.message = err.body.message;
          this.loading = false;
        }
      );
    }
  }
};
</script>
