import VueRouter from 'vue-router';

import shouye from "./components/index.vue";
import filtercar from "./components/filtercar/index.vue";
 
export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: "/index",
        },
        {
            path: '/index',
            component: shouye
        },
        {
            path: '/filtercar',
            component: filtercar
        }
    ]
});