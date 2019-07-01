<template>
  <div id="app">
    <Header :countDone="0" :total="0" />
    <div class="container">
      <div class="row justify-content-md-center mt-3">
        <div class="col-12 col-md-6">
          <TodoList :todos="todos" v-on:listTodos="getListTodos" />
          <NewTodo v-on:addNew="addNew" />
        </div>
        <div class="col-12 col-md-6">
          <Todo :listTodos="arrListTodos" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";
import $ from "../node_modules/jquery";

export default {
  name: "app",

  components: {
    Header,
    TodoList,
    Todo,
    NewTodo
  },
  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      }
    ]
  },
  data() {
    return {
      URL: "https://todoes-list.herokuapp.com/",
      method: {
        get: "todolists",
        post: "todolist"
      },
      todos: [],
      arrListTodos: null
    };
  },
  methods: {
    getListTodos(arr) {
      this.arrListTodos = arr;
    },
    addNew(todo) {
      this.$http.post(this.URL + this.method.post, todo).then(
        response => {
          console.log(response);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  watch: {},
  mounted() {
    this.$http.get(this.URL + this.method.get).then(data => {
      this.todos = data.body;
    });
  }
};
</script>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.isDone {
  text-decoration: line-through !important;
}

.list-group-item button {
  opacity: 0;
}
.list-group-item:hover button {
  opacity: 1;
}
</style>
