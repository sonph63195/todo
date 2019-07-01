<template>
  <div class="create-new-todo mt-5">
    <h4>Create new:</h4>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" class="form-control" v-model="todo.name" />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <input type="text" id="description" class="form-control" v-model="todo.description" />
    </div>
    <div class="form-group">
      <button @click="$emit('addNew', todo)" class="btn btn-outline-primary float-right">Create</button>
    </div>
  </div>
</template>

<script>
var todo = {
  list: [],
  name: "",
  description: "",
  owners: []
};
export default {
  data() {
    return {
      todo: todo
    };
  }
};
</script>

