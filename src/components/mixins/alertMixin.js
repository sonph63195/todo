export const alertMixin = {
  template: "asdsad",
  data() {
    return {

    };
  },
  methods: {
    showNotify(title, message, variant = null) {
      this.$bvToast.toast(message, {
        title: `${title || 'Notification'}`,
        autoHideDelay: 5000,
        variant: variant,
      })
    }
  }
};
