<template>
  <div class="todo-list mb-3">
    <h3 class="display-4">Your List</h3>

    <b-list-group v-if="show">
      <b-list-group-item
        v-for="(todo, index) in todos"
        :key="todo._id"
        :id="todo._id"
        class="flex-column align-items-start"
        :class="[selectedIndex === index ? 'active' : '']"
        @click="[$emit('showTodo', {todo: todo, index: index})]"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1" v-text="todo.name"></h5>
        </div>
        <p class="mb-1" v-text="todo.description"></p>
      </b-list-group-item>
    </b-list-group>

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


