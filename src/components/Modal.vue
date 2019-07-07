<template>
  <div class="modal fade" :id="['editModal']" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div v-if="todo != null" class="modal-body">
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" :id="['title']" v-model="todo.title">
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea :id="['description']" class="form-control" v-model="todo.description"></textarea>
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <input type="text" :id="['tags']" class="form-control" v-model="todo.tags">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateTodo(todo, index)"
          >Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    todo: Object,
    updateTodo: Function,
    index: Number
  }
};
</script>

