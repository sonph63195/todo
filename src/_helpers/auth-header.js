import { cookies } from "./cookies";

export function authHeader() {
    let loggedIn = cookies.isKey("user");
    if (loggedIn) {
        let user = cookies.get("user");

        if (user && user.token) {
            return { Authorization: "Bearer " + user.token }
        }
    }
    return {};
}