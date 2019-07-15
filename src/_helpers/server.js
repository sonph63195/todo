const URL = "https://todoes-list.herokuapp.com";

const user = {
    login: 'login',
    register: 'user',
    getOrUpdate: 'user'
};

const todo = {
    getAll: 'todolists',
    post: 'todolist'
}

export const server = {
    getServerUrl: () => {
        return URL;
    },
    getLoginUrl() {
        return `${URL}/${user.login}`;
    },
    getRegisterUrl: () => {
        return `${URL}/${user.register}`;
    },
    getUserUrl: (id) => {
        return `${URL}/${user.getOrUpdate}/${id}`;
    },
    getAllTodoList() {
        return `${URL}/${todo.getAll}`
    }
}