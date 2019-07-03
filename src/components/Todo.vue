<template>
  <div class="todo-list mb-3">
    <h3>Add new todo</h3>
    <button
      v-if="!addNewTodoLoad"
      @click="showAddNewForm(true)"
      class="btn btn-link text-success"
    >+ Add new todo</button>
    <div v-if="addNewTodoLoad" class="addNewTodo mb-3">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" class="form-control" v-model.lazy="newTodo.title" />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input type="text" id="description" class="form-control" v-model.lazy="newTodo.description" />
      </div>
      <div class="form-group">
        <label for="note">Note</label>
        <input type="text" id="note" class="form-control" v-model.lazy="newTodo.note" />
      </div>
      <div class="button">
        <button @click="addNewTodo" class="btn btn-outline-primary">Add</button>
      </div>
    </div>
    <div class="header-section">
      <h3 class="d-inline-block">Todos</h3>
      <button
        @click="$emit('updateTodo', listTodos)"
        class="btn btn-outline-success float-right"
      >Update</button>
    </div>
    <ul v-if="show && listTodos != null" class="list-group mt-3">
      <li v-for="(todo, index) in listTodos.list" :key="todo._id" class="list-group-item">
        <div class="d-flex w-100 justify-content-between align-items-center">
          <h5 v-text="todo.title"></h5>
          <span>
            <input type="checkbox" v-model="todo.completed" />
          </span>
        </div>
        <p class="mb-1" v-text="todo.description"></p>
        <small v-text="todo.note"></small>
        <div class="mt-3">
          Remind:
          <span v-text="todo.remindTime"></span>
        </div>
        <div class="mt-3 sub-todo">
          <ul class="nav flex-column">
            <li v-for="sub in todo.subTodo" :key="sub._id">
              <div class="custom-control custom-checkbox">
                <input
                  v-model="sub.completed"
                  type="checkbox"
                  class="custom-control-input"
                  :id="sub._id"
                />
                <label class="custom-control-label" :for="sub._id" v-text="sub.title"></label>
              </div>
            </li>
          </ul>
          <div class="add_sub-todo mt-2">
            <div class="form-group">
              <input
                type="text"
                placeholder="Enter new sub-Todo"
                ref="subTodoTitle"
                class="form-control"
                @keyup.enter="addNewSubTodo(index)"
              />
            </div>
          </div>
        </div>
        <div class="action mt-3">
          <button
            @click="$emit('deleteTodo', {
            listTodo: listTodos,
            todo: todo,
            index: index
          })"
            class="btn text-danger btn-link d-inline-block"
          >Delete this todo</button>
        </div>
      </li>
    </ul>
    <div v-if="listTodos == null <= 0">Nothing to show you.</div>
  </div>
</template>

<script>
var newSubTodo = {
  completed: false,
  title: ""
};

var newTodo = {
  completed: false,
  description: "",
  expireDate: "2019-12-11T17:00:00.000Z",
  note: "",
  remindTime: "2019-11-11T17:00:00.000Z",
  subTodo: [],
  title: ""
};

export default {
  props: {
    listTodos: Object
  },
  data() {
    return {
      show: true,
      newSubTodo: newSubTodo,
      newTodo: newTodo,
      addNewTodoLoad: false
    };
  },
  mounted() {
    this.show = false;
  },
  methods: {
    showAddNewForm(val) {
      this.addNewTodoLoad = val;
    },
    addNewSubTodo(index) {
      let subTodoValue = this.$refs.subTodoTitle[0].value;
      let subTodo = newSubTodo;
      subTodo.title = subTodoValue;
      this.listTodos.list[index].subTodo.push(subTodo);
    },
    addNewTodo() {
      this.showAddNewForm(false);
      this.listTodos.list.push(this.newTodo);
    }
  },
  watch: {
    listTodos: {
      handler() {
        this.show = true;
      }
    }
  }
};
</script>

