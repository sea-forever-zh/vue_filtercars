import Vue from "vue";
import Vuex from "vuex";
import createLogger from 'vuex/dist/logger'

import filtercar_actions from "./filtercar/actions.js";
import filtercar_mutations from "./filtercar/mutations.js";
import filtercar_state from "./filtercar/state.js";

export default {
    state : {
        filtercar: filtercar_state
    },
    mutations: {
        ...filtercar_mutations
    },
    actions: {
        ...filtercar_actions,
    },
    plugins: [createLogger()]
};