export const serverAPIsMixin = {
  data() {
    return {
      URL: "https://todoes-list.herokuapp.com/",
      method: {
        todoGet: "todolists",
        todoPost: "todolist",
        userLogin: "login",
        user: "user"
      }
    };
  },
  methods: {
    isLogged() {
      return this.$cookies.isKey("user");
    },
    getUser() {
      return this.$cookies.get("user");
    },
    serverLogout() {
      this.$cookies.remove("user");
    },
    getRequestHeader() {
      if (this.isLogged()) {
        return {
          headers: {
            Authorization: "Bearer " + this.getUser().token
          }
        };
      }
    }
  }
};
