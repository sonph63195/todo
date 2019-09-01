/* eslint-disable import/prefer-default-export */

export const authorize = {
  state: {
    state: { loading: false },
  },
  mutations: {
    loginRequest(state) {
      state.state = { loading: true };
    },
    loginSuccess(state) {
      state.state = { success: true };
    },
    loginFailure(state) {
      state.state = { success: false };
    },
  },
  actions: {
    login({ commit }) {
      commit('loginRequest');
      setTimeout(() => (commit('loginSuccess')), 3000);
    },
  },
};
