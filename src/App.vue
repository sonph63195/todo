<template>
  <div id="app">
    <Header v-on:logout="logout" :loggedIn="loggedIn" />
    <b-container>
      <b-row v-if="loggedIn">
        <b-col cols="12" md="6">
          <TodoList :todos="todos" :selectedIndex="selectedIndex" v-on:showTodo="showTodo" />
        </b-col>
        <b-col cols="12" md="6">
          <Todo
            v-if="selectedTodo != null"
            :todo="selectedTodo"
            v-on:updateTodo="todos[selectedIndex] = $event"
          ></Todo>
        </b-col>
      </b-row>
      <div v-if="!loggedIn" class="show-login_form">
        <UserAuthorized :message="message.err" v-on:login="authorizedUser"></UserAuthorized>
      </div>
    </b-container>
    <!-- -->
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";
import UserAuthorized from "./components/UserAuthorized";

var method = {
  get: "todolists",
  post: "todolist"
};

var loggedIn = false;

export default {
  name: "app",

  components: {
    Header,
    TodoList,
    Todo,
    NewTodo,
    UserAuthorized
  },
  data() {
    return {
      URL: "https://todoes-list.herokuapp.com/",
      method: method,
      todos: [], //list todo
      selectedIndex: null,
      selectedTodo: null,
      loggedIn: loggedIn,
      message: { err: [] }
    };
  },
  methods: {
    getTodo() {
      this.loggedIn = this.$cookies.isKey("user");
      if (this.loggedIn) {
        // get list todo
        this.$http
          .get(this.URL + this.method.get, {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("user").token
            }
          })
          .then(
            data => {
              this.todos = data.body;
            },
            err => {
              console.log(err.body.message);
            }
          );
      }
    },
    showTodo(obj) {
      this.selectedIndex = obj.index;
      this.selectedTodo = obj.todo;
    },
    addNew(todo) {
      console.log("Add new ");
      this.$http
        .post(this.URL + this.method.post, todo, {
          headers: { Authorization: "Bearer " + $cookies.get("user") }
        })
        .then(
          response => {
            console.log(response);
            this.todos.push(response.body);
          },
          err => {
            alert(err.body.message);
          }
        );
    },
    updateTodo(todo) {
      this.$http
        .put(this.URL + this.method.post + "/" + todo._id, todo, {
          headers: { Authorization: "Bearer " + $cookies.get("user") }
        })
        .then(
          response => {
            console.log("Updated");
            this.todos[this.selectedIndex] = todo;
          },
          err => {
            console.log(err);
            alert(err.body.message);
          }
        );
    },
    deleteTodo(obj) {
      let listTodo = obj.listTodo;
      let todo = obj.todo;
      this.$http
        .delete(
          this.URL +
            this.method.post +
            "/todolist/" +
            listTodo._id +
            "/todoitem/" +
            todo._id
        )
        .then(
          response => {
            listTodo.list.splice(obj.index, 1);
          },
          err => {
            console.log(err);
            alert(err.body.message);
          }
        );
    },
    authorizedUser(user) {
      this.$http.post(this.URL + "login", user).then(
        response => {
          let authorized = {
            username: user.username,
            token: response.body.jwtToken
          };
          $cookies.set("user", authorized);
          // get list todo of user
          this.getTodo();
        },
        err => {
          this.message.err = [];
          this.message.err.push(err.body.message);
          console.log(err);
        }
      );
    },
    logout() {
      this.$cookies.remove("user");
      this.loggedIn = false;
    }
  },
  watch: {},
  mounted() {
    this.getTodo();
  }
};
</script>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
</style>
