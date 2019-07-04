<template>
  <div id="app">
    <Header :countDone="0" :total="0" />
    <div class="container">
      <div class="row justify-content-md-center mt-3">
        <div class="col-12 col-md-6">
          <TodoList :todos="todos" v-on:listTodos="getListTodos" :selectedIndex="selectedIndex" />
          <NewTodo v-on:addNew="addNew" />
        </div>
        <div class="col-12 col-md-6">
          <Todo
            :listTodos="arrListTodos"
            v-on:updateTodo="updateTodo"
            v-on:deleteTodo="deleteTodo"
          />
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

var method = {
  get: "todolists",
  post: "todolist",
  deleteTodoItem: `todolist/{0}/todoitem/{1}`
};

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
      method: method,
      todos: [],
      arrListTodos: null,
      selectedIndex: 0
    };
  },
  methods: {
    getListTodos(obj) {
      this.arrListTodos = obj.todo;
      this.selectedIndex = obj.index;
    },
    addNew(todo) {
      this.$http.post(this.URL + this.method.post, todo).then(
        response => {
          console.log(response);
        },
        err => {
          alert(err.body.message);
        }
      );
    },
    updateTodo(todo) {
      this.$http.put(this.URL + this.method.post + "/" + todo._id, todo).then(
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
            String.format(this.method.deleteTodoItem, listTodo._id, todo._id)
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
    }
  },
  watch: {},
  mounted() {
    this.$http.get(this.URL + this.method.get).then(
      data => {
        this.todos = data.body;
        //
        this.getListTodos({
          todo: this.todos[0],
          index: 0
        });
      },
      err => {
        console.log(err);
        alert(err.body.message);
      }
    );
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
