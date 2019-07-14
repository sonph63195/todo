/* eslint-disable no-console */
import { server } from "../_helpers";
import { authHeader } from "../_helpers";
import { resource } from "../_helpers";

export const userService = {
    login,
    getUser
};

function login(username, password) {

    let body = {
        username: username,
        password: password
    }
    return resource.post(server.getLoginUrl(), body);
}

function getUser(id) {
    return resource.get(server.getUserUrl(id));
}
