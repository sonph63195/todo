<template>
  <div>
    <h3 class="display-4">Register</h3>
    <b-form action="post">
      <b-form-group id="username-group" label="Username:" label-for="regUsername">
        <b-form-input
          id="regUsername"
          v-model="user.username"
          type="text"
          placeholder="Enter your username"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="email-group" label="Email:" label-for="email">
        <b-form-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Enter your email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="avatar-group" label="Avatar:" label-for="avatar">
        <b-form-input id="avatar" v-model="user.avatar" type="text" placeholder="Enter your avatar"></b-form-input>
      </b-form-group>
      <b-form-group id="password-group" label="Password:" label-for="regPass">
        <b-form-input
          id="regPass"
          v-model="user.password"
          type="password"
          placeholder="Enter your password"
          required
        ></b-form-input>
      </b-form-group>
      <div class="form-action">
        <b-button type="submit" variant="success" @click.prevent="register">
          <span v-if="!loading">Register</span>
          <span v-if="loading">Please wait...</span>
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
// Import Mixins
import { serverAPIsMixin } from "./mixins/serverAPIsMixin";
import { alertMixin } from "./mixins/alertMixin";

export default {
  mixins: [serverAPIsMixin, alertMixin],
  data() {
    return {
      user: {
        username: null,
        email: null,
        avatar: null,
        password: null
      },
      loading: false
    };
  },
  methods: {
    register() {
      this.loading = true;
      this.$http.post(`${this.URL + this.method.user}`, this.user).then(
        response => {
          this.loading = false;
          // Show Notify
          this.showNotify(null, "Your account create successful.", "success");
        },
        err => {
          this.loading = false;
          // Show Notify
          this.showNotify("Error", err.body.message, "danger");
        }
      );
    }
  }
};
</script>

