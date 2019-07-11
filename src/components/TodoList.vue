<template>
  <div class="todo-list mb-3 mt-3">
    <b-list-group v-if="show">
      <b-list-group-item
        v-for="(todo, index) in todos"
        :key="todo._id"
        :id="todo._id"
        class="flex-column align-items-start"
        :class="[selectedIndex === index ? 'active' : '']"
        @click="[$emit('showTodo', {todo: todo, index: index})]"
      >
        <div class="d-flex justify-content-between align-items-center">
          <h5 v-text="todo.name"></h5>
          <span class="badge badge-info badge-pill">{{ todo.list.length }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>

    <div v-if="!show" class="p-3 border rounded">
      <font-awesome-icon icon="spinner" class="fa-spin mr-3" />Loading...
    </div>
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


