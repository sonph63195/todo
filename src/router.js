/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { cookies } from './_helper';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/sign-in',
      name: 'Sign in',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/sign-up',
      name: 'Sign up',
      component: () => import('./views/Register.vue'),
    },
  ],
});

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  // redirect to login page if not loged in
  const pulicPages = ['/sign-in', '/sign-up']; // the list of public pages
  const authRequired = !pulicPages.includes(to.path); // find path not public pages
  const loggedIn = cookies.isKey('user'); // will get user in cookies

  if (authRequired && !loggedIn) {
    return next('/sign-in');
  } if (!authRequired && loggedIn) {
    return next('/');
  }

  next();
});
