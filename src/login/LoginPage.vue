<template>
  <div class="form h-100 w-100">
    <b-container>
      <b-row class="justify-content-md-center">
        <b-col cols="12" md="6" lg="4" class="mt-5">
          <h2 class="display-3 text-center">Welcome</h2>
          <b-form class="p-3 shadow rounded bg-light">
            <b-form-group :invalid-feedback="invalidUsername" :state="usernameInput">
              <b-form-input
                id="username"
                placeholder="Enter your username"
                v-model="username"
                :state="usernameInput"
                trim
              ></b-form-input>
            </b-form-group>
            <b-form-group :invalid-feedback="invalidPassword" :state="passwordInput">
              <b-form-input
                id="password"
                type="password"
                placeholder="Password"
                v-model="password"
                :state="passwordInput"
                trim
              ></b-form-input>
            </b-form-group>
            <b-button
              @click.prevent="handleLogin"
              variant="outline-dark"
              :disabled="loggingIn"
              class="btn-block"
            >
              Login
              <font-awesome-icon v-if="loggingIn" icon="spinner" class="fa-spin ml-3" />
            </b-button>
            <p class="my-3">
              <span>Don't have an account?&nbsp;</span>
              <a href="/register">Create new.</a>
            </p>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
function checkInput(value, number) {
  if (value.length > 0) {
    return value.length > number ? true : false;
  }
  return null;
}

function showNotiInput(value, number) {
  if (value.length > number) {
    return "";
  } else if (value.length > 0) {
    return `Please enter alest ${number + 1} characters`;
  } else {
    return "Please enter something";
  }
}

export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  computed: {
    usernameInput() {
      return checkInput(this.username, 2);
    },
    passwordInput() {
      return checkInput(this.password, 3);
    },
    // show errorr
    invalidUsername() {
      return showNotiInput(this.username, 2);
    },
    invalidPassword() {
      return showNotiInput(this.password, 3);
    },
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    }
  },
  methods: {
    handleLogin(e) {
      this.submitted = true;
      if (this.usernameInput && this.passwordInput) {
        const { username, password } = this;
        const { dispatch } = this.$store;
        dispatch("authentication/login", { username, password });
      }
    }
  }
};
</script>

