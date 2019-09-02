/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import VueCookies from 'vue-cookies';

Vue.use(VueCookies);

VueCookies.config('1d');

export const cookies = {
  /**
   *
   * @param {*} keyName
   * @param {*} value
   * @return this
   */
  set(keyName, value) {
    return VueCookies.set(keyName, value);
  },

  /**
   *
   * @param {*} keyName
   * @return value
   */
  get(keyName) {
    return VueCookies.get(keyName);
  },

  /**
   *
   * @param {*} keyName
   * @return this
   */
  remove(keyName) {
    return VueCookies.remove(keyName);
  },

  /**
   *
   * @param {*} keyName
   * @return false or true
   */
  isKey(keyName) {
    return VueCookies.isKey(keyName);
  },

  /**
   * @return An array
   */
  keys() {
    return VueCookies.keys();
  },
};
