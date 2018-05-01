import Vue from "vue";
import Vuex from "vuex";
import iview from "iview";
import VueRouter from 'vue-router'

import storeobj from "./store/store.js";
import router from "./router.js";
import app from "./components/app.vue";

Vue.use(iview);
Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store(storeobj);

new Vue({
    el : "#app" ,
    store,
    router,
    render : h => h(app)
});