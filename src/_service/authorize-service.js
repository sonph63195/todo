/* eslint-disable import/prefer-default-export */
import { request } from '../_helper';

export const authorizeService = {
  login(username, password) {
    const body = {
      username,
      password,
    };

    return request.post('login', body);
  },

};
