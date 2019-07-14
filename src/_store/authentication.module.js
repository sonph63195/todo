/* eslint-disable no-console */
import { cookies } from "../_helpers";
import { userService } from "../_services";
import { router } from '../_helpers';

const user = cookies.get("user");
const initialState = user ? { status: { loggedIn: true }, user } : { status: {}, user: null }

export const authentication = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ dispatch, commit }, { username, password }) {
            commit('loginRequest', { username });
            userService.login(username, password).then(response => {
                commit('loginSuccess', user);
                let user = {
                    username: username,
                    token: response.body.jwtToken,
                }
                cookies.set("user", user);
                router.push('/');
                dispatch('users/get', username, { root: true });
            }).catch(error => {
                commit('loginFailure', error);
            });
        },
        logout({ commit }) {
            cookies.remove("user");
            commit('logout');
            router.push('/login');
        }
    },
    mutations: {
        loginRequest(state, user) {
            state.status = { loggingIn: true };
            state.user = user;
        },
        loginSuccess(state, user) {
            state.status = { loggedIn: true };
            state.user = user;
        },
        loginFailure(state) {
            state.status = {};
            state.user = null;
        },
        logout(state) {
            state.status = {};
            state.user = null;
        }
    }
}