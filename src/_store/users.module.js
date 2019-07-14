import { cookies } from "../_helpers"
import { userService } from "../_services"

const user = cookies.get("user")
const all = user ? { status: { isLoading: true } } : { status: {} }

export const users = {
    namespaced: true,
    state: {
        allState: all,
        user: user,
    },
    actions: {
        get({ commit, state }) {
            commit('getRequet');
            userService.getUser(state.user.username).then(response => {
                let resUser = {
                    _id: response.body._id,
                    username: response.body.username,
                    email: response.body.email,
                    avatar: response.body.avatar,
                    token: user.token
                }
                cookies.set("user", resUser);
                commit('getSuccess');
            }).catch(error => {
                console.log(error);
                commit('getFailure');
            });
        }
    },
    mutations: {
        getRequet(state) {
            console.log(state.user);
            state.allState.status = { isLoading: true };
        },
        getSuccess(state) {
            state.allState.status = { isLoaded: true };
        },
        getFailure(state) {
            state.allState.status = {};
        }
    }
}