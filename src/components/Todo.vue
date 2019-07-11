<template>
  <section class="show-todo position-relative">
    <div class="section section-header my-3">
      <div class="title">
        <editTodoItem
          class="h2 font-weight-light"
          :value.sync="todo.name"
          tag="input"
          v-on:update:value="editTodoTaskItem"
        />
      </div>
      <editTodoItem
        class="text-muted"
        title="Description"
        :value.sync="todo.description"
        tag="input"
        v-on:update:value="editTodoTaskItem"
      />
    </div>
    <div class="section section-content">
      <div class="list-task">
        <b-card
          v-for="(task, index) in list"
          :key="task._id"
          :id="task._id"
          tag="div"
          class="mb-2"
          @click="showStep(index)"
        >
          <div class="task-content d-flex">
            <div class="task-left flex-fill">
              <div class="h4 card-title d-flex" :class="[task.completed ? 'done': '']">
                <b-form-checkbox :id="'ck_' + task._id" v-model="task.completed" />
                <editTodoItem
                  class="flex-fill"
                  :value.sync="task.title"
                  tag="input"
                  v-on:update:value="editTodoTaskItem"
                />
              </div>
              <editTodoItem
                class="task-decsription"
                title="Description"
                :value.sync="task.description"
                tag="textarea"
                v-on:update:value="editTodoTaskItem"
              ></editTodoItem>
              <div class="task-info d-flex">
                <div v-if="task.note != null" class="task-note">
                  <font-awesome-icon :icon="['fas', 'sticky-note']" />
                </div>
              </div>
            </div>
            <div class="task-right">
              <b-button
                @click="removeTodoTask(task, index)"
                pill
                variant="outline-danger"
                class="ml-3"
              >
                <font-awesome-icon icon="trash-alt" />
              </b-button>
            </div>
          </div>
        </b-card>

        <b-card>
          <div class="d-flex">
            <div class="taskFoot_left flex-fill">
              <b-button variant="light" pill v-b-modal.modal-addNewTodoItem>
                <font-awesome-icon icon="plus" class="mr-3" />Add a task
              </b-button>
            </div>
            <div class="taskFoot_right">
              <b-button v-if="edit" variant="outline-warning" pill @click="editTodoTask">Update</b-button>
            </div>
          </div>
        </b-card>

        <!-- Add new -->
        <b-modal
          id="modal-addNewTodoItem"
          ref="addNewTodoItem"
          title="Add New"
          hide-footer
          no-stacking
        >
          <b-form>
            <b-form-group id="title-group" label="Title:" label-for="title">
              <b-form-input id="title" v-model="newTodoTask.title" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group id="description-group" label="Description:" label-for="description">
              <b-form-textarea id="description" v-model="newTodoTask.description"></b-form-textarea>
            </b-form-group>
            <b-form-group id="note-group" label="Note:" label-for="note">
              <b-form-textarea id="description" v-model="newTodoTask.note"></b-form-textarea>
            </b-form-group>
            <b-button
              type="submit"
              class="float-right"
              variant="primary"
              pill
              @click.prevent="addNewItem()"
            >Add new</b-button>
          </b-form>
        </b-modal>
      </div>
    </div>
    <!-- Loading modal -->
    <b-modal id="modal-loading" centered hide-header hide-footer>
      <p class="m-0 text-center">
        <font-awesome-icon icon="spinner" class="fa-spin mr-3" />Please wait...
      </p>
    </b-modal>
    <!-- System Response -->
  </section>
</template>

<script>
// Import Component
import editTodoItem from "./editTodoItem";

// Import Mixins
import { serverAPIsMixin } from "./mixins/serverAPIsMixin";
import { todoItemMixin } from "./mixins/todoItemMixin";
import { alertMixin } from "./mixins/alertMixin";

export default {
  components: {
    editTodoItem
  },
  mixins: [serverAPIsMixin, alertMixin, todoItemMixin],
  props: {
    todo: Object,
    taskStepEdit: Boolean
  },
  data() {
    return {
      list: null,
      loading: false,
      selectedTask: {},
      edit: false
    };
  },
  computed: {},
  methods: {
    reset() {
      this.newTodoTask = this.resetTodoItem();
      this.loading = false;
    },
    addNewItem() {
      this.loading = true;
      this.$http
        .post(
          `${this.URL}${this.method.todoPost}/${this.todo._id}/todoitem`,
          this.newTodoTask,
          this.getRequestHeader()
        )
        .then(
          response => {
            //this.$emit("updateTodo", this.todo);
            this.list.push(response.body);
            // Close modal
            this.$refs["addNewTodoItem"].hide();
            //show notify for user.
            this.showNotify("Added", "Your item was added.", "success");
            this.reset();
          },
          err => {
            // close modal
            this.$refs["addNewTodoItem"].hide();
            //show notify for user.
            this.showNotify("Error", err.body.message, "danger");
            this.reset();
          }
        );
    },
    removeTodoTask(task, index) {
      this.loading = true;
      this.$http
        .delete(
          `${this.URL}${this.method.todoPost}/${this.todo._id}/todoitem/${task._id}`,
          this.getRequestHeader()
        )
        .then(
          response => {
            this.list.splice(index, 1);
            //show notify for user.
            this.showNotify("Remove", "Your item was removed", "success");
            this.loading = false;
          },
          err => {
            console.log(err);
            //show notify for user.
            this.showNotify("Error", err.body.message, "danger");
          }
        );
    },
    editTodoTask() {
      //console.log(this.$parent.todos);
      this.loading = true;
      //
      this.$http
        .put(
          `${this.URL}${this.method.todoPost}/${this.todo._id}`,
          this.todo,
          this.getRequestHeader()
        )
        .then(
          response => {
            this.reset();
            // update todo in the list
            //this.todo = response.body;
            this.$emit("updateTodo", response.body);
            //show notify for user.
            this.showNotify("Edit", "Edit success", "success");
            this.edit = false;
          },
          err => {
            this.showNotify("Error", err.body.message, "danger");
            this.edit = false;
          }
        );
      //
    },
    editTodoTaskItem() {
      this.editTodoTask();
    },
    showStep(index) {
      this.$emit("show-step", this.list[index]);
    }
  },
  watch: {
    todo: {
      immediate: true,
      handler() {
        this.list = this.todo.list;
      }
    },
    loading: {
      handler() {
        if (this.loading) {
          this.$bvModal.show("modal-loading");
        } else {
          this.$bvModal.hide("modal-loading");
        }
      }
    },
    taskStepEdit: {
      handler() {
        if (this.taskStepEdit) {
          this.editTodoTask();
          this.$emit("update:taskStepEdit", false);
          return;
        }
      }
    }
  }
};
</script>