import Vue from "vue";
import Router from "vue-router";

import HomePage from "../home/HomePage";
import LoginPage from "../login/LoginPage";
import Logout from "../login/Logout";

import { cookies } from "./cookies";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        { path: '/', component: HomePage },
        { path: '/login', component: LoginPage },
        { path: '/logout', component: Logout },

        // otherwise redirect to home
        { path: '*', redirect: '/' }
    ]
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not loged in
    const pulicPages = ['/login']; // the list of public pages
    const authRequired = !pulicPages.includes(to.path); // find path not public pages
    const loggedIn = cookies.isKey("user");// will get user in cookies

    if (authRequired && !loggedIn) {
        return next('/login');
    } else if (!authRequired && loggedIn) {
        return next("/");
    }

    next();
});