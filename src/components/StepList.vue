<template>
  <div class="mt-3 d-flex flex-column position-relative">
    <div class="detail-top border rounded p-3 bg-white">
      <div class="title d-flex border-bottom mb-3">
        <div>
          <input
            type="checkbox"
            :class="['mr-3', task.completed ? 'done': '']"
            v-model="task.completed"
          />
        </div>
        <editTodoItem
          :class="['h4 font-weight-light flex-fill', task.completed ? 'done': '']"
          :value.sync="task.title"
          tag="input"
        />
      </div>
      <div class="steps ml-3">
        <div class="step d-flex" v-for="(step, index) in task.subTodo" :key="index">
          <div>
            <input type="checkbox" class="mr-3" v-model="step.completed" />
          </div>
          <editTodoItem
            :class="['flex-fill', step.completed ? 'done': '']"
            :value.sync="step.title"
            tag="input"
          />
        </div>
        <div class="add-step d-flex flex-shrink-0 text-success border-top pt-2 mt-3">
          <editTodoItem
            class="flex-fill"
            title="step"
            :value="newStep"
            tag="input"
            v-on:update:value="addStep"
          />
        </div>
      </div>
    </div>
    <div class="border rounded mt-3">
      <b-list-group>
        <b-list-group-item class="border-0 d-flex">
          <div class="mr-5">
            <font-awesome-icon icon="bell" />
          </div>
          <div>{{ new Date(task.remindTime).toUTCString() }}</div>
        </b-list-group-item>
        <b-list-group-item class="border-0 d-flex">
          <div class="mr-5">
            <font-awesome-icon icon="bell-slash" />
          </div>
          <div>{{ new Date(task.expireDate).toUTCString() }}</div>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="border rounded p-3 mt-3 bg-white">
      <editTodoItem
        title="description"
        :value.sync="task.description"
        tag="textarea"
        v-on:update:value="edited = true"
      />
    </div>
    <div class="border rounded p-3 mt-3 bg-white">
      <editTodoItem
        title="note"
        :value.sync="task.note"
        tag="textarea"
        v-on:update:value="edited = true"
      />
    </div>
    <div class="mt-3 d-flex justify-content-end">
      <b-button pill variant="outline-dark" @click="update">Update</b-button>
    </div>
  </div>
</template>

<script>
import editTodoItem from "./editTodoItem";

export default {
  components: {
    editTodoItem
  },
  props: ["task"],
  data() {
    return {
      newStep: ""
    };
  },
  methods: {
    update() {
      this.$emit("update");
    },
    addStep(step) {
      this.task.subTodo.push({ title: step, completed: false });
    }
  }
};
</script>
