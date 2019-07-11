<template>
  <div>
    <span class v-show="!showEdit" @click="showEditFunc">{{ value || `Add a ${title}` }}</span>
    <div v-if="tag === 'input'">
      <b-input v-show="showEdit" ref="textinput" v-model="val" @blur="saveInput" />
    </div>
    <div v-else-if="tag === 'textarea'">
      <b-textarea v-show="showEdit" ref="textinput" v-model="val" @blur="saveInput" />
    </div>
    <div v-else-if="tag === 'checkbox'">
      <b-checkbox v-show="showEdit" ref="textinput" v-model="val" @blur="saveInput" />
    </div>
  </div>
</template>
<script>
export default {
  name: "edit-by-click",
  props: ["title", "value", "tag"],
  methods: {
    showEditFunc() {
      this.showEdit = true;
      this.val = this.value;
      this.$nextTick(function() {
        this.$refs.textinput.focus();
      });
    },
    saveInput() {
      const newValue = this.$refs.textinput.value;
      if (newValue !== null) {
        if (newValue.length > 0 && newValue !== this.value) {
          this.$emit("update:value", newValue);
          this.showEdit = false;
          return;
        }
      }
      this.showEdit = false;
      this.val = this.value;
    }
  },
  data() {
    return {
      showEdit: false,
      val: null
    };
  }
};
</script>