import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export const resource = {
    get(url, config = null) {
        return Vue.http.get(url, url);
    },
    post(url, body, config = null) {
        return Vue.http.post(url, body, config);
    }
};