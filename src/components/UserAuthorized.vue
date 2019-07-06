<template>
  <b-row>
    <b-col cols="12" md="6">
      <h3 class="display-4">Login</h3>
      <div>
        <b-alert v-if="message.length > 0" variant="danger" dismissible show>
          <p class="mb-0" v-for="(msg, index) in message" :key="index" v-text="msg"></p>
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
            <b-button
              type="submit"
              variant="primary"
              @click.prevent="$emit('login', user); loading = true"
            >
              <span v-if="!loading">Login</span>
              <span v-if="loading">Please wait...</span>
            </b-button>
          </div>
        </b-form>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    message: Array
  },
  data() {
    return {
      user: {
        username: null,
        password: null
      },
      loading: false
    };
  },
  watch: {
    message: {
      immediate: false,
      handler() {
        this.loading = false;
      }
    }
  }
};
</script>
