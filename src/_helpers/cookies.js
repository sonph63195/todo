import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

// default config
VueCookies.config('7d');

export const cookies = {
    isKey: (keyName) => {
        return VueCookies.isKey(keyName);
    },
    get: (keyName) => {
        return VueCookies.get(keyName);
    },
    set: (key, value) => {
        return VueCookies.set(key, value);
    },
    remove: (keyName) => {
        return VueCookies.remove(keyName);
    },
    getAllKeys: () => {
        return VueCookies.keys();
    }
};