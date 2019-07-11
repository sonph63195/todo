<template>
  <div id="app">
    <Header v-on:logout="logout" :loggedIn="loggedIn" />
    <b-container fluid>
      <b-row v-if="loggedIn">
        <b-col cols="12" md="4" lg="3" class="todo-sidebar bg-light border-right">
          <TodoList :todos="todos" :selectedIndex="selectedIndex" v-on:showTodo="showTodo" />
          <NewTodo v-on:addNew="addNew"></NewTodo>
        </b-col>
        <b-col cols="12" md="4" lg="6">
          <Todo
            v-if="selectedTodo != null"
            :todo="selectedTodo"
            :taskStepEdit.sync="taskStepEdit"
            v-on:updateTodo="todos[selectedIndex] = $event"
            v-on:show-step="showStep"
            v-on:update:taskStepEdit="taskStepEdit = $event"
          ></Todo>
        </b-col>
        <b-col cols="12" md="4" lg="3" class="todo-sidebar bg-light border-left">
          <StepList
            v-if="selectedTask != null"
            :task="selectedTask"
            v-on:update="taskStepEdit = true;"
          ></StepList>
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <div v-if="!loggedIn" class="show-login_form">
        <UserAuthorized v-on:login="login"></UserAuthorized>
      </div>
    </b-container>
    <!-- -->
    <div class="footer p-3 text-center border-top">Create by Huangshan</div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Import component
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";
import UserAuthorized from "./components/UserAuthorized";
import StepList from "./components/StepList";

// Import Mixins
import { serverAPIsMixin } from "./components/mixins/serverAPIsMixin";

// code
/* eslint-disable */
export default {
  name: "app",

  components: {
    Header,
    TodoList,
    Todo,
    NewTodo,
    UserAuthorized,
    StepList
  },

  mixins: [serverAPIsMixin],

  data() {
    return {
      todos: [], //list todo
      selectedIndex: null,
      selectedTodo: null,
      selectedTask: null,
      loggedIn: false,
      taskStepEdit: false
    };
  },
  created() {
    this.getTodo();
  },
  methods: {
    getTodo() {
      this.loggedIn = this.isLogged();
      if (this.loggedIn) {
        // get list todo
        this.$http
          .get(this.URL + this.method.todoGet, this.getRequestHeader())
          .then(
            response => {
              this.todos = response.body;
              // show first todo
              this.showTodo({
                todo: this.todos[0],
                index: 0
              });
            },
            err => {
              console.log(err.body.message);
            }
          )
          .catch(ex => {
            console.log(ex);
          });
      }
    },
    showTodo(obj) {
      this.selectedIndex = obj.index;
      this.selectedTodo = obj.todo;
      // add edit for element
      this.showStep(null);
      this.taskStepEdit = false;
    },
    showStep(task) {
      this.selectedTask = task;
      this.taskStepEdit = false;
    },
    addNew(todo) {
      console.log("Add new ");
      this.$http
        .post(this.URL + this.method.todoPost, todo, this.getRequestHeader())
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
    login() {
      this.getTodo();
    },
    logout() {
      this.loggedIn = this.isLogged();
    }
  }
};
</script>

<style>
.done {
  text-decoration: line-through;
}
.todo-sidebar {
  height: calc(100vh);
}
</style>
