/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const SERVER_URL = 'https://todoes-list.herokuapp.com/';

function get(url, config = null) {
  return Vue.http.get(SERVER_URL + url, config);
}

function post(url, body = null, config = null) {
  return Vue.http.post(SERVER_URL + url, body, config);
}

export const request = {
  get,
  post,
};
