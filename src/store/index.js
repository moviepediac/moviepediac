import Vue from "vue";
import Vuex from "vuex";
import profile from "./modules/profile";
import auth from "./modules/auth";
import list from "./modules/list";
import role from "./modules/role";
import alb from "./modules/alb";
import flb from "./modules/flb";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        profile,
        auth,
        list,
        role,
        alb,
        flb
    },
    strict: debug
});