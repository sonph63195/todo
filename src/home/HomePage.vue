<template>
  <div>
    <div v-if="user != null">
      Hello {{ user.username }}
      <img :src="user.avatar" class="rounded" alt />
      <a href="/logout">Logout</a>
    </div>
    <div v-if="userLoading.status.isLoading">Loading info...</div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.users.user;
    },
    userLoading() {
      return this.$store.state.users.allState;
    }
  },
  created() {
    this.$store.dispatch("users/get");
  }
};
</script>
