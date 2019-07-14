<template></template>

<script>
export default {
  created() {
    this.$store.dispatch("authentication/logout");
  }
};
</script>
