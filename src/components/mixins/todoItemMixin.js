export const todoItemMixin = {
  data() {
    return {
      newTodoTask: {
        title: null,
        description: null,
        note: null,
        completed: false,
        expireDate: "2019-12-11T17:00:00.000Z",
        remindTime: "2019-11-11T17:00:00.000Z",
        subTodo: []
      }
    };
  },
  methods: {
    resetTodoItem() {
      return {
        title: null,
        description: null,
        note: null,
        completed: false,
        expireDate: "2019-12-11T17:00:00.000Z",
        remindTime: "2019-11-11T17:00:00.000Z",
        subTodo: []
      };
    },
    addEditObjToItem(list) {
      list.forEach(element => {
        element.edit = {
          title: false,
          description: false,
          note: false,
          remindTime: false,
          expireDate: false,
          completed: false,
        }
      });
    }
  }
};
