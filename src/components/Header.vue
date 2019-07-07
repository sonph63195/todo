<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">My todo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="loggedIn" class="navbar-nav mr-auto">
          <li class="nav-item">
            <span v-if="user != null" class="nav-link" v-text="user.username"></span>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// Import Mixins
import { serverAPIsMixin } from "./mixins/serverAPIsMixin";

export default {
  mixins: [serverAPIsMixin],
  props: {
    loggedIn: Boolean
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    if (this.loggedIn) {
      this.user = this.getUser();
    }
  },
  watch: {
    loggedIn() {
      this.user = this.getUser();
    }
  },
  methods: {
    logout() {
      this.serverLogout();
      this.$emit("logout");
    }
  }
};
</script>
