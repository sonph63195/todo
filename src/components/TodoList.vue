<template>
  <div class="todo-list mb-3">
    <h3>Your List</h3>
    <ul v-if="show" class="list-group">
      <transition-group>
        <li
          v-for="(todo, index) in todos"
          :key="index"
          :id="todo._id"
          :class="['list-group-item list-group-item-action', selectedIndex == index ? 'active' : '']"
          @click="[$emit('listTodos', {todo: todo, index: index})]"
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
      </transition-group>
    </ul>
    <div v-if="!show">Loading...</div>
  </div>
</template>

<script>
export default {
  props: {
    todos: Array,
    selectedIndex: Number
  },
  data() {
    return {
      show: true
    };
  },
  mounted() {
    this.show = false;
  },
  watch: {
    todos: {
      handler() {
        this.show = true;
      }
    }
  }
};
</script>


