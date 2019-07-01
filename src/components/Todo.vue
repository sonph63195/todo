<template>
  <div class="todo-list mb-3">
    <h3>Todo</h3>
    <ul class="list-group">
      <li v-for="todo in listTodos" :key="todo._id" class="list-group-item">
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
        </div>
      </li>
    </ul>
    <div v-if="listTodos.length <= 0">Nothing to show you.</div>
  </div>
</template>

<script>
export default {
  props: {
    listTodos: Array
  }
};
</script>

