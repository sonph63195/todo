/* eslint-disable import/prefer-default-export */

function setThemeToStorage(theme) {
  const parsed = JSON.stringify(theme);
  localStorage.setItem('theme', parsed);
}

export const settings = {
  state: {
    dark: false,
  },
  mutations: {
    setDarkTheme(state, val) {
      state.dark = val;
    },
  },
  actions: {
    setDarkTheme({ commit }, { val }) {
      commit('setDarkTheme', val);
      setThemeToStorage(val);
    },
  },
};
