/* eslint-disable import/prefer-default-export */
import { authorizeService } from '../_service';
import { cookies } from '../_helper';
import { router } from '../router';

function makeUserObject(username, token) {
  return JSON.stringify({
    username,
    token,
  });
}

export const authorize = {
  state: {
    state: { loading: false },
    error: {},
    token: {},
  },
  mutations: {
    loginRequest(state) {
      state.state = { loading: true };
      state.error = {};
      state.token = {};
    },
    loginSuccess(state, token) {
      state.state = { success: true };
      state.token = token;
    },
    loginFailure(state, error) {
      state.state = { success: false };
      state.error = error;
    },
    logout(state) {
      state.state = { loading: false };
      state.error = {};
      state.token = {};
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      commit('loginRequest');
      authorizeService.login(username, password).then((success) => {
        commit('loginSuccess', success.body);
        cookies.set('user', makeUserObject(username, success.body.jwt));
        router.push('/'); // redirect to home page
      }, (error) => {
        commit('loginFailure', error.body);
      });
    },
    logout({ commit }) {
      commit('logout');
      if (cookies.isKey('user')) {
        cookies.remove('user');
        router.push('sign-in');
      }
    },
  },
};
