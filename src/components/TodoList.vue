<template>
  <div class="todo-list mb-3">
    <h3>Your List</h3>
    <ul class="list-group">
      <li
        v-for="(todo, index) in todos"
        :key="index"
        :id="todo._id"
        class="list-group-item list-group-item-action"
        @click="$emit('listTodos', todo.list)"
      >
        <div class="d-flex w-100 justify-content-between align-items-center">
          <h5 class="mb-1" v-text="todo.name"></h5>
          <small>
            <span>todo:</span>
            <span v-text="todo.list.length"></span>
          </small>
        </div>
        <p class="mb-1" v-text="todo.description"></p>
        <small></small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array
  }
};
</script>


