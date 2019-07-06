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
            <span class="nav-link" v-text="user"></span>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="$emit('logout')">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    loggedIn: Boolean
  },
  data() {
    return {
      user: null
    };
  },
  watch: {
    loggedIn: {
      immediate: false,
      handler() {
        if (this.loggedIn) {
          this.user = this.$cookies.get("user").username;
        }
      }
    }
  }
};
</script>
