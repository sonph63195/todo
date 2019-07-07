<template>
  <section class="show-todo">
    <div class="section section-header mt-3 mb-2">
      <h3 class="h2 font-weight-light d-inline-block">
        <span v-text="todo.name"></span> todo
      </h3>
      <b-button variant="outline-success" class="float-right" v-b-modal.modal-addNewTodoTask>Add New</b-button>
    </div>
    <div class="section section-content">
      <div class="list-task">
        <b-card
          v-for="(task, index) in list"
          :key="task._id"
          :id="task._id"
          :title="task.title"
          :sub-title="task.note"
          tag="div"
          class="mb-2"
        >
          <b-card-text v-text="task.description" class="d-inline-block"></b-card-text>
          <b-nav vertical>
            <b-nav-item v-for="(subTask, index) in list.subTodo" :key="index">
              <span v-text="subTask.title"></span>
            </b-nav-item>
          </b-nav>
          <div>
            <small>Remind: {{ new Date(task.remindTime)}}</small>
          </div>
          <div>
            <small>Expire: {{ new Date(task.expireDate) }}</small>
          </div>
          <div class="card-action mt-3">
            <b-button v-model="task.completed" variant="outline-primary">Completed</b-button>
            <b-button
              @click="removeTodoTask(task, index)"
              variant="outline-danger"
              class="ml-3"
            >Remove</b-button>
            <b-button
              @click="$bvModal.show('modal-editTodoTask'); selectedTask = task"
              variant="outline-warning"
              class="ml-3"
            >Edit</b-button>
          </div>
        </b-card>

        <b-card v-if="list.length <= 0">
          <b-card-text>
            <span>There are no todo in this. Click add new to add new todo.</span>
          </b-card-text>
        </b-card>
        <!-- -->
        <b-modal id="modal-addNewTodoTask" ref="addNewTodoTask" title="Add New" hide-footer>
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
            <b-button type="submit" variant="primary" @click.prevent="addNewItem()">
              <span v-if="!loading">Add new</span>
              <span v-if="loading">Please wait...</span>
            </b-button>
          </b-form>
        </b-modal>
        <!-- -->
        <b-modal id="modal-editTodoTask" ref="editTodoTask" title="Edit" hide-footer>
          <b-form>
            <b-form-group id="title-group" label="Title:" label-for="title">
              <b-form-input id="title" v-model="selectedTask.title" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group id="description-group" label="Description:" label-for="description">
              <b-form-textarea id="description" v-model="selectedTask.description"></b-form-textarea>
            </b-form-group>
            <b-form-group id="note-group" label="Note:" label-for="note">
              <b-form-textarea id="description" v-model="selectedTask.note"></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary" @click.prevent="editTodoTask()">
              <span v-if="!loading">Save</span>
              <span v-if="loading">Please wait...</span>
            </b-button>
          </b-form>
        </b-modal>
      </div>
    </div>
    <b-alert
      :show="alert.dismissCountDown"
      :fade="true"
      dismissible
      :variant="alert.type"
      @dismissed="alert.dismissCountDown=0"
      class="fixed-bottom mb-0 align-middle text-center"
    >
      <p class="m-0" v-html="alert.message"></p>
    </b-alert>
  </section>
</template>

<script>
// Import Mixins
import { serverAPIsMixin } from "./mixins/serverAPIsMixin";

export default {
  mixins: [serverAPIsMixin],
  props: {
    todo: Object
  },
  data() {
    return {
      list: null,
      loading: false,
      newTodoTask: {
        title: null,
        description: null,
        note: null,
        completed: false,
        expireDate: "2019-12-11T17:00:00.000Z",
        remindTime: "2019-11-11T17:00:00.000Z",
        subTodo: []
      },
      selectedTask: {},
      alert: {
        dismissSecs: 5,
        dismissCountDown: 0,
        message: null,
        type: "info"
      }
    };
  },
  computed: {},
  methods: {
    reset() {
      this.newTodoTask = {
        title: null,
        description: null,
        note: null,
        completed: false,
        expireDate: "2019-12-11T17:00:00.000Z",
        remindTime: "2019-11-11T17:00:00.000Z",
        subTodo: []
      };
      this.loading = false;
    },
    showAlert(msg, type) {
      this.alert.message = msg;
      this.alert.type = type;
      this.alert.dismissCountDown = this.alert.dismissSecs;
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
            this.list.push(response.body);
            this.$refs["addNewTodoTask"].hide();
            this.reset();
            //show notify for user.
            this.showAlert("Added successful.", "info");
          },
          err => {
            //console.log(err);
            this.$refs["addNewTodoTask"].hide();
            this.reset();
            //show notify for user.
            this.showAlert(err.body.message, "danger");
          }
        );
    },
    removeTodoTask(task, index) {
      this.$http
        .delete(
          `${this.URL}${this.method.todoPost}/${this.todo._id}/todoitem/${task._id}`,
          this.getRequestHeader()
        )
        .then(
          response => {
            this.list.splice(index, 1);
            //show notify for user.
            this.showAlert("Removed.", "warning");
          },
          err => {
            console.log(err);
            //show notify for user.
            this.showAlert(err.body.message, "danger");
          }
        );
    },
    editTodoTask() {
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
            this.$refs["editTodoTask"].hide();
            // update todo in the list
            //this.todo = response.body;
            this.$emit("updateTodo", response.body);
            //show notify for user.
            this.showAlert("Save successful.", "success");
          },
          err => {
            this.showAlert(err.body.message, "danger");
          }
        );
      //
    }
  },
  watch: {
    todo: {
      immediate: true,
      handler() {
        this.list = this.todo.list;
      }
    }
  }
};
</script>

